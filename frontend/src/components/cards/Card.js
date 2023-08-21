import React from "react";
import styles from "../cards/Card.module.css";
import { Link } from "react-router-dom";

function Card({ livro }) {
  const ebookDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "EBOOK"
  );

  const fisicoDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "FISICO"
  );

  const ebookPreco = ebookDetalhe && ebookDetalhe.preco !== 0 ? ebookDetalhe.preco : null;
  const fisicoPreco = fisicoDetalhe && fisicoDetalhe.preco !== 0 ? fisicoDetalhe.preco : null;
  const ebookPrecoDesc = ebookDetalhe && ebookDetalhe.precoDesc !== 0 ? ebookDetalhe.precoDesc : null;
  const fisicoPrecoDesc = fisicoDetalhe && fisicoDetalhe.precoDesc !== 0 ? fisicoDetalhe.precoDesc : null;

  const isPrecoRegular = livro.oferta === true || livro.oferta === true;

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <div className={styles.containerCardImage}>
          <Link
            to={{
              pathname: `/informacao-livro/${livro.id}`,
              state: { livro, detalhes: livro.detalhes },
            }}
          >
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className={styles.cardImageLivro}
            />
          </Link>
        </div>
        <h2 className={styles.h2TituloCard}>{livro.titulo}</h2>
        <div className={styles.cardPreco}>
          {fisicoDetalhe && fisicoDetalhe.preco !== 0 && (
            <p className={styles.tituloTipoLivro}>{fisicoDetalhe.tipoLivro}</p>
          )}
          {ebookDetalhe && ebookDetalhe.preco !== 0 && (
            <p className={styles.tituloTipoLivro}>{ebookDetalhe.tipoLivro}</p>
          )}
        </div>
        {isPrecoRegular ? (
          <div className={styles.cardOferta}>
            <div className={styles.cardPreco}>
              {fisicoPreco && (
                <p className={styles.precoAntigo}>
                  {fisicoPreco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              )}
              {ebookPreco && (
                <p className={styles.precoAntigo}>
                  {ebookPreco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              )}
            </div>
            <div className={styles.cardPreco}>
              {fisicoPrecoDesc && (
                <p className={styles.precoOferta}>
                  {fisicoPrecoDesc.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              )}
              {ebookPrecoDesc && (
                <p className={styles.precoOferta}>
                  {ebookPrecoDesc.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.cardPreco}>
            {fisicoPreco && (
              <p className={styles.precoRegular}>
                {fisicoPreco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}
            {ebookPreco && (
              <p className={styles.precoRegular}>
                {ebookPreco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
