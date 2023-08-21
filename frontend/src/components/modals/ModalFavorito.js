import { useEffect, useState } from "react";
import styles from "../modals/Modal.module.css";
import { AiFillDelete, AiOutlineClose, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const ModalFavorito = ({ isOpen, onClose }) => {
  const [favorito, setFavorito] = useState([]);

  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  useEffect(() => {
    const favoritoSalvo = localStorage.getItem("favorito");
    if (favoritoSalvo) {
      setFavorito(JSON.parse(favoritoSalvo));
    }
    console.log(favoritoSalvo);
  }, []);

  const handleIncrementQuantidade = (index) => {
    const novofavorito = [...favorito];
    novofavorito[index].quantidade++;
    setFavorito(novofavorito);
    localStorage.setItem("favorito", JSON.stringify(novofavorito));
  };

  const handleDecrementQuantidade = (index) => {
    const novofavorito = [...favorito];
    novofavorito[index].quantidade--;
    if (novofavorito[index].quantidade === 0) {
      novofavorito.splice(index, 1);
    }
    setFavorito(novofavorito);
    localStorage.setItem("favorito", JSON.stringify(novofavorito));
  };

  const handleRemoveItem = (indexToRemove) => {
    const novofavorito = [...favorito];
    novofavorito.splice(indexToRemove, 1);
    setFavorito(novofavorito);
    localStorage.setItem("favorito", JSON.stringify(novofavorito));
    window.location.reload();
  };

  if (!isOpen) {
    return null;
  }

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

  return (
    <>
      <div className={styles.modalFavoritoContainer}>
        <div className={styles.modalBackground} />
        <div className={styles.modalFavorito}>
          <div className={styles.navBarFavorito}>
            <ul className={styles.navBarFavoritoUl}>
              <li>
                <AiFillHeart alt="favorito" className={styles.navbarCesta} />
              </li>
              <li className={styles.navBarFavoritoLi}>
                <h1 className={styles.sacolaH1}>Meus livros favoritos</h1>
              </li>
            </ul>
            <div>
              <button className={styles.navBarfavoritoButton} onClick={onClose}>
                <AiOutlineClose className={styles.imgFechar} />
              </button>
            </div>
          </div>
          <div className={styles.bodyListaFavorito}>
            <br></br>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTit}>Revisar favoritos</th>
              </tr>
            </table>

            {favorito.map((item, index) => (
              <div className={styles.containerCard}>
                <div key={item.livro.id}></div>
                <div className={styles.card}>
                  <div className={styles.cardImageLivro}>
                    <Link
                      to={{
                        pathname: `/informacao-livro/${item.livro.id}`,
                        state: { detalhes: item.livro.detalhes },
                      }}
                    >
                      {" "}
                      <img
                        src={item.livro.imagem}
                        alt={item.livro.titulo}
                        className={styles.cardImageLivro}
                      />
                    </Link>
                  </div>
                  <div className={styles.cardInformacao}>
                    <p className={styles.cardTitulo}>{item.livro.titulo}</p>
                    <p
                      className={styles.imgExcluirItemFavorito}
                      onClick={() => handleRemoveItem(index)}
                    >
                      <AiFillDelete />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.linhaHorizontal} />
        </div>
      </div>
    </>
  );
};

export default ModalFavorito;
