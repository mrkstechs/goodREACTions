DROP TABLE IF EXISTS highscores;

CREATE TABLE highscores (
    id serial PRIMARY KEY,
    name VARCHAR(127) NOT NULL,
    score INT NOT NULL
);