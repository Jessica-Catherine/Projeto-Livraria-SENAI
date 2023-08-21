package br.senai.sp.livraria.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.entity.Usuario;
import br.senai.sp.livraria.model.enums.TipoLivro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties("detalhes")
public class DetalheLivroDTO {

	private Long id;

	private TipoLivro tipoLivro;

	private float preco;

	private Float precoDesc;
	
	private int qtdeEstoque;
	
	private Long livroId;

	private Livro livro;


}