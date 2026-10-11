
USE bloodconnect;

CREATE TABLE doadores (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    tipo_sanguineo VARCHAR(3) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    apto_doar BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE hemocentros (
    id_hemocentro INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE estoques (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    id_hemocentro INT NOT NULL,
    tipo_sanguineo VARCHAR(3) NOT NULL,
    quantidade_bolsas INT NOT NULL DEFAULT 0,

    FOREIGN KEY (id_hemocentro)
        REFERENCES hemocentros(id_hemocentro)
);

CREATE TABLE hospitais (
    id_hospital INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE solicitacoes (
    id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
    id_hospital INT NOT NULL,
    tipo_sanguineo VARCHAR(3) NOT NULL,
    quantidade_bolsas INT NOT NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'Pendente',

    FOREIGN KEY (id_hospital)
        REFERENCES hospitais(id_hospital)
);
