package br.senai.sp.livraria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.Endereco;
import br.senai.sp.livraria.model.repository.EnderecoRepository;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Transactional
    public Endereco salvar(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    @Transactional(readOnly = true)
    public List<Endereco> listarTodos() {
        return enderecoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Endereco buscarPorId(Long id) {
        return enderecoRepository.findById(id).orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
    }

    @Transactional
    public void excluir(Long id) {
        enderecoRepository.deleteById(id);
    }
}
