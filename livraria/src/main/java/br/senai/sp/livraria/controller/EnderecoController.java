package br.senai.sp.livraria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.livraria.model.entity.Endereco;
import br.senai.sp.livraria.service.EnderecoService;


@RestController
@RequestMapping("/endereco")
public class EnderecoController {
	
    @Autowired
    private EnderecoService enderecoService;

    @PostMapping
    public ResponseEntity<Endereco> criar(@RequestBody Endereco endereco) {
        Endereco enderecoSalvo = enderecoService.salvar(endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(enderecoSalvo);
    }

    @GetMapping("")
    public ResponseEntity<List<Endereco>> listarTodos() {
        List<Endereco> enderecos = enderecoService.listarTodos();
        return ResponseEntity.ok(enderecos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> buscarPorId(@PathVariable Long id) {
        Endereco endereco = enderecoService.buscarPorId(id);
        return ResponseEntity.ok(endereco);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> atualizar(@PathVariable Long id, @RequestBody Endereco enderecoAtualizado) {
        Endereco endereco = enderecoService.buscarPorId(id);
        endereco.setUf(enderecoAtualizado.getUf());
        endereco.setCidade(enderecoAtualizado.getCidade());
        endereco.setBairro(enderecoAtualizado.getBairro());
        endereco.setLogradouro(enderecoAtualizado.getLogradouro());
        endereco.setNumero(enderecoAtualizado.getNumero());
        endereco.setComplemento(enderecoAtualizado.getComplemento());
        endereco.setCep(enderecoAtualizado.getCep());
//        endereco.setUsuario(enderecoAtualizado.getUsuario());
        Endereco enderecoAtualizadoSalvo = enderecoService.salvar(endereco);
        return ResponseEntity.ok(enderecoAtualizadoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        enderecoService.excluir(id);
        return ResponseEntity.noContent().build();
    }

}
