import { relations } from 'drizzle-orm';
import { boolean, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './auth.schema';

export const links = pgTable('links', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull(),
	description: text('description'),
	favorite: boolean('favorite').notNull().default(false),
	favicon: text('favicon'),
	coverImage: text('cover_image'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const linksRelations = relations(links, ({ many }) => ({
	linksToTags: many(linksToTags)
}));

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const tagsRelations = relations(tags, ({ many }) => ({
	tagsToLinks: many(linksToTags)
}));

export const linksToTags = pgTable(
	'link_to_tags',
	{
		linkId: serial('link_id')
			.notNull()
			.references(() => links.id, { onDelete: 'cascade' }),
		tagId: serial('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' })
	},
	(t) => [primaryKey({ columns: [t.linkId, t.tagId] })]
);

export const linksToTagsRelations = relations(linksToTags, ({ one }) => ({
	link: one(links, {
		fields: [linksToTags.linkId],
		references: [links.id]
	}),
	tag: one(tags, {
		fields: [linksToTags.tagId],
		references: [tags.id]
	})
}));

export const lists = pgTable('lists', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const listsRelations = relations(lists, ({ many }) => ({
	linksToLists: many(linksToLists)
}));

export const linksToLists = pgTable(
	'link_to_lists',
	{
		linkId: serial('link_id')
			.notNull()
			.references(() => links.id, { onDelete: 'cascade' }),
		listId: serial('list_id')
			.notNull()
			.references(() => lists.id, { onDelete: 'cascade' })
	},
	(t) => [primaryKey({ columns: [t.linkId, t.listId] })]
);

export const linksToListsRelations = relations(linksToLists, ({ one }) => ({
	link: one(links, {
		fields: [linksToLists.linkId],
		references: [links.id]
	}),
	list: one(lists, {
		fields: [linksToLists.listId],
		references: [lists.id]
	})
}));
