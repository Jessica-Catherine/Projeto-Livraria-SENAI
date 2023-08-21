package br.senai.sp.livraria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.service.LivroService;

@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @PostMapping
    public ResponseEntity<Livro> criar(@RequestBody Livro livro) {
        Livro livroSalvo = livroService.salvar(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(livroSalvo);
    }

    @GetMapping("")
    public ResponseEntity<List<Livro>> listarTodos() {
        List<Livro> livros = livroService.listarTodos();
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        Livro livro = livroService.buscarPorId(id);
        return ResponseEntity.ok(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Long id, @RequestBody Livro livroAtualizado) {
        Livro livro = livroService.buscarPorId(id);
        livro.setTitulo(livroAtualizado.getTitulo());
        livro.setAutor(livroAtualizado.getAutor());
        livro.setAnoPublicacao(livroAtualizado.getAnoPublicacao());
        livro.setSinopse(livroAtualizado.getSinopse());
        livro.setGenero(livroAtualizado.getGenero());
        livro.setEditora(livroAtualizado.getEditora());
        livro.setQtdePagina(livroAtualizado.getQtdePagina());
        livro.setOferta(livroAtualizado.getOferta());
        livro.setDestaque(livroAtualizado.getDestaque());
        livro.setImagem(livroAtualizado.getImagem());
        Livro livroAtualizadoSalvo = livroService.salvar(livro);
        return ResponseEntity.ok(livroAtualizadoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        livroService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
