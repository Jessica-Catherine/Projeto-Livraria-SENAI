import React, { useState } from "react";
import styles from "../cards/Card.module.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";
import axios from "axios";

function CardAdm({ livro }) {
  const ebookDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "EBOOK"
  );
  const fisicoDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "FISICO"
  );

  const [lista, setLista] = useState([]);

  const handleDeleteLivro = (id) => {
    // Verifica se há pedidos relacionados ao livro
    axios
      .get('http://localhost:8082/pedido/dto')
      .then((response) => {
        const pedidos = response.data;
  
        // Verifica se algum pedido contém o livro em questão
        const livroPedido = pedidos.find(
          (pedido) =>
            pedido.itensDTO &&
            pedido.itensDTO.some(
              (item) => item.detalheLivroDTO.livroId === id
            )
        );
  
        if (livroPedido) {
          // Exibe mensagem informando que o livro não pode ser deletado
          console.log('Não é possível excluir o livro. Já existe um pedido relacionado a ele.');
          toast.success("Não é possível excluir o livro. Já existe um pedido relacionado a ele.");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          // Caso não haja pedidos relacionados, prossegue com a exclusão do livro
          axios
            .delete(`http://localhost:8082/livro/${id}`)
            .then((response) => {
              // Atualiza a lista de livros para excluir o livro deletado
              setLista(lista.filter((livro) => livro.id !== id));
              toast.success("Livro excluído com sucesso.");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div className={styles.containerCardAdm}>
      <div className={styles.cardAdm}>
        <div className={styles.containerCardImage}>
          <img
            src={livro.imagem}
            alt={livro.titulo}
            className={styles.cardImageLivro}
          />
        </div>
        <div className={styles.cardTitulo}>
          <h2 className={styles.h2TituloCardAdm}>{livro.titulo}</h2>
        </div>
        <div className={styles.containerButtonAdm}>
          <Link
            to={{
              pathname: `/informacao-livro-adm/${livro.id}`,
              state: { livro, detalhelivro: [ebookDetalhe, fisicoDetalhe] },
            }}
          >
            <button className={styles.buttonCardAdm}>Editar</button>
          </Link>
          <button
            className={styles.buttonCardAdm}
            onClick={() => {handleDeleteLivro(livro.id)
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAdm;
