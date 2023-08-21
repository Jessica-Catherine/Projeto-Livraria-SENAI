package br.senai.sp.livraria.model.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.sp.livraria.model.entity.DetalheLivro;

public interface DetalheLivroRepository extends JpaRepository<DetalheLivro, Long>{

}
