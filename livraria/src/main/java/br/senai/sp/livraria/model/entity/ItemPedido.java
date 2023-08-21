package br.senai.sp.livraria.model.entity;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonSerialize
@Entity
@Table( name = "item_pedido")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedido {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private BigDecimal valorUnid;
	
	private BigDecimal valorTotalItem;
	
    private int qtdeItens;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "pedido_id")
	private Pedido pedido;
    
    @ManyToOne
	@JoinColumn(name = "id_detalhe_livro")
	private DetalheLivro detalheLivro;

}
