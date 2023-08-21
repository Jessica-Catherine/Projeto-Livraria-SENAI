import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../cards/Card";
import "../styles/Carousel.css";

function Oferta({livros}) {

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576, // Largura de tela em que as configurações serão alteradas
        settings: {
          slidesToShow: 1, // Exibir apenas 1 card
        },
      },
    ],
  };
  return (
    <div className="container">
      <div className="tituloCarousel">
        <h2>Oferta do dia</h2>
      </div>
      <div className="linhaHorizontal"/>
      <Slider {...settings}>
        {livros.map((livro) => (
          <div key={livro.id}>
            <Card livro={livro} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Oferta;
