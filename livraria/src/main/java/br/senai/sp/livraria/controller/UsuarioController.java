package br.senai.sp.livraria.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.senai.sp.livraria.model.entity.Endereco;
import br.senai.sp.livraria.model.entity.Usuario;
import br.senai.sp.livraria.service.UsuarioService;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
//
//    @PostMapping
//    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
//        Usuario usuarioSalvo = usuarioService.salvar(usuario);
//        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
//    }
//    
    
    @PostMapping("/login")
    public ResponseEntity<Usuario> fazerLogin(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");
        
        Usuario usuario = usuarioService.fazerLogin(email, senha);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        Usuario usuarioSalvo = usuarioService.salvarUsuarioComEndereco(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }


    @GetMapping("")
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(usuario);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
//        Usuario usuario = usuarioService.buscarPorId(id);
//        usuario.setNome(usuarioAtualizado.getNome());
//        usuario.setCpf(usuarioAtualizado.getCpf());
//        usuario.setEmail(usuarioAtualizado.getEmail());
//        usuario.setSenha(usuarioAtualizado.getSenha());
//        usuario.setDataCadastro(usuarioAtualizado.getDataCadastro());
//        Usuario usuarioAtualizadoSalvo = usuarioService.salvar(usuario);
//        return ResponseEntity.ok(usuarioAtualizadoSalvo);
//    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuario = usuarioService.buscarPorId(id);
        if (usuario != null) {
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setCpf(usuarioAtualizado.getCpf());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setSenha(usuarioAtualizado.getSenha());
            usuario.setDataCadastro(usuarioAtualizado.getDataCadastro());
            
            // Atualize o endereço do usuário
            List<Endereco> enderecosAtualizados = usuarioAtualizado.getEnderecos();
            if (enderecosAtualizados != null) {
                // Defina o usuário atualizado para cada endereço
                for (Endereco endereco : enderecosAtualizados) {
                    endereco.setUsuario(usuario);
                }
                // Atualize a lista de endereços do usuário
                usuario.setEnderecos(enderecosAtualizados);
            }
            
            // Salve o usuário atualizado
            Usuario usuarioAtualizadoSalvo = usuarioService.salvar(usuario);
            
            return ResponseEntity.ok(usuarioAtualizadoSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        usuarioService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
