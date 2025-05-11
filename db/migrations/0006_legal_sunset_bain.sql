CREATE TABLE "coordinator" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"polling_place" text NOT NULL
);
