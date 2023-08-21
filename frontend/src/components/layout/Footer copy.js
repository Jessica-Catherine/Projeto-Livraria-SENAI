import { Link } from "react-router-dom";
import styles from "../layout/Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={styles.containerFooter}>
        <div className={styles.footerLogo}>
          <img
            className={styles.footerLogoImg}
            src="/img/logo.png"
            alt="logo"
          />
        </div>
        <div className={styles.footerContatos}>
          <div className={styles.socialListFooter}>
            <ul className={styles.socialList}>
              <li className={styles.socialListLi}>
                <FaFacebook />
              </li>
              <li className={styles.socialListLi}>
                <FaInstagram />
              </li>
              <li className={styles.socialListLi}>
                <FaLinkedin />
              </li>
              <li className={styles.socialListLi}>
                <FaWhatsapp />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerDiversos}>
          <div className={styles.footerFaleConoscoDiv}>
            <Link to="/Contact">
              <h1 className={styles.footerFaleConosco}>Fale Conosco</h1>
            </Link>
            </div>
        </div>
        <div className={styles.footerPagamento}>
          {" "}
          <div className={styles.footerPagamento}>
          

            <div className={styles.pagamentoListDiv}>
              <ul className={styles.pagamentoList}>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/ed8d6fd0-f3bd-11eb-9984-b7076edb0bb7-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/ddf23a60-f3bd-11eb-a186-1134488bf456-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/48b25b30-6265-11ec-813c-8542a9aff8ea-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/200454b0-13c2-11eb-a75e-3f6b552aa946-m.svg" />
                </li>
                <li>
                  <img src="https://http2.mlstatic.com/storage/logos-api-admin/00174300-571e-11e8-8364-bff51f08d440-m.svg" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerCopyRight}>
        <p className={styles.footerCopyP}>
           <span>Universo dos Livros &copy; {currentYear}</span>
        </p>
      </div>
    </>
  );
}

export default Footer;
