package br.senai.sp.livraria.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.sp.livraria.model.entity.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {
	
	List<Livro> findById(String id);

	List<Livro> findByGenero(String genero);

	List<Livro> findByEditora(String editora);

	List<Livro> findByAnoPublicacao(String anoPublicacao);

	List<Livro> findByAutor(String autor);

	List<Livro> findByOferta(Boolean oferta);

	List<Livro> findByDestaque(Boolean destaque);

	List<Livro> findByQtdePagina(String qtdePagina);

}
