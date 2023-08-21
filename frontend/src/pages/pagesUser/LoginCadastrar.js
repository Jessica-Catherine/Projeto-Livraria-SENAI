import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginCadastrar() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const [endereco, setEndereco] = useState({
    uf: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
    cep: ""
  });
  
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const validarEndereco = (endereco) => {
    return (
      endereco.uf !== "" &&
      endereco.cidade !== "" &&
      endereco.logradouro !== "" &&
      endereco.bairro !== "" &&
      endereco.numero !== "" &&
      endereco.complemento !== "" &&
      endereco.cep !== ""
    );
  };
  

  const buscarEndereco = (cep) => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const data = response.data;
        setEndereco({
          uf: data.uf,
          cidade: data.localidade,
          logradouro: data.logradouro,
          bairro: data.bairro,
          numero: endereco.numero,  // Manter o número do endereço anterior
          complemento: endereco.complemento,  // Manter o complemento do endereço anterior
          cep: cep
        });
        // setUf(data.uf);
        // setCidade(data.localidade);
        // setBairro(data.bairro);
        // setLogradouro(data.logradouro);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do endereço.", error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const enderecoValido = validarEndereco(endereco);

    if (!enderecoValido) {
      toast.error("Preencha o endereço para concluir o cadastro");
      return;
    }

    const usuario = {
      email,
      nome,
      senha,
      cpf,
      enderecos: [endereco]
    };

    axios
      .post("http://localhost:8082/usuario", usuario)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Cadastro efetuado com sucesso! Faça o login para entrar.");
          console.log(usuario)
          limparFormulario();
          navigate("/login-entrar");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("cpf")) {
            toast.error("Já existe um usuário com o mesmo CPF");
          } else if (errorMessage.includes("email")) {
            toast.error("Já existe um usuário com o mesmo e-mail");
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error("Erro ao cadastrar-se");
          console.error("Erro ao cadastrar-se.", error);
        }
      });
  };

  const limparFormulario = () => {
    setEmail("");
    setNome("");
    setSenha("");
    setCpf("");
    setEndereco({
      uf: "",
      cidade: "",
      logradouro: "",
      bairro: "",
      numero: "",
      complemento: "",
      cep: ""
    });

  };

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.containeUserLogin}>
      <div className={styles.itemLoginBemVindo}>
        <div>
          {" "}
          <img src="/img/logo.png" alt="Logo" className={styles.loginLogo} />
        </div>
        <div>
          <h1>Bem-vindo de volta</h1>
        </div>
        <div className={styles.loginInfo}>
          <h2 className={styles.loginInfoH2}>
            Para se manter conectado conosco, faça o login com suas informações
            pessoais
          </h2>
        </div>
        <div>
          <Link to="/login-entrar">
            <button className={styles.buttonLoginEntrar}>Entrar</button>
          </Link>
        </div>
      </div>

      <div className={styles.itemLoginConta}>
        <h2 className={styles.loginContaH2}>Criar Conta </h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group as={Row} controlId="formNome">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaUser className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
              />
            </div>
          </Form.Group>
          <Form.Group as={Row} controlId="formCpf">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaUser className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
                required
              />
            </div>
          </Form.Group>
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
                required
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
                required
              />

              <div
                className={styles.alternarSenha}
                onClick={alternarMostrarSenha}
              >
               {mostrarSenha ?  <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </Form.Group>

          <div>
            <Button
              className={styles.buttonExpandirEndereco}
              variant="secondary"
              onClick={handleToggleExpand}
            >
              {isExpanded ? "Recolher" : "Expandir"} Cadastro de Endereço
            </Button>

            {isExpanded && (
              <Form id="livroForm">
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="cep">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="CEP"
                            name="cep"
                            value={endereco.cep}
                            onChange={(e) => {
                              const cep = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                cep: cep
                              }));
                              buscarEndereco(cep);
                            }}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="uf">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Estado"
                            name="uf"
                            value={endereco.uf}
                            onChange={(e) => {
                              const uf = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                uf: uf
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="cidade">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Cidade"
                            name="cidade"
                            value={endereco.cidade}
                            onChange={(e) => {
                              const cidade = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                cidade: cidade
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="logradouro">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Logradouro"
                            name="logradouro"
                            value={endereco.logradouro}
                            onChange={(e) => {
                              const logradouro = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                logradouro: logradouro
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="bairro">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Bairro"
                            name="bairro"
                            value={endereco.bairro}
                            onChange={(e) => {
                              const bairro = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                bairro: bairro
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="numero">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Número"
                            name="numero"
                            value={endereco.numero}
                            onChange={(e) => {
                              const numero = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                numero: numero
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className={styles.containerEndereco}>
                  <Row>
                    <Col>
                      <Form.Group controlId="complemento">
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrarEndereco}
                            type="text"
                            placeholder="Complemento"
                            name="complemento"
                            value={endereco.complemento}
                            onChange={(e) => {
                              const complemento = e.target.value;
                              setEndereco((prevState) => ({
                                ...prevState,
                                complemento: complemento
                                
                              }));
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Form>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit" className={styles.buttonLoginCadastrar}>
              Cadastrar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginCadastrar;
