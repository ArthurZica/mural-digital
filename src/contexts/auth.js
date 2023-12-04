import axios from "axios";
import api from "../axios-config";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const apiUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    auth();
  }, []);

  async function auth() {
    try {
      const response = await api.get(`${apiUrl}/me`);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  }

  const signin = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("pessoa_tipo", response.data.pessoa_tipo);
        return { type: "success", message: "Login realizado com sucesso!" };
      }
    } catch (error) {
      setUser(null);
      return {
        type: "error",
        message: error?.response?.data?.message || "Erro desconhecido",
      };
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("pessoa_tipo");
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
