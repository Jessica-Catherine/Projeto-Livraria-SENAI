USE livraria;


select * from livro;
select * from usuario;
select * from endereco;
select * from DETALHE_LIVRO;
select * from favorito;
select * from pedido;
select * from item_pedido;

SELECT e.*, u.*
FROM endereco e
JOIN usuario u ON e.id_usuario = u.id;

SELECT d.*, l.*
FROM detalhe_livro d
JOIN livro l ON d.id_livro = l.id;

SELECT f.*, l.*, u.*
FROM favorito f
JOIN livro l ON f.id_livro = l.id
JOIN usuario u ON f.id_usuario = u.id;

SELECT i.*, d.*, p.*
FROM item_pedido i
JOIN detalhe_livro d ON i.id_detalhe_livro = d.id
JOIN pedido p ON i.id_pedido = p.id;

SELECT i.*, d.*, p.*
FROM item_pedido i
JOIN detalhe_livro d ON i.id_detalhe_livro = d.id
JOIN pedido p ON i.id_pedido = p.id;
