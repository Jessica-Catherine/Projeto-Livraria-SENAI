import { useState, useEffect } from "react";

import styles from "./Button.module.css";
import { AiFillHeart } from "react-icons/ai";
import ModalFavorito from "../modals/ModalFavorito";


const ButtonFavoritos = () => {
  const [livro, setLivro] = useState(null);
  const [detalhe, setDetalhe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [favorito, setFavorito] = useState([]);

  useEffect(() => {
    const favoritoSalvo = localStorage.getItem("favorito");
    if (favoritoSalvo) {
      setFavorito(JSON.parse(favoritoSalvo));
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        {favorito.length > 0 && (
          <span className={styles.cartCount}>{favorito.length}</span>
        )}
        <button className={styles.navbarButtonFav} onClick={handleOpenModal}>
          <AiFillHeart className={styles.iconFavorito} />
        </button>
      </div>
      <ModalFavorito
        livro={livro}
        detalhe={detalhe}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        favorito={favorito}
      />
    </>
  );
};

export default ButtonFavoritos;
