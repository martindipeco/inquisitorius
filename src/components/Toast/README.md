# Sistema de Notificaciones Toast

Sistema de notificaciones toast reutilizable con animaciones y diferentes tipos de mensajes.

## Características

- ✅ **Animación de shake** para errores (CSS puro)
- ✅ **4 tipos**: error, success, warning, info
- ✅ **Provider global** - Un solo contexto para toda la app
- ✅ **Auto-dismiss** configurable
- ✅ **Accesible** con Radix UI

## Uso Rápido

### 1. Provider Global (App.tsx)
```tsx
import { ToastProvider } from './components/Toast/ToastProvider';

function App() {
  return (
    <ToastProvider>
      {/* Tu app aquí */}
    </ToastProvider>
  );
}
```

### 2. En cualquier componente
```tsx
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/Toast/Toast';

export const MiComponente = () => {
  const { toast, showError, showSuccess, showInfo, hideToast } = useToast();

  const handleSubmit = () => {
    if (errors) {
      showError("Error", "Revisa los campos");
      return;
    }
    showSuccess("¡Éxito!", "Datos guardados");
  };

  return (
    <div>
      <button onClick={handleSubmit}>Enviar</button>
      <Toast {...toast} onOpenChange={hideToast} />
    </div>
  );
};
```

## Métodos

- `showError(title, description?)` - Rojo con shake
- `showSuccess(title, description?)` - Verde
- `showWarning(title, description?)` - Amarillo  
- `showInfo(title, description?)` - Azul
- `hideToast()` - Ocultar

## Ejemplo con Validación

```tsx
const handleSubmitWithValidation = () => {
  if (Object.keys(errors).length > 0) {
    showError("Errores en formulario", "Revisa los campos");
    return;
  }
  handleSubmit(onSubmit)();
};
```

## Props del Toast

- `open`: boolean
- `onOpenChange`: function  
- `title`: string
- `description?`: string
- `type`: 'error' | 'success' | 'warning' | 'info'
- `duration?`: number (default: 5000ms) 