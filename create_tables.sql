CREATE TYPE skill as ENUM ('yoga', 'calisthenics', 'pilates', 'HIIT', 'strength', 'other');
CREATE TYPE sex as ENUM ('male', 'female', 'other');

CREATE TABLE personal_trainer (
    name VARCHAR(40) NOT NULL,
    surname VARCHAR(40) NOT NULL,
    dni VARCHAR(9) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    CONSTRAINT personal_trainer_pk PRIMARY KEY (dni)
);

CREATE TABLE training_skill (
    dni VARCHAR(9) NOT NULL,
    skill SKILL NOT NULL,
    CONSTRAINT training_skills_pk PRIMARY KEY (dni, skill),
    CONSTRAINT training_skills_fk FOREIGN KEY (dni) REFERENCES personal_trainer (dni)
);

CREATE TABLE client (
    name VARCHAR(40) NOT NULL,
    surname VARCHAR(40) NOT NULL,
    dni VARCHAR(9) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    sex SEX NOT NULL,
    age INTEGER NOT NULL,
    CONSTRAINT client_pk PRIMARY KEY (dni)
);

CREATE TABLE chat (
    dni_trainer VARCHAR(9) NOT NULL,
    dni_client VARCHAR(9) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    text TEXT NOT NULL,
    CONSTRAINT chat_pk PRIMARY KEY (dni_trainer, dni_client, date_time),
    CONSTRAINT chat_fk_trainer FOREIGN KEY (dni_trainer) REFERENCES personal_trainer (dni),
    CONSTRAINT chat_fk_client FOREIGN KEY (dni_client) REFERENCES client (dni)
);

CREATE TABLE contract (
    id SERIAL,
    dni_trainer VARCHAR(9) NOT NULL,
    dni_client VARCHAR(9) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price INTEGER NOT NULL,
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT contract_pk PRIMARY KEY (id),
    CONSTRAINT contract_fk_trainer FOREIGN KEY (dni_trainer) REFERENCES personal_trainer (dni),
    CONSTRAINT contract_fk_client FOREIGN KEY (dni_client) REFERENCES client (dni)
);

CREATE TABLE training_session (
    id SERIAL,
    date_time TIMESTAMP NOT NULL,
    dni VARCHAR(9) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    CONSTRAINT training_session_pk PRIMARY KEY (id),
    CONSTRAINT training_session_fk_trainer FOREIGN KEY (dni) REFERENCES personal_trainer (dni)
);

CREATE TABLE training_session_client (
    id INTEGER NOT NULL,
    dni VARCHAR(9) NOT NULL,
    CONSTRAINT training_session_client_pk PRIMARY KEY (id, dni),
    CONSTRAINT training_session_client_fk_client FOREIGN KEY (dni) REFERENCES client (dni),
    CONSTRAINT training_session_client_fk_session FOREIGN KEY (id) REFERENCES training_session (id)
);


