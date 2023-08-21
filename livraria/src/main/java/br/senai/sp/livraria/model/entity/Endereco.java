package br.senai.sp.livraria.model.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table( name = "endereco")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String uf;
	
	private String cidade;	
	
	private String logradouro;	
	
	private String bairro;	
	
	private String numero;
	
	private String complemento;
		
	private String cep;
	
	@JsonBackReference
    @ManyToOne
    private Usuario usuario;
	
}
