INSERT INTO client VALUES ('admin', 'admin', '11111111A', '$2b$10$Q0QivpcPDqzZiBQzRSdyeeDEec9ent9W4hiQbynJo1Jut3NhaGmG.', 'admin@gmail.com', 'string', 170, 60, 'Otro', 23);
INSERT INTO client VALUES ('Marcos', 'Magni', '11111111B', '$2b$10$p0QkEH0elW7YwuF4/pg7aObwedWCX5jQck4dRWf9y5BAVYxUtYXGu', 'marcos@gmail.com', 'string', 170, 60, 'Mujer', 23);
INSERT INTO client VALUES ('Guinot', 'fiera', '11111111C', '$2b$10$QAPRooaGz165lFr3gTBWQeGplwbfUGCrDOjqo4a3jQNh7k0Lmr5li', 'guinot@gmail.com', 'string', 170, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Sergi', 'Velló', '11111111D', '$2b$10$V45lOlqVnxMV.sO/avwel.QivKeJIuJOBhxIi1eEh9111UUDW91hS', 'sergi@gmail.com', 'string', 170, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Alex', 'papa', '11111111E', '$2b$10$oj/wMLhuWKjsSMuVBB1ue.RQvB52i6EiTyXMrslF/0fSKuWUpNCRu', 'alex@gmail.com', 'string', 170, 60, 'Hombre', 23);
INSERT INTO client VALUES ('Daniel', 'pepe', '11111111F', '$2b$10$G2bKvKS2xB9Q38fI/eHh0evmBaME8yEMreShRyG1UV4yFqWuRA3Ea', 'daniel@gmail.com', 'string', 170, 60, 'Hombre', 23);

INSERT INTO personal_trainer VALUES ('admin', 'admin', '11111111A', '$2b$10$Q0QivpcPDqzZiBQzRSdyeeDEec9ent9W4hiQbynJo1Jut3NhaGmG.', 'admin@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Marcos', 'Magni', '11111111B', '$2b$10$p0QkEH0elW7YwuF4/pg7aObwedWCX5jQck4dRWf9y5BAVYxUtYXGu', 'marcos@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Guinot', 'fiera', '11111111C', '$2b$10$QAPRooaGz165lFr3gTBWQeGplwbfUGCrDOjqo4a3jQNh7k0Lmr5li', 'guinot@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Sergi', 'Velló', '11111111D', '$2b$10$V45lOlqVnxMV.sO/avwel.QivKeJIuJOBhxIi1eEh9111UUDW91hS', 'sergi@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Alex', 'papa', '11111111E', '$2b$10$oj/wMLhuWKjsSMuVBB1ue.RQvB52i6EiTyXMrslF/0fSKuWUpNCRu', 'alex@gmail.com', 'string');
INSERT INTO personal_trainer VALUES ('Daniel', 'pepe', '11111111F', '$2b$10$G2bKvKS2xB9Q38fI/eHh0evmBaME8yEMreShRyG1UV4yFqWuRA3Ea', 'daniel@gmail.com', 'string');

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

INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:00:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111C', '2022-05-08 18:00:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111D', '2022-05-08 18:00:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111E', '2022-05-08 18:00:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111F', '2022-05-08 18:00:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 19:00:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:05:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:10:00', 'string', '11111111A');
INSERT INTO chat VALUES ('11111111A', '11111111B', '2022-05-08 18:20:00', 'string', '11111111A');

INSERT INTO contract (title, dni_trainer, dni_client, description, start_date, end_date, price) VALUES ('Reto 30 días de cardio', '11111111A', '11111111B', 'string', '2022-05-08 18:00:00', '2022-06-08 18:00:00', 10);
INSERT INTO contract (title, dni_trainer, dni_client, description, start_date, end_date, price) VALUES ('Aumentar 10 kilos de musculo', '11111111A', '11111111C', 'string', '2022-05-08 18:00:00', '2022-06-08 18:00:00', 0);
INSERT INTO contract (title, dni_trainer, dni_client, description, start_date, end_date, price) VALUES ('Mantenimiento', '11111111B', '11111111C', 'string', '2022-05-08 18:00:00', '2022-06-08 18:00:00', 10);

INSERT INTO training_session (title, date_time, dni, description, price) VALUES ('Clase de aerobic', '2022-05-08 18:20:00', '11111111A', 'string', 0);
INSERT INTO training_session (title, date_time, dni, description, price) VALUES ('Clase de fuerza', '2022-05-18 18:20:00', '11111111A', 'string', 10);
INSERT INTO training_session (title, date_time, dni, description, price) VALUES ('Clase de estiramientos', '2022-05-08 18:20:00', '11111111B', 'string', 10);
INSERT INTO training_session (title, date_time, dni, description, price) VALUES ('Clase de zumba principiantes', '2022-05-08 18:20:00', '11111111C', 'string', 10);

INSERT INTO training_session_client VALUES (1, '11111111A');
INSERT INTO training_session_client VALUES (2, '11111111A');
INSERT INTO training_session_client VALUES (3, '11111111A');
INSERT INTO training_session_client VALUES (3, '11111111C');
INSERT INTO training_session_client VALUES (2, '11111111B');

INSERT INTO notifications (dni, date_time, text) VALUES ('11111111B', now(), 'Nuevo contrato creado con admin admin');
INSERT INTO notifications (dni, date_time, text) VALUES ('11111111C', now(), 'Nuevo contrato creado con admin admin');
INSERT INTO notifications (dni, date_time, text) VALUES ('11111111C', now(), 'Nuevo contrato creado con Marcos Magni');
