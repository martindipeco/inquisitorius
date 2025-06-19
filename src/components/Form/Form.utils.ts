import { FormValues, FormErrors } from './Form.types';

// Función de validación del formulario
export const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  
  if (!values.nombre.trim()) {
    errors.nombre = 'El nombre es requerido';
  }
  
  if (!values.apellido.trim()) {
    errors.apellido = 'El apellido es requerido';
  }
  
  if (!values.correo.includes('@')) {
    errors.correo = 'El correo debe contener @';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
    errors.correo = 'El correo no es válido';
  }
  
  if (!values.mensaje.trim()) {
    errors.mensaje = 'El mensaje es requerido';
  } else if (values.mensaje.length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  }
  
  return errors;
};