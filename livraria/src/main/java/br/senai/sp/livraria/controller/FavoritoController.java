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

import br.senai.sp.livraria.model.entity.Favorito;
import br.senai.sp.livraria.service.FavoritoService;


@RestController
@RequestMapping("/favorito")
public class FavoritoController {
	
    @Autowired
    private FavoritoService favoritoService;

    @PostMapping
    public ResponseEntity<Favorito> criar(@RequestBody Favorito favorito) {
    	Favorito favoritoSalvo = favoritoService.salvar(favorito);
        return ResponseEntity.status(HttpStatus.CREATED).body(favoritoSalvo);
    }

    @GetMapping("")
    public ResponseEntity<List<Favorito>> listarTodos() {
        List<Favorito> favoritos = favoritoService.listarTodos();
        return ResponseEntity.ok(favoritos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Favorito> buscarPorId(@PathVariable Long id) {
    	Favorito favorito = favoritoService.buscarPorId(id);
        return ResponseEntity.ok(favorito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Favorito> atualizar(@PathVariable Long id, @RequestBody Favorito favoritoAtualizado) {
    	Favorito favorito = favoritoService.buscarPorId(id);
//    	favorito.setLivro(favoritoAtualizado.getLivro());
//    	favorito.setUsuario(favoritoAtualizado.getUsuario());
    	Favorito favoritoAtualizadoSalvo = favoritoService.salvar(favorito);
        return ResponseEntity.ok(favoritoAtualizadoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
    	favoritoService.excluir(id);
        return ResponseEntity.noContent().build();
    }

}
