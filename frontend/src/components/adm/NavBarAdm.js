import styles from "../layout/NavBar.module.css";
import { Link } from "react-router-dom";
import SearchAdm from "../adm/SearchAdm";

function NavbarAdm() {
  return (
    <nav className={styles.navbar}>
    <div className={styles.navbarContainerGridAdm}>
      <div className={styles.navbarItemGrid}>
        <Link to="/adm">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
      </div>
      <div className={styles.navbarItemGrid}>
        <SearchAdm />
      </div>
      </div>
    </nav>
  );
}

export default NavbarAdm;
