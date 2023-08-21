package br.senai.sp.livraria.dto;

import java.util.ArrayList;
import java.util.List;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.enums.TipoLivro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LivroOfertaDTO {

	private Long id;

	private String titulo;

	private String autor;

	private int anoPublicacao;

	private String sinopse;

	private String genero;

	private String editora;

	private int qtdePagina;

	private Boolean oferta;

	private Boolean destaque;

	private String imagem;

	private List<DetalheLivroDTO> detalhesDTO = new ArrayList<>();
}
