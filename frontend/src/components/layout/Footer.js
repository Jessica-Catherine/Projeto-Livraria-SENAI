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
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.column}>
          <img
            className={styles.footerLogoImg}
            src="/img/logo.png"
            alt="logo"
          />
        </div>
        <div className={styles.column}>
          <div className={styles.containerSocialList}>
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
            </ul></div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <Link to="/Contact">
            <p className={styles.footerFaleConosco}>Fale Conosco</p>
          </Link>
        </div>
        <div className={styles.column}>
          <div className={styles.pagamentoListDiv}>
            <ul className={styles.pagamentoList}>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/ed8d6fd0-f3bd-11eb-9984-b7076edb0bb7-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/ddf23a60-f3bd-11eb-a186-1134488bf456-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/48b25b30-6265-11ec-813c-8542a9aff8ea-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/200454b0-13c2-11eb-a75e-3f6b552aa946-m.svg" alt="" />
              </li>
              <li className={styles.pagamentoListLi}>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/00174300-571e-11e8-8364-bff51f08d440-m.svg" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.rowCopy}>
        <div className={styles.columnCopy}>
          <p className={styles.footerCopyP}>
            <span>Universo dos Livros &copy; {currentYear}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
