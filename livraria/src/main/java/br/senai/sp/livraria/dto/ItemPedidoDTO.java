package br.senai.sp.livraria.dto;

import java.math.BigDecimal;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.ItemPedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedidoDTO {

	private Long id;

	private BigDecimal valorUnid;

	private BigDecimal valorTotalItem;

	private int qtdeItens;
	
	private Long detalhe_livro_id;

	public ItemPedido getItemPedido() {
		ItemPedido ip = new ItemPedido();
		ip.setId(id);
		ip.setValorTotalItem(this.valorTotalItem);
		ip.setValorUnid(this.valorUnid);
		ip.setQtdeItens(this.qtdeItens);
		DetalheLivro dt = new DetalheLivro(); dt.setId(detalhe_livro_id);
		ip.setDetalheLivro(dt);      
		return ip;
	}

}
