import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";

import styles from "../styles/Login.module.css";
import { AuthContext } from "../../components/layout/AuthContext";

function LoginEntrar() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, senha);
      toast.success("Login efetuado com sucesso!", {
        position: toast.POSITION.TOP_CENTER, // Posição centralizada na parte superior
      });
      
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.containeUserLoginEntrar}>
      <div className={styles.itemLoginContaEntrar}>
        <h2 className={styles.loginContaH2}>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formEmail">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaEnvelope className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group as={Row} controlId="formSenha">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaLock className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />

              <div
                className={styles.alternarSenha}
                onClick={alternarMostrarSenha}
              >
                {mostrarSenha ?  <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </Form.Group>

          <div className={styles.buttonContainer}>
            <Button type="submit" className={styles.buttonLoginCadastrar}>
              Entrar
            </Button>
          </div>
        </Form>
      </div>
      <div className={styles.itemLoginMsg}>
        <div>
          {" "}
          <img src="/img/logo.png" alt="Logo" className={styles.loginLogo} />
        </div>
        <div>
          <h1>Olá! Bem-Vindo</h1>
        </div>
        <div className={styles.loginInfoMsg}>
          <h2 className={styles.loginInfoMsgH2}>
          Entre com os seus dados pessoais e comece a viajar conosco no
          <p className={styles.loginInfoMsgp}>'Universo dos Livros'</p>
          </h2>
        </div>
      </div>

    </div>
  );
}

export default LoginEntrar;
