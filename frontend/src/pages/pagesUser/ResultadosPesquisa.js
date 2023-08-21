import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Card from "../../components/cards/Card";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/NavBar";

import styles from "../styles/ResultadoPesquisa.module.css";

function ResultadosPesquisa() {
  const location = useLocation();
  const { results } = location.state || [];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <section className={styles.tituloResultadoContainer}>
            <Link to={"/"}>
              <h1 className={styles.voltarHome}>
                <AiOutlineArrowLeft />
                Voltar
              </h1>
            </Link>
            <div className={styles.linhaHorizontal} />
            <h2 className={styles.resultadoBusca}>
              Exibindo resultados para: {location.state.term}{" "}
            </h2>

            <h3 className={styles.resultadoCount}>
              {results.length} livros encontrados
            </h3>
          </section>
        <div className={styles.containerResultadoPesquisa}>


          {/* <div className={styles.linhaHorizontal}/> */}

          {location.state.results.map((livro) => (
            <Card key={livro.idLivro} livro={livro} />
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

export default ResultadosPesquisa;
