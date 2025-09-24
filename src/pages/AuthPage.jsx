import { useState } from "react";
import LightRays from "../components/auth/LightRays";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
      <LightRays raysColor="#6b46c1" followMouse={true} />
      <div className="login-page relative p-0">
        <div className="flex flex-col login-container-wrap p-4 fixed z-50 md:w-100 w-[90vw] h-fit bg-white items-start justify-start rounded-2xl shadow-lg contain-layout top-[50%] left-[50%] translate-[-50%]">
          <div className="w-fit">
            <h1 className="text-2xl tracking-wide flex text-shadow-white w-fit text-blue-[var(color-primary)] mb-3">
              {isLoginMode
                ? "Please log in to continue"
                : "Create your account"}
            </h1>
          </div>

          <div className="w-fit">
            {isLoginMode && <LoginForm toggleMode={toggleMode} />}
            {!isLoginMode && <RegisterForm toggleMode={toggleMode} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
