// Tipos para los valores del formulario
export type FormValues = {
  nombre: string;
  apellido: string;
  correo: string;
  mensaje: string;
};

// Tipos para los errores del formulario
export type FormErrors = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  mensaje?: string;
};