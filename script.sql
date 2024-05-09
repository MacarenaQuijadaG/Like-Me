CREATE DATABASE likeme;

\c likeme;

CREATE TABLE posts (
    id SERIAL,
    titulo VARCHAR(150),
    img VARCHAR(250),
    descripcion VARCHAR(250),
    likes INT
);