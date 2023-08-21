package br.senai.sp.livraria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.service.DetalheLivroService;



@RestController
@RequestMapping("/detalhelivro")
public class DetalheLivroController {

    @Autowired
    private DetalheLivroService detalheLivroService;

    @PostMapping
    public ResponseEntity<DetalheLivro> criar(@RequestBody DetalheLivro detalheLivro) {
        DetalheLivro uetalheLivroSalvo = detalheLivroService.salvar(detalheLivro);
        return ResponseEntity.status(HttpStatus.CREATED).body(uetalheLivroSalvo);
    }

    @GetMapping("")
    public ResponseEntity<List<DetalheLivro>> listarTodos() {
        List<DetalheLivro> detalheLivros = detalheLivroService.listarTodos();
        return ResponseEntity.ok(detalheLivros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalheLivro> buscarPorId(@PathVariable Long id) {
        DetalheLivro detalheLivro = detalheLivroService.buscarPorId(id);
        return ResponseEntity.ok(detalheLivro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalheLivro> atualizar(@PathVariable Long id, @RequestBody DetalheLivro detalheLivroAtualizado) {
        DetalheLivro detalheLivro = detalheLivroService.buscarPorId(id);
        detalheLivro.setLivro(detalheLivroAtualizado.getLivro());
        detalheLivro.setPreco(detalheLivroAtualizado.getPreco());
        detalheLivro.setQtdeEstoque(detalheLivroAtualizado.getQtdeEstoque());
        detalheLivro.setTipoLivro(detalheLivroAtualizado.getTipoLivro());
        DetalheLivro detalheLivroAtualizadoSalvo = detalheLivroService.salvar(detalheLivro);
        return ResponseEntity.ok(detalheLivroAtualizadoSalvo);
    }
    
    @PutMapping("/{id}/estoque")
    public ResponseEntity<String> atualizarQuantidadeEstoque(@PathVariable Long id, @RequestBody int quantidade) {
        DetalheLivro detalheLivro = detalheLivroService.buscarPorId(id);

        // Verifique se o detalheLivro existe
        if (detalheLivro == null) {
            return ResponseEntity.notFound().build();
        }

        // Verifique se há estoque suficiente
        if (detalheLivro.getQtdeEstoque() < quantidade) {
            return ResponseEntity.badRequest().body("Estoque insuficiente");
        }

        // Atualize a quantidade em estoque do detalheLivro
        detalheLivro.setQtdeEstoque(detalheLivro.getQtdeEstoque() - quantidade);
        detalheLivroService.salvar(detalheLivro);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        detalheLivroService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
