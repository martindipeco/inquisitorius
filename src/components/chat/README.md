# Chat Component

Este módulo implementa una funcionalidad completa de chat para la aplicación Inquisitorius.

## Características

- ✅ Lista de conversaciones
- ✅ Ventana de chat individual
- ✅ Envío y recepción de mensajes
- ✅ Indicadores de mensajes no leídos
- ✅ Eliminación de mensajes
- ✅ Diseño responsive
- ✅ Integración con el sistema de rutas
- ✅ Mock data para pruebas

## Componentes

### Chat.tsx
Componente principal que integra toda la funcionalidad del chat.

### ChatWindow.tsx
Ventana de chat individual que muestra los mensajes de una conversación específica.

### ConversationList.tsx
Lista de conversaciones del usuario con indicadores de mensajes no leídos.

### MessageBubble.tsx
Componente para mostrar un mensaje individual con indicadores de estado.

### MessageInput.tsx
Componente para enviar nuevos mensajes.

## Servicios

### messageService.ts
Servicio que maneja toda la lógica de mensajes:
- Crear mensajes
- Obtener conversaciones
- Marcar mensajes como leídos
- Eliminar mensajes
- Contar mensajes no leídos

## Tipos

### messageSchema.ts
Define los tipos TypeScript para:
- `Message`: Estructura de un mensaje
- `CreateMessage`: Datos para crear un mensaje
- `Conversation`: Estructura de una conversación

## Mock Data

### messages.json
Contiene datos de ejemplo para:
- Mensajes entre usuarios
- Conversaciones existentes

## Uso

```tsx
import { Chat } from './components/chat';

// En tu componente
<Chat currentUserId={1} />
```

## Rutas

La funcionalidad está disponible en `/chat` y está protegida por autenticación.

## Integración con Backend

El servicio está diseñado para ser fácilmente reemplazado por llamadas reales al backend. Los métodos del servicio coinciden con los endpoints del controlador de Spring Boot:

- `POST /api/mensajes` → `crearMensaje()`
- `GET /api/mensajes/{id}` → `obtenerMensajePorId()`
- `GET /api/mensajes/receptor/{receptorId}` → `obtenerMensajesPorReceptor()`
- `GET /api/mensajes/remitente/{remitenteId}` → `obtenerMensajesPorRemitente()`
- `GET /api/mensajes/conversacion` → `obtenerConversacion()`
- `DELETE /api/mensajes/{id}` → `eliminarMensaje()`

## Características Técnicas

- **Responsive**: Funciona en móvil y desktop
- **TypeScript**: Tipado completo
- **Tailwind CSS**: Estilos modernos y consistentes
- **Iconify**: Iconos vectoriales
- **React Router**: Navegación integrada
- **Zod**: Validación de esquemas 