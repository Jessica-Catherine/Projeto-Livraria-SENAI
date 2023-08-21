package br.senai.sp.livraria.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.dto.DetalheLivroDTO;
import br.senai.sp.livraria.dto.LivroOfertaDTO;
import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.repository.LivroRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;


@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Transactional
    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    @Transactional(readOnly = true)
    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Livro buscarPorId(Long id) {
    	
        return livroRepository.findById(id).orElse(null); 
    }
    
    @Transactional
    public Livro editar(Livro livro) {
        return livroRepository.save(livro);
    }

    @Transactional
    public void excluir(Long id) {
        livroRepository.deleteById(id);
    }
    
    @Transactional()
    public List<LivroOfertaDTO> buscarTambemOferta() {
    	
    	List<Livro> listaOfertas = livroRepository.findAll();
    	
    	List<LivroOfertaDTO> listaLivroOfertaDTO = new ArrayList<>();
    	LivroOfertaDTO livroOfertaDTO;
    	DetalheLivroDTO detalheLivroDTO; 
    	for (Livro livro : listaOfertas) {
    		livroOfertaDTO = new LivroOfertaDTO();
    		livroOfertaDTO.setId(livro.getId());
    		livroOfertaDTO.setAutor(livro.getAutor());
    		livroOfertaDTO.setTitulo(livro.getTitulo());
    		livroOfertaDTO.setEditora(livro.getEditora());
    		livroOfertaDTO.setGenero(livro.getGenero());
    		livroOfertaDTO.setDestaque(livro.getDestaque());
    		livroOfertaDTO.setAnoPublicacao(livro.getAnoPublicacao());
    		livroOfertaDTO.setImagem(livro.getImagem());
    		livroOfertaDTO.setSinopse(livro.getSinopse());
    		livroOfertaDTO.setQtdePagina(livro.getQtdePagina());
    		livroOfertaDTO.setOferta(livro.getOferta());
   		
    		
    		for (DetalheLivro detLivro : livro.getDetalhes()) {
    			detalheLivroDTO = new DetalheLivroDTO();
    			detalheLivroDTO.setId(detLivro.getId());
    			detalheLivroDTO.setPreco(detLivro.getPreco());
    			detalheLivroDTO.setQtdeEstoque(detLivro.getQtdeEstoque());
    			detalheLivroDTO.setTipoLivro(detLivro.getTipoLivro());
    			detalheLivroDTO.setLivroId(livro.getId());
    	
    			if (livro.getOferta()) {
        			float precoComDesconto = (detLivro.getPreco() * 0.9F);
        			detalheLivroDTO.setPrecoDesc(precoComDesconto);    				
    			}else {
    				detalheLivroDTO.setPrecoDesc(null);
    			}
				
				livroOfertaDTO.getDetalhesDTO().add(detalheLivroDTO);
			}
			
    		listaLivroOfertaDTO.add(livroOfertaDTO);
		}
    	
        return listaLivroOfertaDTO;
    }
    
    @PersistenceContext
    private EntityManager entityManager;

    public Livro findLivroById(String id) {
        Long livroId = Long.parseLong(id); // conversão de String para Long
        TypedQuery<Object[]> query = entityManager.createQuery("SELECT l, d FROM Livro l JOIN l.detalhes d WHERE l.id = :livroId GROUP BY l.id", Object[].class);
        query.setParameter("livroId", livroId);
        Object[] result = query.getSingleResult();
        Livro livro = (Livro) result[0];
        List<DetalheLivro> detalhes = Arrays.asList((DetalheLivro[]) result[1]);
        livro.setDetalhes(detalhes);
        return livro;
    }

}
