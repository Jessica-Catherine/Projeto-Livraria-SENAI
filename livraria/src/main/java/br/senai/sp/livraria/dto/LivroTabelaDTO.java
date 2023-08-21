package br.senai.sp.livraria.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.entity.Pedido;
import br.senai.sp.livraria.model.entity.Usuario;
import br.senai.sp.livraria.model.enums.TipoLivro;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LivroTabelaDTO {

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

	private float preco;

	private TipoLivro tipoLivro;

	private int qtdeEstoque;

	public LivroTabelaDTO(DetalheLivro detalhe) {
		this.id = detalhe.getLivro().getId();
		this.titulo = detalhe.getLivro().getTitulo();
		this.autor = detalhe.getLivro().getAutor();
		this.anoPublicacao = detalhe.getLivro().getAnoPublicacao();
		this.sinopse = detalhe.getLivro().getSinopse();
		this.genero = detalhe.getLivro().getGenero();
		this.editora = detalhe.getLivro().getEditora();
		this.qtdePagina = detalhe.getLivro().getQtdePagina();
		this.oferta = detalhe.getLivro().getOferta();
		this.destaque = detalhe.getLivro().getDestaque();
		this.imagem = detalhe.getLivro().getImagem();
		this.preco = detalhe.getPreco();
		this.tipoLivro = detalhe.getTipoLivro();
		this.qtdeEstoque = detalhe.getQtdeEstoque();
	}

}
