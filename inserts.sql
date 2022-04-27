INSERT INTO personal_trainer VALUES ('admin', 'admin', '11111111A', 'admin', 'admin@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Marcos', 'Magni', '11111111B', 'marcos', 'marcos@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Guinot', 'fiera', '11111111C', 'guinot', 'guinot@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Sergi', 'Velló', '11111111D', 'sergi', 'sergi@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Alex', 'papa', '11111111E', 'alex', 'alex@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Daniel', 'pepe', '11111111F', 'daniel', 'daniel@gmail.com', 'string');

INSERT INTO client VALUES ('admin', 'admin', '11111111A', 'admin', 'admin@gmail.com', 'string', 1.70, 60, 'Otro', 23);
INSERT INTO client VALUES ('Marcos', 'Magni', '11111111B', 'marcos', 'marcos@gmail.com', 'string', 1.70, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Guinot', 'fiera', '11111111C', 'guinot', 'guinot@gmail.com', 'string', 1.70, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Sergi', 'Velló', '11111111D', 'sergi', 'sergi@gmail.com', 'string', 1.70, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Alex', 'papa', '11111111E', 'alex', 'alex@gmail.com', 'string', 1.70, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Daniel', 'pepe', '11111111F', 'daniel', 'daniel@gmail.com', 'string', 1.70, 60, 'Hombre', 23);

INSERT INTO training_skill VALUES ('11111111A', 'Yoga');
INSERT INTO training_skill VALUES ('11111111A', 'HIIT');
INSERT INTO training_skill VALUES ('11111111A', 'Calistenia');
INSERT INTO training_skill VALUES ('11111111A', 'Pilates');
INSERT INTO training_skill VALUES ('11111111B', 'Calistenia');
INSERT INTO training_skill VALUES ('11111111B', 'Fuerza');
INSERT INTO training_skill VALUES ('11111111C', 'Yoga');
INSERT INTO training_skill VALUES ('11111111C', 'Calistenia');
INSERT INTO training_skill VALUES ('11111111D', 'Fuerza');
INSERT INTO training_skill VALUES ('11111111D', 'Yoga');
INSERT INTO training_skill VALUES ('11111111E', 'Fuerza');
INSERT INTO training_skill VALUES ('11111111E', 'Yoga');

INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:00:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111C', '2022-05-08 18:00:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111D', '2022-05-08 18:00:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111E', '2022-05-08 18:00:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111F', '2022-05-08 18:00:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 19:00:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:05:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:10:00', 'string');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:20:00', 'string');

INSERT INTO contract (dni_trainer, dni_client, description, start_date, end_date, price) VALUES ('11111111A', '11111111B', 'string', '2022-05-08 18:00:00', '2022-06-08 18:00:00', 10);
INSERT INTO contract (dni_trainer, dni_client, description, start_date, end_date, price) VALUES ('11111111A', '11111111C', 'string', '2022-05-08 18:00:00', '2022-06-08 18:00:00', 0);
INSERT INTO contract (dni_trainer, dni_client, description, start_date, end_date, price) VALUES ('11111111B', '11111111C', 'string', '2022-05-08 18:00:00', '2022-06-08 18:00:00', 10);

INSERT INTO training_session (date_time, dni, description, price) VALUES ('2022-05-08 18:20:00', '11111111A', 'string', 0);
INSERT INTO training_session (date_time, dni, description, price) VALUES ('2022-05-18 18:20:00', '11111111A', 'string', 10);
INSERT INTO training_session (date_time, dni, description, price) VALUES ('2022-05-08 18:20:00', '11111111B', 'string', 10);
INSERT INTO training_session (date_time, dni, description, price) VALUES ('2022-05-08 18:20:00', '11111111C', 'string', 10);

INSERT INTO training_session_client VALUES (1, '11111111A');
INSERT INTO training_session_client VALUES (2, '11111111A');
INSERT INTO training_session_client VALUES (3, '11111111A');
INSERT INTO training_session_client VALUES (3, '11111111C');
INSERT INTO training_session_client VALUES (2, '11111111B');

