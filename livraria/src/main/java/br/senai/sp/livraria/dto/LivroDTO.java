package br.senai.sp.livraria.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class LivroDTO {

    private Long id;
    private String titulo;
    private String autor;
    private int anoPublicacao;
    private String sinopse;
    private String genero;
    private String editora;
    private int qtdePagina;
    private boolean oferta;
    private boolean destaque;
    private String imagem;

    // Outras propriedades e métodos da classe

    @JsonIgnore
    private List<DetalheLivroDTO> detalhes;

}
