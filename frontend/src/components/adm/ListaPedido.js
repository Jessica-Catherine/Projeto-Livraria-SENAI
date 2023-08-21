import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../adm/ListaPedido.module.css";

function ListaPedido() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetch("http://localhost:8082/pedido/dto")
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
<>
  <div className={`${styles.containerCadastroLivro} ${styles.customClass}`}>
    <h2 className={`${styles.tituloListarPedido} ${styles.customClass}`}>
      Listar Pedidos
    </h2>
    <div className={`${styles.linhaHorizontal} ${styles.customClass}`} />
    <Button
      className={`${styles.buttonExpandir} ${styles.customClass}`}
      variant="secondary"
      onClick={handleToggleExpand}
    >
      {isExpanded ? "Recolher" : "Expandir"} Lista
    </Button>
    <br />
    <br />
    {isExpanded && (
      <>
        <div className={`${styles.tableContainer} ${styles.customClass}`}>
          <table className={`${styles.customClass}`}>
            <thead>
              <tr className={`${styles.customClass}`}>
                <th className={`${styles.customClass}`}>ID</th>
                <th className={`${styles.customClass}`}>Data do Pedido</th>
                <th className={`${styles.customClass}`}>
                  Valor Total do Pedido
                </th>
                <th className={`${styles.customClass}`}>Usuario</th>
                <th className={`${styles.customClass}`}>Itens</th>
              </tr>
            </thead>
            <tbody>
              {pedidos
                .slice(indexOfFirstRecord, indexOfLastRecord)
                .map((pedido) => (
                  <tr key={pedido.id} className={`${styles.customClass}`}>
                    <td className={`${styles.customClass}`}>{pedido.id}</td>
                    <td className={`${styles.customClass}`}>
                      {pedido.dataPedido}
                    </td>
                    <td className={`${styles.customClass}`}>
                      {pedido.valorTotal}
                    </td>
                    <td className={`${styles.customClass}`}>
                      {pedido.usuario_id}
                    </td>
                    <td className={`${styles.customClass}`}>
                      {pedido.itensDTO && pedido.itensDTO.length > 0 ? (
                        <ul className={styles.customClass}>
                          {pedido.itensDTO.map((item) => (
                            <li key={item.id} className={styles.listaPedidoLi}>
                              <div className={styles.listaPedidoLiDiv}>
                                Quantidade: {item.qtdeItens}
                              </div>
                              <div className={styles.listaPedidoLiDiv}>
                                Valor Unitário: {item.valorUnid}
                              </div>
                              <div className={styles.listaPedidoLiDiv}>
                                Valor Total: {item.valorTotal}
                              </div>
                              <div className={styles.listaPedidoLiDiv}>
                                Tipo de Livro: {item.detalheLivroDTO.tipoLivro}
                              </div>
                              <div className={styles.listaPedidoLiDiv}>
                                Id do Livro: {item.detalheLivroDTO.livroId}
                              </div>
                              <div className={styles.listaPedidoLiDiv}>
                                Titulo do Livro: {item.detalheLivroDTO.livro.titulo}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={`${styles.customClass}`}>
                          Nenhum item disponível.
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.pagination}`}>
          <Button
            className={`${styles.paginacaoButton}`}
            variant="secondary"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          {Array.from({
            length: Math.ceil(pedidos.length / recordsPerPage),
          }).map((pageNumber, index) => (
            <Button
              key={index}
              className={styles.paginacaoButton}
              variant="secondary"
              onClick={() => goToPage(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            className={styles.paginacaoButton}
            variant="secondary"
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(pedidos.length / recordsPerPage)
            }
          >
            Próxima
          </Button>
        </div>
      </>
    )}
  </div>
  <div className={`${styles.linhaHorizontal} ${styles.customClass}`} />
</>

  );
}

export default ListaPedido;
