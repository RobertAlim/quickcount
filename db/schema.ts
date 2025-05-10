import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	username: text("username"),
	password: text("password"),
});

export const roles = pgTable("roles", {
	id: serial("id").primaryKey(),
	description: text("description").notNull(),
});

export const userRole = pgTable("user_role", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	roleId: integer("role_id")
		.notNull()
		.references(() => roles.id),
});

export const barangay = pgTable("barangay", {
	id: serial("id").primaryKey(),
	description: text("description").notNull(),
});

export const userAccess = pgTable("user_access", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	clusterId: integer("cluster_id").notNull(),
});

export const datasheet = pgTable("datasheet", {
	id: serial("id").primaryKey(),
	userId: integer("user_id"),
	barangay: text("barangay").notNull(),
	pollingPlace: text("polling_place").notNull(),
	cluster: integer("cluster").notNull(),
	totalVoters: integer("total_voters").notNull(),
	isCast: boolean("is_cast").default(false),
	gusTambunting: integer("gus_tambunting").default(0),
	brianYamsuan: integer("brian_yamsuan").default(0),
	rodelEspinola: integer("rodel_espinola").default(0),
	florentinoBaguio: integer("florentino_baguio").default(0),
	rolandoAguilar: integer("rolando_aguilar").default(0),
});

export const candidates = pgTable("candidates", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	shortName: text("short_name").notNull(),
	columnName: text("column_name").notNull(),
});

export const settings = pgTable("settings", {
	id: serial("id").primaryKey(),
	candidateLock: boolean("candidate_lock").default(false),
});

export type User = InferSelectModel<typeof users>;
export type Role = InferSelectModel<typeof roles>;
export type UserRole = InferSelectModel<typeof userRole>;
export type Barangay = InferSelectModel<typeof barangay>;
export type UserAccess = InferSelectModel<typeof userAccess>;
export type Datasheet = InferSelectModel<typeof datasheet>;
export type Candidate = InferSelectModel<typeof candidates>;
