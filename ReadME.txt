-- Cria o banco de dados
CREATE DATABASE virtualshop;

-- Seleciona o banco de dados
USE virtualshop;

-- Cria a tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Cria a tabela de produtos, associando cada produto a um usuário (user_id)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    value DECIMAL(10,2) NOT NULL,
    available BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MeuSenha@2022';
