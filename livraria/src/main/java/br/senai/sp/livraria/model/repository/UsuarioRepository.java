package br.senai.sp.livraria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.sp.livraria.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Usuario findByEmail(String email);

	Usuario findByCpf(String cpf);


}
