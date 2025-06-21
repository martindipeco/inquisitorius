import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MentoraLogo from "@/components/MentoraLogo";

const Index = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-mentora-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <MentoraLogo />

        {/* Authentication Buttons */}
        <div className="space-y-4">
          {/* Sign In Button - Primary */}
          <Button
            onClick={handleSignIn}
            className="w-full h-14 bg-mentora-blue hover:bg-blue-700 text-white font-medium text-lg rounded-xl shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            Inicia sesión
          </Button>

          {/* Create Account Button - Secondary */}
          <Button
            onClick={handleCreateAccount}
            variant="outline"
            className="w-full h-14 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-lg rounded-xl shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            Crea una cuenta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
