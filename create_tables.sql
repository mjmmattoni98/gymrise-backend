CREATE TYPE skill as ENUM ('Yoga', 'Calistenia', 'Pilates', 'HIIT', 'Fuerza', 'Otro');
CREATE TYPE sex as ENUM ('Hombre', 'Mujer', 'Otro');

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
    CONSTRAINT training_skills_fk FOREIGN KEY (dni) REFERENCES personal_trainer (dni) ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT client_pk PRIMARY KEY (dni),
    CONSTRAINT client_height_ch CHECK (height > 0),
    CONSTRAINT client_weight_ch CHECK (weight > 0)
);

CREATE TABLE chat (
    dni_trainer VARCHAR(9) NOT NULL,
    dni_client VARCHAR(9) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    text TEXT NOT NULL,
    CONSTRAINT chat_pk PRIMARY KEY (dni_trainer, dni_client, date_time),
    CONSTRAINT chat_fk_trainer FOREIGN KEY (dni_trainer) REFERENCES personal_trainer (dni) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chat_fk_client FOREIGN KEY (dni_client) REFERENCES client (dni) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE contract (
    id SERIAL,
    title VARCHAR(40) NOT NULL, 
    dni_trainer VARCHAR(9) NOT NULL,
    dni_client VARCHAR(9) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price INTEGER NOT NULL,
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT contract_pk PRIMARY KEY (id),
    CONSTRAINT contract_fk_trainer FOREIGN KEY (dni_trainer) REFERENCES personal_trainer (dni) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT contract_fk_client FOREIGN KEY (dni_client) REFERENCES client (dni) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT contract_price_ch CHECK (price >= 0)
);

CREATE TABLE training_session (
    id SERIAL,
    title VARCHAR(40) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    dni VARCHAR(9) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    CONSTRAINT training_session_pk PRIMARY KEY (id),
    CONSTRAINT training_session_fk_trainer FOREIGN KEY (dni) REFERENCES personal_trainer (dni) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT training_session_price_ch CHECK (price >= 0)
);

CREATE TABLE training_session_client (
    id INTEGER NOT NULL,
    dni VARCHAR(9) NOT NULL,
    CONSTRAINT training_session_client_pk PRIMARY KEY (id, dni),
    CONSTRAINT training_session_client_fk_client FOREIGN KEY (dni) REFERENCES client (dni) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT training_session_client_fk_session FOREIGN KEY (id) REFERENCES training_session (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notifications (
    id SERIAL,
    dni VARCHAR(9) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    text TEXT NOT NULL,
    CONSTRAINT notifications_pk PRIMARY KEY (id),
    CONSTRAINT notifications_fk_client FOREIGN KEY (dni) REFERENCES client (dni) ON DELETE CASCADE ON UPDATE CASCADE
);
