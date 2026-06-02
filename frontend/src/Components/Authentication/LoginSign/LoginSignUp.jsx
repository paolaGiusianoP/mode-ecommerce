import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../../../Services/auth";
import { loadCart } from "../../../Features/Cart/cartSlice";
import toast from "react-hot-toast";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [loading, setLoading] = useState(false);

  // Estado para login
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Estado para registro
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  // Manejar cambios en login
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar cambios en registro
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(loginData.email, loginData.password);
    
    if (result.ok) {
      // Cargar carrito desde backend después de login
      await dispatch(loadCart());
      toast.success(`¡Bienvenido ${result.data.name}!`);
      navigate("/");
    } else {
      toast.error(result.data.message || "Error al iniciar sesión");
    }
    
    setLoading(false);
  };

  // Enviar registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (registerData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }
    
    const result = await register({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    });
    
    if (result.ok) {
      toast.success(`¡Registro exitoso! Bienvenido ${result.data.name}`);
      navigate("/");
    } else {
      toast.error(result.data.message || "Error al registrar usuario");
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Log In"}
                  </button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleRegisterSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (min 6 characters) *"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    minLength="6"
                  />
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Register"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;