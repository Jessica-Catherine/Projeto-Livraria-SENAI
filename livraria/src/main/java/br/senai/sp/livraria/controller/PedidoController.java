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

import br.senai.sp.livraria.dto.PedidoDTO;
import br.senai.sp.livraria.dto.PedidoSelectDTO;
import br.senai.sp.livraria.model.entity.ItemPedido;
import br.senai.sp.livraria.model.entity.Pedido;
import br.senai.sp.livraria.service.PedidoService;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
	
    @Autowired
    private PedidoService pedidoService;

    @GetMapping("")
    public ResponseEntity<List<Pedido>> listarTodos() {
        List<Pedido> pedidos = pedidoService.listarTodos();
        return ResponseEntity.ok(pedidos);
    }
   
    @GetMapping("/dto")
    public ResponseEntity<List<PedidoSelectDTO>> listarTodosDTO() {
        List<PedidoSelectDTO> pedidosDTO = pedidoService.listarTodosDTO();
        return ResponseEntity.ok(pedidosDTO);
    }
    
    @GetMapping("/dto/{usuarioId}")
    public ResponseEntity<List<PedidoSelectDTO>> listarPedidosPorUsuario(@PathVariable Long usuarioId) {
        List<PedidoSelectDTO> pedidos = pedidoService.listarTodosPorUsuarioDTO(usuarioId);
        return ResponseEntity.ok(pedidos);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPorId(@PathVariable Long id) {
        Pedido pedido = pedidoService.buscarPorId(id);
        return ResponseEntity.ok(pedido);
    }
    
//    @PostMapping
//    public ResponseEntity<Pedido> criar(@RequestBody Pedido pedido) {
//        Pedido pedidoSalvo = pedidoService.salvar(pedido);
//        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoSalvo);
//    }
    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody PedidoDTO pedidoDTO) {
    	System.out.println("Cheguei");
        Pedido pedidoSalvo = pedidoService.salvar(pedidoDTO.getPedido());
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoSalvo);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Pedido> atualizar(@PathVariable Long id, @RequestBody Pedido pedidoAtualizado) {
        //Pedido pedido = pedidoService.buscarPorId(id);
//        pedido.setDataPedido(pedidoAtualizado.getDataPedido());
//        pedido.setUsuario(pedidoAtualizado.getUsuario());

//        Pedido PedidoAtualizadoSalvo = pedidoService.salvar(pedido);
        return ResponseEntity.ok(pedidoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        pedidoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
