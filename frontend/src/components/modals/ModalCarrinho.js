import styles from "../modals/Modal.module.css";
import { AiFillDelete, AiOutlineClose, AiFillEdit } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import PaymentMethodSelect from "../../components/layout/PaymentMethodSelect";
import { toast } from "react-toastify";

import React from "react";
import { AuthContext } from "../layout/AuthContext";
import { Link } from "react-router-dom";

const ModalCarrinho = ({
  livro,
  detalhe,
  isOpen,
  onClose,
  carrinho,
  setCarrinho,
}) => {

  const { user } = useContext(AuthContext);
  const [endereco, setEndereco] = useState();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  
  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let qtde = 0;
    let valor = 0;
    carrinho.forEach((livro) => {
      qtde += livro.quantidade;
      valor += livro.oferta
        ? livro.preco * 0.8 * livro.quantidade
        : livro.preco * livro.quantidade;
    });
    setQtdeTotal(qtde);
    setTotal(valor);
  }, [carrinho]);


  const handleRemoveItem = (item) => {
    const updatedCarrinho = carrinho.filter((livro) => livro.id !== item.id);
    setCarrinho(updatedCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
    window.location.reload();
  };

  const handleIncrementQuantity = (item) => {
    const updatedCarrinho = carrinho.map((livro) => {
      if (livro.id === item.id) {
        return { ...livro, quantidade: livro.quantidade + 1 };
      }
      return livro;
    });
    setCarrinho(updatedCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
  };

  const handleDecrementQuantity = (item) => {
    const updatedCarrinho = carrinho.map((livro) => {
      if (livro.id === item.id && livro.quantidade > 1) {
        return { ...livro, quantidade: livro.quantidade - 1 };
      }
      return livro;
    });
    setCarrinho(updatedCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
  };

  const getTotalPrice = () => {
    let total = 0;
    carrinho.forEach((livro) => {
      total += livro.preco * livro.quantidade;
    });
    return total;
  };
  if (!isOpen) {
    return null;
  }

  const onFinalizarPedido = () => {

    if (!userId) {
      console.error("ID do usuário não foi obtido");
      return;
    }
    // Criar objeto com os dados do pedido
    const pedido = {
      id: -1,
      dataPedido: new Date().toISOString().slice(0, 10),
      usuario_id: userId,
      valorTotal: total,
      itensDTO: carrinho.map((livro) => ({
        id: -1,
        valorUnid: livro.oferta ? livro.preco * 0.8 : livro.preco,
        valorTotalItem: livro.oferta
          ? livro.preco * 0.8 * livro.quantidade
          : livro.preco * livro.quantidade,
        qtdeItens: livro.quantidade,
        detalhe_id: livro.id, // Usar o ID do detalhe do livro aqui
        detalhe_livro_id: livro.id, // Usar o ID do detalhe do livro aqui
      })),
    };

    console.log(pedido);
    // Transformar objeto em JSON
    const pedidoJSON = JSON.stringify(pedido);

    // Enviar pedidoJSON para a API gravar no banco
    // Exemplo de envio de dados para uma API usando o método POST
    fetch("http://localhost:8082/pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: pedidoJSON,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Pedido gravado no banco:", data);
        // Limpar carrinho após finalizar o pedido
        setCarrinho([]);
        localStorage.removeItem("carrinho");
        toast.success("Recebemos seu pedido!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

        carrinho.forEach((livro) => {
          const detalheId = livro.id;
          const quantidadePedida = livro.quantidade;

          // Fazer uma requisição para a API atualizar a quantidade em estoque do detalheLivro
          fetch(`http://localhost:8082/detalhelivro/${detalheId}/estoque`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(quantidadePedida),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Quantidade em estoque do detalheLivro atualizada:", data);
            })
            .catch((error) => {
              console.error("Erro ao atualizar quantidade em estoque do detalheLivro:", error);
            });
        });

      })
      .catch((error) => {
        console.error("Erro ao gravar pedido no banco:", error);
      });
  };

  function closeModal() {
    setModalIsOpenLivroAdd(false);
  }

  return (
    <>
      <div className={styles.modalCarrinhoContainer}>
        <div className={styles.modalBackground} />

        <div className={styles.modalCarrinho}>
          <div className={styles.navBarCarrinho}>
            <ul className={styles.navBarCarrinhoUl}>
              <li>
                <FaShoppingCart alt="cesta" className={styles.navbarCesta} />
              </li>
              <li className={styles.navBarCarrinhoLi}>
                <h1 className={styles.sacolaH1}>Meu Carrinho</h1>
              </li>
            </ul>
            <div>
              <button className={styles.navBarCarrinhoButton} onClick={onClose}>
                <AiOutlineClose className={styles.imgFechar} />
              </button>
            </div>
          </div>
          <div className={styles.bodyLista}>
            <br></br>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>1</th>
                <th className={styles.thSecaoTit}>Revisar itens</th>
              </tr>
            </table>

            {carrinho.map((livro) => (
              <div className={styles.listaItemCarrinho}>
                <div key={livro.id}></div>
                <div className={styles.containerLista}>
                  <div className={styles.gridListaImg}>
                    <div className={styles.divImg}>
                      <img
                        className={styles.imagemGrid}
                        src={livro.imagem}
                        alt={livro.titulo}
                      />
                    </div>
                  </div>
                  <div className={styles.containerListaInfo}>
                    <div className={styles.gridListaInfo}>
                      <div className={styles.divComprarLivros}>
                        <div className={styles.divTituloExcluir}>
                          <p className={styles.tituloTipoLivro}>
                            {livro.tipoLivro}
                          </p>
                          <p className={styles.tituloItem}>
                            {livro.titulo}
                            <button
                              className={styles.imgExcluirItemCarrinho}
                              onClick={() => handleRemoveItem(livro)}
                            >
                              <AiFillDelete />
                            </button>
                          </p>
                        </div>

                        <div className={styles.divPreco}>
                          {livro.oferta ? (
                            <div className={styles.divPrecoOferta}>
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Preço: </span>
                                <span className={styles.precoAntigo}>
                                  {livro.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                                </span>
                              </p>

                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>
                                  Preço em Oferta:{" "}
                                </span>
                                <span className={styles.precoOferta}>
                                  {(livro.preco * 0.8).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <p className={styles.precoTit}>
                              <span className={styles.precoTit}>Preço: </span>
                              <span className={styles.precoRegular}>
                                {livro.preco}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className={styles.qtde}>
                          <div>
                            {livro.oferta ? (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>
                                <span className={styles.precoRegular}>
                                  {(livro.preco * 0.8 * livro.quantidade).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                                </span>
                              </p>
                            ) : (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>

                                <span className={styles.precoRegular}>
                                  {(livro.preco * livro.quantidade).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                                </span>
                              </p>
                            )}
                          </div>
                          <div>
                            <button
                              className={styles.buttonQtde}
                              onClick={() => handleDecrementQuantity(livro)}
                              
                            >
                              -
                            </button>
                            <span className={styles.spanQtde}>
                              {livro.quantidade}
                            </span>
                            <button
                              className={styles.buttonQtde}
                              onClick={() => handleIncrementQuantity(livro)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.linhaHorizontal} />
          <div className={styles.containerEndereco}>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>2</th>
                <th className={styles.thSecaoTit}>Endereço de entrega</th>
                <th className={styles.thSecaoInf}>
                  <p>{user.nome}</p>
                  <p>{user.enderecos[0].logradouro}, {user.enderecos[0].numero}</p>
                  <p>{user.enderecos[0].complemento}</p>
                  <p>{user.enderecos[0].bairro}</p>
                  <p>{user.enderecos[0].cidade}, {user.enderecos[0].uf}, {user.enderecos[0].cep}</p>
                </th>
                <th className={styles.thSecao}>
                  <Link to="/perfil-usuario"><AiFillEdit className={styles.editarEndereco}/></Link>
                </th>
              </tr>
            </table>
          </div>

          <div className={styles.linhaHorizontal} />

          <div className={styles.containerFormaPgto}>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>3</th>
                <th className={styles.thSecaoTit}>Método de pagamento</th>
                <th className={styles.thSecaoInf}>
                  <div>
                    <p>Selecione o Método de Pagamento</p>
                    <PaymentMethodSelect />
                  </div>
                  <div>
                    <p for="cards">Selecione as opções de parcelamento</p>

                    <select name="parcelas" id="parcelas">
                      <option value="1x sem juros">1x sem juros</option>
                      <option value="2x sem juros">2x sem juros</option>
                      <option value="3x sem juros">3x sem juros</option>
                      <option value="4x sem juros">4x sem juros</option>
                      <option value="5x sem juros">5x sem juros</option>
                      <option value="6x sem juros">6x sem juros</option>
                    </select>
                  </div>
                </th>

              </tr>
            </table>
          </div>

          <div className={styles.totalCarrinho}>
            <div className={styles.valorCarrinho}>
              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Resumo do Pedido</span>
                </li>
              </ul>
              <div className={styles.linhaHorizontal} />
              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Entrega GRÁTIS:</span>
                </li>
                <li>
                  <span>2 dias úteis</span>
                </li>
              </ul>

              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Total de Livros:</span>
                </li>
                <li>
                <span>{qtdeTotal}</span>
                </li>
              </ul>
              <div className={styles.linhaHorizontal} />
              <ul className={styles.valorTotal}>
                <li>
                  <span>Valor Total:</span>
                </li>
                <li>
                  <span>
                  {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </li>
              </ul>
              <div>
                <button
                  className={styles.carrinhoButtonComprar}
                  onClick={() => {
                    setModalIsOpenLivroAdd(true); // Abre o modal
                    onFinalizarPedido(); // Realiza a ação de finalizar o pedido
                  }}
                >
                  Finalizar Pedido
                </button>

                {/* <Modal
                  className={styles.modalCompra}
                  isOpen={modalIsOpenLivroAdd}
                  onRequestClose={closeModal}
                  contentLabel="Pedido realizado com sucesso!"
                  style={customStyles}
                  overlayStyle={customStyles.overlay}
                >
                  <button
                    className={styles.buttonFecharModal}
                    onClick={() => {
                      closeModal();
                      window.location.reload();
                    }}
                  >
                    <AiOutlineClose className={styles.imgFechar} />
                  </button>
                  <h2 className={styles.h2AdicionarSacola}>
                    Pedido realizado com sucesso!
                  </h2>
                </Modal> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCarrinho;
