import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import UsuarioLogin from "./UsuarioLogin";
import ButtonCestaCompra from "../buttons/ButtonCestaCompra";
import Search from "../layout/Search";
import { AuthContext } from "./AuthContext";
import React, { useContext, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import ButtonFavoritos from "../buttons/ButtonFavoritos";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setMenuOpen(!menuOpen);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainerGrid}>
      <div class={`${styles.navbarItemGrid} ${styles.center}`}>
          <Link to="/">
            <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
          </Link>
        </div>
        <div className={styles.navbarItemGrid}>
          <Search />
        </div>
        <div className={styles.navbarItemGrid}>
          <div className={`${styles.userMenuWrapper} ${styles.center}`}>
            <button onClick={handleMenuToggle} className={styles.userButton}>
              <UsuarioLogin />
            </button>
            {menuOpen && user && (
              <ul className={styles.menuUsuario}>
                <li className={styles.menuUsuarioLista}>
                  <Link to="/perfil-usuario">
                    <span>
                      <FaUser />
                    </span>
                    <span>Minha Conta</span>
                  </Link>
                </li>
                <li className={styles.menuUsuarioLista} onClick={handleLogout}>
                  <span>
                    <FaSignOutAlt />
                  </span>
                  <span>Sair</span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className={styles.navbarItemGrid}>
          <ButtonFavoritos  className={styles.buttonCestaCompra}/>
        </div>
        <div className={styles.navbarItemGrid}>
          <ButtonCestaCompra  className={styles.buttonCestaCompra}/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
