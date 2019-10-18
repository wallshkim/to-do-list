CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (150) NOT NULL,
	"completed" BOOL DEFAULT FALSE
)

INSERT INTO "tasks" ("task") VALUES('Groceries');
INSERT INTO "tasks" ("task") VALUES('Dentist Appt');
INSERT INTO "tasks" ("task") VALUES('Clean house');
INSERT INTO "tasks" ("task") VALUES('Walk dog');

SELECT * FROM "tasks"