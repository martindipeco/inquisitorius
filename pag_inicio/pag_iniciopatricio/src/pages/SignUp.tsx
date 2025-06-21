import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MentoraLogo from "@/components/MentoraLogo";
import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de correo inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual signup logic
    console.log("Signup attempt:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-mentora-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        {/* Logo */}
        <MentoraLogo />

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-gray-700 font-medium"
                >
                  Nombre
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-mentora-blue"
                  placeholder="Juan"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium">
                  Apellido
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-mentora-blue"
                  placeholder="Pérez"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 rounded-xl border-gray-200 focus:border-mentora-blue"
                placeholder="tu@email.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="h-12 rounded-xl border-gray-200 focus:border-mentora-blue"
                placeholder="••••••••"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium"
              >
                Confirmar contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="h-12 rounded-xl border-gray-200 focus:border-mentora-blue"
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-mentora-blue hover:bg-blue-700 text-white font-medium text-lg rounded-xl shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:opacity-60"
            size="lg"
          >
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>
              Al crear una cuenta, aceptas nuestros{" "}
              <button className="text-mentora-blue hover:text-blue-700 font-medium">
                Términos de Servicio
              </button>{" "}
              y{" "}
              <button className="text-mentora-blue hover:text-blue-700 font-medium">
                Política de Privacidad
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
