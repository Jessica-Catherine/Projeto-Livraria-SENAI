package br.senai.sp.livraria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.ItemPedido;
import br.senai.sp.livraria.model.repository.ItemPedidoRepositoy;

@Service
public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepositoy itemPedidoRepositoy;

    @Transactional
    public ItemPedido salvar(ItemPedido pedido) {
        return itemPedidoRepositoy.save(pedido);
    }

    @Transactional(readOnly = true)
    public List<ItemPedido> listarTodos() {
        return itemPedidoRepositoy.findAll();
    }

    @Transactional(readOnly = true)
    public ItemPedido buscarPorId(Long id) {
        return itemPedidoRepositoy.findById(id).orElseThrow(() -> new RuntimeException("pedido não encontrado"));
    }

    @Transactional
    public void excluir(Long id) {
    	itemPedidoRepositoy.deleteById(id);
    }

}
