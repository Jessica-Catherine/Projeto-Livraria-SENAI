package br.senai.sp.livraria.model.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonSerialize
@Entity
@Table(name = "livro")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Livro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String titulo;

	private String autor;

	private int anoPublicacao;

	@Lob
	@Column(name = "sinopse", columnDefinition = "LONGTEXT")
	private String sinopse;

	private String genero;

	private String editora;

	private int qtdePagina;

	private Boolean oferta;

	private Boolean destaque;

	private String imagem;

	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "livro_id")
	private List<DetalheLivro> detalhes;


}
