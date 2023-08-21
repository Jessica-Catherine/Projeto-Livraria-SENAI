import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import styles from "../styles/ResultadoPesquisa.module.css";

import Footer from "../../components/layout/Footer";
import NavbarAdm from "../../components/adm/NavBarAdm";
import CardAdm from "../../components/cards/CardAdm";

function ResultadosPesquisaAdm() {
  const location = useLocation();
  const { results } = location.state || [];

  return (
    <>
      <NavbarAdm />
      <div className={styles.container}>          <section className={styles.tituloResultadoContainer}>
            <Link to={"/"}>
              <h1 className={styles.voltarHome}>
                <AiOutlineArrowLeft />
                Voltar
              </h1>
            </Link>
            <div className={styles.linhaHorizontal}/>
            <h2 className={styles.resultadoBusca}>
              Exibindo resultados para: {location.state.term}{" "}
            </h2>

            <h3 className={styles.resultadoCount}>
              {results.length} livros encontrados
            </h3>

          </section>
        <div className={styles.containerResultadoPesquisa}>


          {location.state.results.map((livro) => (
          <CardAdm key={livro.idLivro} livro={livro} />
        ))}

          {!results && (
            <p className={styles.semResultado}>Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResultadosPesquisaAdm;
