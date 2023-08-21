import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import {
  AiOutlineClose,
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineHeart,
} from "react-icons/ai";
import {
  BiBook,
  BiCalendar,
  BiFile,
  BiBuilding,
  BiUser,
  BiBookmark,
} from "react-icons/bi";
import Modal from "react-modal";
import Navbar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import styles from "../styles/InformacaoLivro.module.css";
import "react-toastify/dist/ReactToastify.css";

function InformacaoLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [detalheSelecionado, setDetalheSelecionado] = useState(null);
  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  const [carrinho, setCarrinho] = useState([]);
  const [favorito, setFavorito] = useState([]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    const favoritoSalvo = localStorage.getItem("favorito");
    if (favoritoSalvo) {
      setFavorito(JSON.parse(favoritoSalvo));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/livro/${id}?_embed=detalhes`)
      .then((response) => {
        setLivro(response.data);
        // Inicializa o estado detalheSelecionado com o primeiro detalhe do livro
        if (response.data.detalhes.length > 0) {
          setDetalheSelecionado(response.data.detalhes[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!livro) {
    return <p>Carregando...</p>;
  }

  const detalheSelecionadoObj = livro.detalhes.find(
    (detalhe) => detalhe.id === detalheSelecionado
  );

  function adicionarAoCarrinho(detalhe) {
    if (!detalhe) {
      return;
    }

    if (detalhe.qtdeEstoque > 0) {
      const itemCarrinho = {
        ...detalhe,
        quantidade: 1,
        oferta,
        imagem,
      };

      const novoCarrinho = [...carrinho, itemCarrinho];
      setCarrinho(novoCarrinho);
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      toast.success("Livro adicionado ao carrinho!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      setModalIsOpenLivroAdd(true);
    } else {
      toast.error("Livro sem estoque!");
    }
  }

  const adicionarAoFavorito = (livro) => {
    if (!livro) {
      return;
    }

    const itemFavorito = {
      livro: {
        id: livro.id,
        titulo: livro.titulo,
        imagem: livro.imagem,
        oferta: livro.oferta,
      },
    };

    const novoFavorito = [...favorito, itemFavorito];
    setFavorito(novoFavorito);
    localStorage.setItem("favorito", JSON.stringify(novoFavorito));

    toast.success("Livro adicionado aos favoritos!");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const removerDosFavoritos = (livro) => {
    if (!livro) {
      return;
    }

    const novoFavorito = favorito.filter((item) => item.livro.id !== livro.id);
    setFavorito(novoFavorito);
    localStorage.setItem("favorito", JSON.stringify(novoFavorito));

    toast.success("Livro removido dos favoritos!");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  function closeModal() {
    setModalIsOpenLivroAdd(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "9999",
    },
  };

  const {
    titulo,
    autor,
    anoPublicacao,
    sinopse,
    genero,
    editora,
    qtdePagina,
    oferta,
    destaque,
    imagem,
    detalhes,
  } = livro;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Link to={"/"}>
          <h1 className={styles.voltarHome}>
            <AiOutlineArrowLeft />
            Voltar
          </h1>
        </Link>
        <div className={styles.linhaHorizontal} />
        <div className={styles.gridContainer}>
          <div className={styles.gridItemLong}>
            <img
              className={styles.imagemLivro}
              src={livro.imagem}
              alt={livro.titulo}
            />
          </div>
          <div className={styles.gridItemLong}>
            <div className={styles.containerInfoLivro}>
              <div className={styles.divTituloFavorito}>
                <p
                  className={styles.tituloFavorito}
                  onClick={() => {
                    if (favorito.some((item) => item.livro.id === livro.id)) {
                      removerDosFavoritos(livro);
                    } else {
                      adicionarAoFavorito(livro);
                    }
                  }}
                >
                  {favorito.some((item) => item.livro.id === livro.id) ? (
                    <AiFillHeart color="#015a80" />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </p>
              </div>
              <p className={styles.titulo}>{livro.titulo}</p>
              <p className={styles.autor}>{livro.autor}</p>
              <p className={styles.editora}>{livro.editora}</p>
              <div className={styles.tipoLivroDetalhe}>
                <p>{detalhes.tipoLivro}</p>

                <p>{detalhes.preco}</p>
              </div>
              <div className={styles.linhaHorizontalDetalhe} />
              <p className={styles.sinopse}>{livro.sinopse}</p>
            </div>
          </div>

          <div className={styles.comprarLivros}>
            {livro.detalhes.map((detalhe) => (
              <div className={styles.divComprarLivros} key={detalhe.id}>
                <div className={styles.compra}>
                  <div className={styles.divPreco}>
                    <ul className={styles.ulCompraInfoTipo}>
                      <li>
                        <span className={styles.liCompraInfoTit}>
                          {detalhe.tipoLivro}
                        </span>
                      </li>
                    </ul>
                    {livro.oferta ? (
                      <>
                        <ul className={styles.ulCompraInfo}>
                          <li>
                            <span className={styles.liCompraInfoTitPreco}>
                              Preço:
                            </span>
                          </li>
                          <li>
                            <span className={styles.precoAntigo}>
                              {detalhe.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </li>
                        </ul>

                        <ul className={styles.ulCompraInfo}>
                          <li>
                            <span className={styles.liCompraInfoTitPreco}>
                              Preço Oferta:
                            </span>
                          </li>
                          <li>
                            <span className={styles.precoOferta}>
                              {(detalhe.preco * 0.8).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <ul className={styles.ulCompraInfo}>
                          <li>
                            <span className={styles.liCompraInfoTitPreco}>
                              Preço:
                            </span>
                          </li>
                          <li>
                            <span className={styles.precoRegular}>
                              {detalhe.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </li>
                        </ul>
                      </>
                    )}
                    <ul className={styles.ulCompraInfoEntrega}>
                      <li>
                        <span className={styles.liEntrega}>
                          Entrega GRÁTIS:
                        </span>
                      </li>
                      <li>
                        <span className={styles.liCompraInfo}>
                          2 dias úteis
                        </span>
                      </li>
                    </ul>
                    <ul className={styles.ulCompraInfo}>
                      <li>
                        <span className={styles.estoque}>
                          {detalhe.qtdeEstoque === 0
                            ? "Sem estoque"
                            : "Em estoque"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    className={styles.buttonCompra}
                    onClick={() => adicionarAoCarrinho(detalhe)}
                  >
                    <h1 className={styles.h1AdicionarSacola}>
                      Adicionar à sacola
                    </h1>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.linhaHorizontal} />

        <div>
          <div className={styles.gridFichaTecnica}>
            <div className={styles.gridItemFichaTecnica}>
              <p className={styles.tituloFichaTecnica}>Livro</p>
              <BiBook className={styles.iconFichaTecnica} />
              <p className={styles.infoFichaTecnica}>{livro.titulo}</p>
            </div>
            <div className={styles.gridItemFichaTecnica}>
              <p className={styles.tituloFichaTecnica}>Ano de publicação</p>
              <BiCalendar className={styles.iconFichaTecnica} />
              <p className={styles.infoFichaTecnica}>{livro.anoPublicacao}</p>
            </div>
            <div className={styles.gridItemFichaTecnica}>
              <p className={styles.tituloFichaTecnica}>Número de páginas</p>
              <BiFile className={styles.iconFichaTecnica} />
              <p className={styles.infoFichaTecnica}>{livro.qtdePagina}</p>
            </div>
            <div className={styles.gridItemFichaTecnica}>
              <p className={styles.tituloFichaTecnica}>Editora</p>
              <BiBuilding className={styles.iconFichaTecnica} />
              <p className={styles.infoFichaTecnica}>{livro.editora}</p>
            </div>
            <div className={styles.gridItemFichaTecnica}>
              <p className={styles.tituloFichaTecnica}>Autor</p>
              <BiUser className={styles.iconFichaTecnica} />
              <p className={styles.infoFichaTecnica}>{livro.autor}</p>
            </div>
            <div className={styles.gridItemFichaTecnica}>
              <p className={styles.tituloFichaTecnica}>Gênero</p>
              <BiBookmark className={styles.iconFichaTecnica} />
              <p className={styles.infoFichaTecnica}>{livro.genero}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InformacaoLivro;
