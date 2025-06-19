import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

// Tipos TypeScript
type FormValues = {
  nombre: string;
  apellido: string;
  correo: string;
  mensaje: string;
};

type FormErrors = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  mensaje?: string;
};

// Props del componente
interface FormProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

// Valores iniciales
const initialValues: FormValues = {
  nombre: '',
  apellido: '',
  correo: '',
  mensaje: '',
};

// Componente principal
const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  // Validación del formulario
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!values.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!values.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    
    if (!values.correo.includes('@')) {
      newErrors.correo = 'El correo debe contener @';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
      newErrors.correo = 'El correo no es válido';
    }
    
    if (!values.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (values.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    return newErrors;
  };

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        // Mostrar alerta y mensaje de éxito
        alert('¡Registro enviado exitosamente!');
        setSubmitSuccess(true);
        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
          setValues(initialValues);
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        alert('Error al enviar el registro');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Renderizado condicional para mensaje de éxito
  if (submitSuccess) {
    return (
      <div className="form-container">
        <div className="success-message">
          <h2>¡Registro completado con éxito!</h2>
          <p>Tus datos han sido enviados correctamente.</p>
          <button 
            className="form-submit"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Renderizado del formulario
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Formulario de Registro</h2>
        
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            className={`form-input ${errors.nombre ? 'error' : ''}`}
            placeholder="Ingrese su nombre"
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>
        
        {/* Campo Apellido */}
        <div className="form-group">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={values.apellido}
            onChange={handleChange}
            className={`form-input ${errors.apellido ? 'error' : ''}`}
            placeholder="Ingrese su apellido"
          />
          {errors.apellido && <span className="error-message">{errors.apellido}</span>}
        </div>
        
        {/* Campo Correo */}
        <div className="form-group">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={values.correo}
            onChange={handleChange}
            className={`form-input ${errors.correo ? 'error' : ''}`}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.correo && <span className="error-message">{errors.correo}</span>}
        </div>
        
        {/* Campo Mensaje */}
        <div className="form-group">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={values.mensaje}
            onChange={handleChange}
            className={`form-textarea ${errors.mensaje ? 'error' : ''}`}
            placeholder="Escriba su mensaje aquí"
            rows={6}
          />
          {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
        </div>
        
        {/* Botón de Envío */}
        <button 
          type="submit" 
          className="form-submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Form;