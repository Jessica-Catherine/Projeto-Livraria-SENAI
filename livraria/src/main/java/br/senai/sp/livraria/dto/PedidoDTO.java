package br.senai.sp.livraria.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import br.senai.sp.livraria.model.entity.ItemPedido;
import br.senai.sp.livraria.model.entity.Pedido;
import br.senai.sp.livraria.model.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {

	private Long id;

	private LocalDate dataPedido = LocalDate.now();
	
	private BigDecimal valorTotal;

	private Long usuario_id;

	private List<ItemPedidoDTO> itensDTO;

	public Pedido getPedido() {
		Pedido p = new Pedido();
		p.setId(this.id);
		p.setDataPedido(this.dataPedido);
		p.setValorTotal(this.valorTotal);
		Usuario u = new Usuario();
		u.setId(this.usuario_id);
		p.setUsuario(u);

		List<ItemPedido> lista = new ArrayList<>();
		for (ItemPedidoDTO itemPedidoDTO : itensDTO) {
			lista.add(itemPedidoDTO.getItemPedido());
		}
		p.setItens(lista);

		return p;
	}

}
