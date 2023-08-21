import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/layout/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./pages/styles/toastify-theme.css"; 

import Home from './pages/pagesUser/Home';
import ResultadosPesquisa from "./pages/pagesUser/ResultadosPesquisa";
import ResultadosPesquisaAdm from "./pages/pagesAdm/ResultadosPesquisaAdm";
import LoginCadastrar from "./pages/pagesUser/LoginCadastrar";
import Contact from "./pages/pagesUser/Contact"
import InformacaoLivro from "./pages/pagesUser/InformacaoLivro";
import InformacaoLivroAdm from "./pages/pagesAdm/InformacaoLivroAdm";
import Adm from "./pages/pagesAdm/Adm";
import LoginEntrar from "./pages/pagesUser/LoginEntrar";
import PerfilUsuario from "./pages/pagesUser/PerfilUsuario";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <ToastContainer autoClose={2000}/>      
        <AuthProvider>
          <Routes>
            <Route element={<Home />} path="/" exact></Route>
            <Route element={<Adm/>} path="/adm" />
            <Route element={<LoginCadastrar />} path="/login-cadastrar" />
            <Route element={<LoginEntrar/>} path="/login-entrar" />
            <Route element={<ResultadosPesquisa />} path="/resultados-pesquisa"></Route>
            <Route element={<ResultadosPesquisaAdm />} path="/resultados-pesquisa-adm"></Route>
            <Route element={<Contact />} path="/contact" />
            <Route element={<InformacaoLivroAdm />} path="/informacao-livro-adm/:id" />
            <Route element={<InformacaoLivro />} path="/informacao-livro/:id" />
            <Route element={<PerfilUsuario />} path="/perfil-usuario" />
          </Routes>        
        </AuthProvider>

      </BrowserRouter>  

    </div>
  );
}

export default App;
