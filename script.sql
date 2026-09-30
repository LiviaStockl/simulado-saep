CREATE TABLE evento (
  id_evento INT AUTO_INCREMENT PRIMARY KEY,
  nome_evento VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  local VARCHAR(150) NOT NULL,
  data DATE NOT NULL
);
 
CREATE TABLE palestrante (
   id_palestrante INT AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(150) NOT NULL,
   email VARCHAR(254) NOT NULL
);
 
CREATE TABLE evento_palestrante (
  id_evento INT NOT NULL,
  id_palestrante INT NOT NULL,
  PRIMARY KEY (id_evento, id_palestrante),
  FOREIGN KEY (id_evento) REFERENCES evento(id_evento),
  FOREIGN KEY (id_palestrante) REFERENCES palestrante(id_palestrante)
);
 
INSERT INTO evento
(nome_evento, descricao, local, data)
VALUES
    ('Evento de Tecnologia',
     'Palestras sobre tecnologia',
     'Auditorio da Escola',
     '2026-11-20');
 
INSERT INTO palestrante (nome, email)
VALUES
    ('Livia Abreu', 'livia@email.com'),
    ('Lavinia Bispo', 'lavib@email.com');
 
    INSERT INTO evento_palestrante
    (id_evento, id_palestrante)
VALUES
    (1, 1),
    (1, 2);
 
CREATE VIEW vw_eventos_palestrantes AS
SELECT
    e.id_evento,
    e.nome_evento,
    e.descricao,
    e.local,
    e.data,
    p.id_palestrante,
    p.nome AS nome_palestrante,
    p.email AS email_palestrante
FROM evento e
LEFT JOIN evento_palestrante ep
    ON e.id_evento = ep.id_evento
LEFT JOIN palestrante p
    ON ep.id_palestrante = p.id_palestrante;
 
 
SELECT * FROM vw_eventos_palestrantes;
 
 
SELECT p.id_palestrante, p.nome, p.email
FROM palestrante p
INNER JOIN evento_palestrante ep
    ON p.id_palestrante = ep.id_palestrante
WHERE ep.id_evento = 1;
 
 
SELECT * FROM evento;
 
 
SELECT * FROM palestrante;