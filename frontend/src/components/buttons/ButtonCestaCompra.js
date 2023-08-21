import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ModalCarrinho from "../modals/ModalCarrinho";
import styles from "./Button.module.css";

const ButtonCestaCompra = () => {
  const [livro, setLivro] = useState(null);
  const [detalhe, setDetalhe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <>
      <div>
        {carrinho.length > 0 && (
          <span className={styles.cartCount}>{carrinho.length}</span>
        )}
        <button className={styles.navbarButton} onClick={handleOpenModal}>
          <FaShoppingCart alt="cesta" className={styles.navbarCesta} />
        </button>
      </div>
      <ModalCarrinho
        livro={livro}
        detalhe={detalhe}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        carrinho={carrinho}
        setCarrinho={setCarrinho}
      />
    </>
  );
};

export default ButtonCestaCompra;