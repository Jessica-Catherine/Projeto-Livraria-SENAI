package br.senai.sp.livraria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.sp.livraria.model.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{


}
