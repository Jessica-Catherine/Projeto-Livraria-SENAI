package br.senai.sp.livraria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.repository.DetalheLivroRepository;

@Service
public class DetalheLivroService {

    @Autowired
    private DetalheLivroRepository detalhelivroRepository;

    @Transactional
    public DetalheLivro salvar(DetalheLivro detalheLivroario) {
        return detalhelivroRepository.save(detalheLivroario);
    }

    @Transactional(readOnly = true)
    public List<DetalheLivro> listarTodos() {
        return detalhelivroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public DetalheLivro buscarPorId(Long id) {
        return detalhelivroRepository.findById(id).orElseThrow(() -> new RuntimeException("Detalhe do Livro não encontrado"));
    }

    @Transactional
    public void excluir(Long id) {
    	detalhelivroRepository.deleteById(id);
    }

}
