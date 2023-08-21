import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../layout/Search.module.css";
import {FaSearch} from 'react-icons/fa';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const queryParams = {
      titulo: searchTerm,
      editora: searchTerm,
      autor: searchTerm,
      anoDePublicacao: searchTerm,
      genero: searchTerm,
    };
    const queryString = Object.keys(queryParams)
      .filter((key) => queryParams[key])
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");
    try {
      const response = await fetch(
        `http://localhost:8082/livro?${queryString}`
      );
      const data = await response.json();
      const filteredResults = data.filter((livro) => {
        return Object.keys(queryParams).some((key) => {
          return (
            livro[key] &&
            livro[key].toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      });
      setSearchResults(filteredResults);
      navigate(`/resultados-pesquisa?term=${searchTerm}`, {
        state: { results: filteredResults, term: searchTerm },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class={styles.searchFormContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          className={styles.searchFormInput}
          type="text"
          placeholder="O que você quer ler?"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className={styles.searchFormButton} type="submit">
        <FaSearch/>
        </button>
      </form>
    </div>
  );
}

export default Search;
