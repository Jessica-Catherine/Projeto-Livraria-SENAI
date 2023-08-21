package br.senai.sp.livraria.dto;

import java.math.BigDecimal;
import java.util.List;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.ItemPedido;
import br.senai.sp.livraria.model.entity.Livro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedidoSelectDTO {

	private Long id;

	private BigDecimal valorUnid;

	private BigDecimal valorTotal;

	private int qtdeItens;
	
	private DetalheLivroDTO detalheLivroDTO;
	
	private Livro livro;

}
