import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "../../pages/styles/toastify-theme.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../adm/CadastroLivro.module.css";

function CadastroLivro() {
  const [isExpanded, setIsExpanded] = useState(false);


  function postLivro(event) {
    event.preventDefault();

    const precoFisico = parseFloat(document.getElementById("precoFisico").value);
    const qtdeEstoqueFisico = parseInt(
      document.getElementById("qtdeEstoqueFisico").value
    );
    const precoEbook = parseFloat(document.getElementById("precoEbook").value);
    const qtdeEstoqueEbook = parseInt(
      document.getElementById("qtdeEstoqueEbook").value
    );

    const livro = {
      anoPublicacao: document.getElementById("anoPublicacao").value,
      titulo: document.getElementById("titulo").value,
      autor: document.getElementById("autor").value,
      genero: document.getElementById("genero").value,
      editora: document.getElementById("editora").value,
      sinopse: document.getElementById("sinopse").value,
      imagem: document.getElementById("imagem").value,
      qtdePagina: document.getElementById("qtdePagina").value,
      oferta: document.getElementById("oferta").checked,
      destaque: document.getElementById("destaque").checked,
      detalhes: [],
    };
  
    if (!isNaN(precoFisico) && !isNaN(qtdeEstoqueFisico)) {
      livro.detalhes.push({
        tipoLivro: "FISICO",
        preco: precoFisico,
        qtdeEstoque: qtdeEstoqueFisico,
      });
    } else {
      livro.detalhes.push({
        tipoLivro: "FISICO",
        preco: 0.00,
        qtdeEstoque: 0,
      });
    }
  
    if (!isNaN(precoEbook) && !isNaN(qtdeEstoqueEbook)) {
      livro.detalhes.push({
        tipoLivro: "EBOOK",
        preco: precoEbook,
        qtdeEstoque: qtdeEstoqueEbook,
      });
    } else {
      livro.detalhes.push({
        tipoLivro: "EBOOK",
        preco: 0.00,
        qtdeEstoque: 0,
      });
    }

    fetch("http://localhost:8082/livro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((response) => {
      if (response.ok) {
        console.log("Livro cadastrado com sucesso!");
        toast.success("Livro cadastrado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          onClose: () => {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
        });
        } else {
          console.error("Erro ao cadastrar livro.");
        }
      })
      .catch((error) => {
        console.error("Erro ao cadastrar livro:", error);
      });
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={styles.containerCadastroLivro}>
        <h2 className={styles.tituloCadastroLivro}>Cadastrar Livros</h2>
        <div className="linhaHorizontal" />
        <Button
          className={styles.buttonExpandir}
          variant="secondary"
          onClick={handleToggleExpand}
        >
          {isExpanded ? "Recolher" : "Expandir"} Formulário
        </Button>
        <br />
        <br />
        {isExpanded && (
          <Form id="livroForm" onSubmit={postLivro}>
            <div className={styles.containerSmall}>
              <Row>
                <Col>
                  <Form.Group controlId="titulo">
                    <Form.Label className={styles.labelCadastro}>
                      Título:
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        placeholder="Digite o título do livro"
                        name="titulo"
                        required
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="autor">
                    <Form.Label className={styles.labelCadastro}>
                      Autor:
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        placeholder="Digite o nome do autor"
                        name="autor"
                        required
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className={styles.containerSmall}>
              <Row>
                <Col>
                  <Form.Group controlId="genero" as={Row}>
                    <Form.Label column sm="12" className={styles.labelCadastro}>
                      Gênero:
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={styles.inputCadastrar}
                        as="select"
                        name="genero"
                        required
                      >
                        <option value="">Selecione um gênero</option>
                        <option value="Ação">Ação</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Romance">Romance</option>
                        <option value="Ficção Científica">
                          Ficção Científica
                        </option>
                        <option value="Fantasia">Fantasia</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Mistério">Mistério</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Comédia">Comédia</option>
                        <option value="Biografia">Biografia</option>
                        <option value="Autobiografia">Autobiografia</option>
                        <option value="História">História</option>
                        <option value="Autoajuda">Autoajuda</option>
                        <option value="Negócios">Negócios</option>
                        <option value="Autoconhecimento">
                          Autoconhecimento
                        </option>
                        <option value="Autores Nacionais">
                          Autores Nacionais
                        </option>
                        <option value="Poesia">Poesia</option>
                        <option value="Poesia">Outros</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="editora">
                    <Form.Label className={styles.labelCadastro}>
                      Editora:
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        rows={3}
                        placeholder="Digite a editora do livro"
                        name="editora"
                        required
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className={styles.containerSmall}>
              <Row>
                <Col>
                  <Form.Group controlId="anoPublicacao">
                    <Form.Label className={styles.labelCadastro}>
                      Ano de Publicação:
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="number"
                        rows={3}
                        placeholder="Digite a ano de publicação do livro"
                        name="anoPublicacao"
                        required
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="qtdePagina">
                    <Form.Label className={styles.labelCadastro}>
                      Quantidade de Páginas:
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="number"
                        rows={3}
                        placeholder="Digite a quantidade de páginas do livro"
                        name="qtdePagina"
                        required
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <Row>
              <Col>
                <Form.Group controlId="imagem">
                  <Form.Label className={styles.labelCadastro}>
                    URL da Imagem:
                  </Form.Label>
                  <Form.Control
                    className={styles.inputImagemCadastrar}
                    type="text"
                    rows={3}
                    placeholder="Digite a imagem do livro"
                    name="imagem"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group as={Row} controlId="sinopse">
              <Form.Label column sm={2} className={styles.labelCadastro}>
                Sinopse:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  className={styles.textArea}
                  as="textarea"
                  rows={10}
                  placeholder="Digite a sinopse do livro"
                  name="sinopse"
                  required
                />
              </Col>
            </Form.Group>
            <br />
            <div className={styles.containerSmall}>
              <Row>
                <Col>
                  <Form.Group controlId="oferta" as={Row}>
                    <Col sm="12">
                      <Form.Check
                        label="Oferta"
                        type="checkbox"
                        name="oferta"
                        className={styles.inputCadastrar}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="destaque" as={Row}>
                    <Col sm="12">
                      <Form.Check
                        type="checkbox"
                        name="destaque"
                        label="Destaque"
                        className={styles.inputCadastrar}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className="linhaHorizontal" />
            <br />

            <div className={styles.containerTtipoLivro}>
              <div>
                <Row>
                  <Col>
                    <Form.Group controlId="tipoLivroFisico" as={Row}>
                      <p column sm="12" className={styles.tipoLivro}>
                        LIVRO FÍSICO
                      </p>
                      <Col sm="12"></Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="precoFisico">
                      <Form.Label className={styles.labelCadastro}>
                        Preço:
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          step="0.01"
                          name="precoFisico"
                          placeholder="0.00"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="qtdeEstoqueFisico">
                      <Form.Label className={styles.labelCadastro}>
                        Quantidade em Estoque:
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          name="qtdeEstoqueFisico"
                          placeholder="0"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div>
                <Row>
                  <Col>
                    <Form.Group controlId="tipoLivroEbook" as={Row}>
                      <p column sm="12" className={styles.tipoLivro}>
                        LIVRO EBOOK
                      </p>
                      <Col sm="12"></Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="precoEbook">
                      <Form.Label className={styles.labelCadastro}>
                        Preço:
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          placeholder="0.00"
                          step="0.01"
                          name="precoEbook"

                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="qtdeEstoqueEbook">
                      <Form.Label className={styles.labelCadastro}>
                        Quantidade em Estoque:
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          placeholder="0"
                          name="qtdeEstoqueEbook"

                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>

            <Button className={styles.buttonCadastrar} type="submit">
              Cadastrar
            </Button>
          </Form>
        )}
      </div>

      <div className="linhaHorizontal" />
    </>
  );
}

export default CadastroLivro;
