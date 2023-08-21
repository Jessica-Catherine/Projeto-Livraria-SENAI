package br.senai.sp.livraria.service;

import java.util.List;
import br.com.caelum.stella.ValidationMessage;
import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.Endereco;
import br.senai.sp.livraria.model.entity.Usuario;
import br.senai.sp.livraria.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Transactional(readOnly = true)
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @Transactional
    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }
    
    private boolean validarCpf(String cpf) {
        CPFValidator cpfValidator = new CPFValidator();
        try {
            cpfValidator.assertValid(cpf);
            return true;
        } catch (InvalidStateException e) {
            List<ValidationMessage> errors = e.getInvalidMessages();
            // Lógica para lidar com os erros de validação (opcional)
            return false;
        }
    }
    
    @Transactional
    public Usuario salvarUsuarioComEndereco(Usuario usuario) {
    	
        String cpf = usuario.getCpf();
        if (!validarCpf(cpf)) {
            throw new IllegalArgumentException("CPF inválido");
        }
        // Verificar se já existe um usuário com o mesmo CPF
        Usuario usuarioExistenteCPF = usuarioRepository.findByCpf(usuario.getCpf());
        if (usuarioExistenteCPF != null) {
            throw new RuntimeException("Já existe um usuário com o mesmo CPF.");
        }

        // Verificar se já existe um usuário com o mesmo e-mail
        Usuario usuarioExistenteEmail = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioExistenteEmail != null) {
            throw new RuntimeException("Já existe um usuário com o mesmo e-mail.");
        }

        List<Endereco> enderecos = usuario.getEnderecos();
        if (enderecos != null) {
            for (Endereco endereco : enderecos) {
                endereco.setUsuario(usuario);
            }
        }
        return usuarioRepository.save(usuario);
    }

    
    @Transactional(readOnly = true)
    public Usuario fazerLogin(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;
        }
        return null;
    }


}
