import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para fazer o login do usuário
  const login = async (email, senha) => {
    try {
      const response = await axios.post("http://localhost:8082/usuario/login", { email, senha });
      const userData = response.data;

      // Armazena os dados do usuário no localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error(error);
      throw new Error("Usuário ou senha inválido");
    }
  };

  // Função para fazer o logout do usuário
  const logout = () => {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem("userData");
    toast.success("Logout efetuado com sucesso");
    navigate("/");
    setUser(null);
  };

  const logoutDadosAtualizados = () => {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem("userData");

    navigate("/login-entrar");
    setUser(null);
  };


  const atualizarSenha = (novaSenha) => {
    const url = `http://localhost:8082/usuario/${user.id}`;
    axios
      .put(url, { senha: novaSenha })
      .then((response) => {
        // Atualizar o estado do usuário com a nova senha
        setUser((prevState) => ({
          ...prevState,
          senha: novaSenha
        }));
        // toast.success("Senha atualizada com sucesso");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao atualizar a senha");
      });
  };

  // Verifica se existem dados do usuário armazenados no localStorage ao carregar o componente
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, atualizarSenha, logoutDadosAtualizados  }}>
      {children}
    </AuthContext.Provider>
  );
};
