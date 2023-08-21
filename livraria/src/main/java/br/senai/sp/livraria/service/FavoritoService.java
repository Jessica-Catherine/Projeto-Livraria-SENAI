package br.senai.sp.livraria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.Favorito;
import br.senai.sp.livraria.model.repository.FavoritoRepository;


@Service
public class FavoritoService {
	
    @Autowired
    private FavoritoRepository favoritoRepository;

    @Transactional
    public Favorito salvar(Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    @Transactional(readOnly = true)
    public List<Favorito> listarTodos() {
        return favoritoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Favorito buscarPorId(Long id) {
        return favoritoRepository.findById(id).orElseThrow(() -> new RuntimeException("Favorito não encontrado"));
    }

    @Transactional
    public void excluir(Long id) {
    	favoritoRepository.deleteById(id);
    }

}
