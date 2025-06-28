import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Input } from '../Input';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
}

export const SecurityContent = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    emailNotifications: true,
    sessionTimeout: 30,
    loginAlerts: true
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setIsChangingPassword(true);
    // Simular cambio de contraseña
    setTimeout(() => {
      console.log('Cambiando contraseña...');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
      alert('Contraseña cambiada exitosamente');
    }, 2000);
  };

  const handleSettingChange = (setting: keyof SecuritySettings, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleLogoutAllDevices = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión en todos los dispositivos?')) {
      console.log('Cerrando sesión en todos los dispositivos...');
      alert('Se ha cerrado sesión en todos los dispositivos');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Seguridad de la Cuenta</h3>
        <p className="text-sm text-gray-500">Gestiona la seguridad de tu cuenta y protege tu información.</p>
      </div>

      {/* Cambio de Contraseña */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h4>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label="Contraseña Actual"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="Nueva Contraseña"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirmar Nueva Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isChangingPassword}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-blue-300 flex items-center space-x-2"
          >
            {isChangingPassword && <Icon icon="mdi:loading" className="animate-spin w-4 h-4" />}
            <span>{isChangingPassword ? 'Cambiando...' : 'Cambiar Contraseña'}</span>
          </button>
        </form>
      </div>

      {/* Configuraciones de Seguridad */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Configuraciones de Seguridad</h4>
        
        <div className="space-y-4">
          {/* Autenticación de dos factores */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h5 className="font-medium text-gray-900">Autenticación de dos factores</h5>
              <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
            </div>
            <button
              onClick={() => handleSettingChange('twoFactorEnabled', !securitySettings.twoFactorEnabled)}
              aria-label={`${securitySettings.twoFactorEnabled ? 'Desactivar' : 'Activar'} autenticación de dos factores`}
              aria-pressed={securitySettings.twoFactorEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notificaciones por email */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h5 className="font-medium text-gray-900">Notificaciones por email</h5>
              <p className="text-sm text-gray-500">Recibe alertas de seguridad por email</p>
            </div>
            <button
              onClick={() => handleSettingChange('emailNotifications', !securitySettings.emailNotifications)}
              aria-label={`${securitySettings.emailNotifications ? 'Desactivar' : 'Activar'} notificaciones por email`}
              aria-pressed={securitySettings.emailNotifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Tiempo de sesión */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h5 className="font-medium text-gray-900">Tiempo de sesión</h5>
              <p className="text-sm text-gray-500">Tiempo antes de cerrar sesión automáticamente</p>
            </div>
            <div>
              <label htmlFor="session-timeout" className="sr-only">Tiempo de sesión</label>
              <select
                id="session-timeout"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                aria-describedby="session-timeout-description"
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={60}>1 hora</option>
                <option value={120}>2 horas</option>
              </select>
              <div id="session-timeout-description" className="sr-only">
                Selecciona el tiempo antes de cerrar sesión automáticamente
              </div>
            </div>
          </div>

          {/* Alertas de inicio de sesión */}
          <div className="flex items-center justify-between py-3">
            <div>
              <h5 className="font-medium text-gray-900">Alertas de inicio de sesión</h5>
              <p className="text-sm text-gray-500">Notificaciones cuando inicies sesión desde un nuevo dispositivo</p>
            </div>
            <button
              onClick={() => handleSettingChange('loginAlerts', !securitySettings.loginAlerts)}
              aria-label={`${securitySettings.loginAlerts ? 'Desactivar' : 'Activar'} alertas de inicio de sesión`}
              aria-pressed={securitySettings.loginAlerts}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sesiones Activas */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">Sesiones Activas</h4>
          <button
            onClick={handleLogoutAllDevices}
            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
            aria-label="Cerrar sesión en todos los dispositivos"
          >
            <Icon icon="mdi:logout" className="w-4 h-4" aria-hidden="true" />
            <span>Cerrar todas las sesiones</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:laptop" className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900">Chrome en Windows</p>
                <p className="text-sm text-gray-500">Madrid, España • Última actividad: hace 2 horas</p>
              </div>
            </div>
            <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 rounded-full">Activa</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:cellphone" className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900">Safari en iPhone</p>
                <p className="text-sm text-gray-500">Barcelona, España • Última actividad: hace 1 día</p>
              </div>
            </div>
            <span className="text-xs text-gray-600 font-medium bg-gray-200 px-2 py-1 rounded-full">Inactiva</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 