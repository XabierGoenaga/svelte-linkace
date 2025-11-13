import { relations } from 'drizzle-orm';
import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull(),
	description: text('description'),
	favorite: boolean('favorite').notNull().default(false),
	coverImage: text('cover_image'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const linkToTags = pgTable('link_tags', {
	linkId: serial('link_id')
		.notNull()
		.references(() => links.id, { onDelete: 'cascade' }),
	tagId: serial('tag_id')
		.notNull()
		.references(() => tags.id, { onDelete: 'cascade' }),
	createdAt: timestamp('createdAt').notNull().defaultNow()
});

export const usersToGroupsRelations = relations(linkToTags, ({ one }) => ({
	links: one(links, {
		fields: [linkToTags.linkId],
		references: [links.id]
	}),
	tags: one(tags, {
		fields: [linkToTags.tagId],
		references: [tags.id]
	})
}));
