import Banner from "../../components/carousel/carouselUser/Banner";
import Navbar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import Destaque from "../../components/carousel/carouselUser/Destaque";
import Oferta from "../../components/carousel/carouselUser/Oferta";
import styles from "../styles/Home.module.css";

import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/livro")
      .then((response) => {
        console.log(response.data);
        setLivros(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const livrosDestaque = livros.filter((livro) => livro.destaque);
  const livrosOferta = livros.filter((livro) => livro.oferta);

  return (
    <>
      <Navbar />
      <Banner />
      <div className={styles.containerCarousel}>

        <Destaque livros={livrosDestaque} />
        <Oferta livros={livrosOferta} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
