import { useState } from 'react';
import { Icon } from '@iconify/react';

interface NotificationSettings {
  email: {
    newCourses: boolean;
    courseUpdates: boolean;
    achievements: boolean;
    security: boolean;
    marketing: boolean;
  };
  push: {
    newCourses: boolean;
    courseUpdates: boolean;
    achievements: boolean;
    messages: boolean;
    reminders: boolean;
  };
  inApp: {
    newCourses: boolean;
    courseUpdates: boolean;
    achievements: boolean;
    messages: boolean;
    reminders: boolean;
  };
}

export const NotificationsContent = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      newCourses: true,
      courseUpdates: true,
      achievements: true,
      security: true,
      marketing: false
    },
    push: {
      newCourses: true,
      courseUpdates: false,
      achievements: true,
      messages: true,
      reminders: true
    },
    inApp: {
      newCourses: true,
      courseUpdates: true,
      achievements: true,
      messages: true,
      reminders: true
    }
  });

  const handleSettingChange = (
    channel: keyof NotificationSettings,
    setting: string,
    value: boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: value
      }
    }));
  };

  const handleToggleAll = (channel: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [channel]: Object.keys(prev[channel]).reduce((acc, key) => ({
        ...acc,
        [key]: value
      }), {} as Record<string, boolean>)
    }));
  };

  const NotificationSection = ({ 
    title, 
    description, 
    channel, 
    settings: channelSettings 
  }: {
    title: string;
    description: string;
    channel: keyof NotificationSettings;
    settings: Record<string, boolean>;
  }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={() => handleToggleAll(channel, true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          aria-label={`Activar todas las notificaciones de ${title.toLowerCase()}`}
        >
          Activar todo
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon icon="mdi:book-open-variant" className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900">Nuevos cursos</p>
              <p className="text-sm text-gray-500">Cuando se publiquen nuevos cursos</p>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange(channel, 'newCourses', !channelSettings.newCourses)}
            aria-label={`${channelSettings.newCourses ? 'Desactivar' : 'Activar'} notificaciones de nuevos cursos en ${title.toLowerCase()}`}
            aria-pressed={channelSettings.newCourses}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              channelSettings.newCourses ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                channelSettings.newCourses ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon icon="mdi:update" className="w-5 h-5 text-green-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900">Actualizaciones de cursos</p>
              <p className="text-sm text-gray-500">Cuando se actualicen tus cursos inscritos</p>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange(channel, 'courseUpdates', !channelSettings.courseUpdates)}
            aria-label={`${channelSettings.courseUpdates ? 'Desactivar' : 'Activar'} notificaciones de actualizaciones de cursos en ${title.toLowerCase()}`}
            aria-pressed={channelSettings.courseUpdates}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              channelSettings.courseUpdates ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                channelSettings.courseUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon icon="mdi:trophy" className="w-5 h-5 text-yellow-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900">Logros y certificaciones</p>
              <p className="text-sm text-gray-500">Cuando completes cursos o obtengas logros</p>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange(channel, 'achievements', !channelSettings.achievements)}
            aria-label={`${channelSettings.achievements ? 'Desactivar' : 'Activar'} notificaciones de logros y certificaciones en ${title.toLowerCase()}`}
            aria-pressed={channelSettings.achievements}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              channelSettings.achievements ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                channelSettings.achievements ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {(channel === 'push' || channel === 'inApp') && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:message" className="w-5 h-5 text-purple-600" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900">Mensajes en tiempo real</p>
                <p className="text-sm text-gray-500">Mensajes de instructores y otros estudiantes</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange(channel, 'messages', !channelSettings.messages)}
              aria-label={`${channelSettings.messages ? 'Desactivar' : 'Activar'} notificaciones de mensajes en tiempo real en ${title.toLowerCase()}`}
              aria-pressed={channelSettings.messages}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                channelSettings.messages ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  channelSettings.messages ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        )}

        {(channel === 'push' || channel === 'inApp') && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:bell-ring" className="w-5 h-5 text-orange-600" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900">Recordatorios</p>
                <p className="text-sm text-gray-500">Recordatorios de clases y tareas pendientes</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange(channel, 'reminders', !channelSettings.reminders)}
              aria-label={`${channelSettings.reminders ? 'Desactivar' : 'Activar'} notificaciones de recordatorios en ${title.toLowerCase()}`}
              aria-pressed={channelSettings.reminders}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                channelSettings.reminders ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  channelSettings.reminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        )}

        {channel === 'email' && (
          <>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:shield-check" className="w-5 h-5 text-red-600" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900">Alertas de seguridad</p>
                  <p className="text-sm text-gray-500">Notificaciones importantes de seguridad</p>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange(channel, 'security', !channelSettings.security)}
                aria-label={`${channelSettings.security ? 'Desactivar' : 'Activar'} notificaciones de alertas de seguridad en ${title.toLowerCase()}`}
                aria-pressed={channelSettings.security}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  channelSettings.security ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    channelSettings.security ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:bullhorn" className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900">Marketing y promociones</p>
                  <p className="text-sm text-gray-500">Ofertas especiales y contenido promocional</p>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange(channel, 'marketing', !channelSettings.marketing)}
                aria-label={`${channelSettings.marketing ? 'Desactivar' : 'Activar'} notificaciones de marketing y promociones en ${title.toLowerCase()}`}
                aria-pressed={channelSettings.marketing}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  channelSettings.marketing ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    channelSettings.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Configuración de Notificaciones</h3>
        <p className="text-sm text-gray-500">Personaliza cómo recibes las notificaciones.</p>
      </div>

      {/* Notificaciones Push */}
      <NotificationSection
        title="Notificaciones Push"
        description="Recibe notificaciones en tu dispositivo móvil o navegador"
        channel="push"
        settings={settings.push}
      />

      {/* Notificaciones en la App */}
      <NotificationSection
        title="Notificaciones en la App"
        description="Notificaciones que aparecen dentro de la aplicación"
        channel="inApp"
        settings={settings.inApp}
      />

      {/* Notificaciones por Email */}
      <NotificationSection
        title="Notificaciones por Email"
        description="Recibe notificaciones directamente en tu correo electrónico"
        channel="email"
        settings={settings.email}
      />

      {/* Configuración de Frecuencia */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Frecuencia de Resúmenes</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Resumen semanal</p>
              <p className="text-sm text-gray-500">Recibe un resumen de tu actividad semanal</p>
            </div>
            <div>
              <label htmlFor="summary-frequency" className="sr-only">Frecuencia del resumen semanal</label>
              <select 
                id="summary-frequency"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                aria-describedby="summary-frequency-description"
              >
                <option value="never">Nunca</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
              <div id="summary-frequency-description" className="sr-only">
                Selecciona la frecuencia con la que quieres recibir el resumen semanal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 