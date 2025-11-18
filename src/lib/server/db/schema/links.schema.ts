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

export const tagsRelations = relations(tags, ({ many, one }) => ({
	tagsToLinks: many(linksToTags),
	owner: one(user, {
		fields: [tags.userId],
		references: [user.id]
	})
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
	linksToLists: many(linksToLists),
	listShares: many(listShares)
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

export const listShares = pgTable(
	'list_shares',
	{
		listId: serial('list_id')
			.notNull()
			.references(() => lists.id, { onDelete: 'cascade' }),
		sharedWithUserId: text('shared_with_user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		canEdit: boolean('can_edit').notNull().default(false),
		createdAt: timestamp('createdAt').notNull().defaultNow()
	},
	(t) => [primaryKey({ columns: [t.listId, t.sharedWithUserId] })]
);

export const listSharesRelations = relations(listShares, ({ one }) => ({
	list: one(lists, {
		fields: [listShares.listId],
		references: [lists.id]
	}),
	sharedWithUser: one(user, {
		fields: [listShares.sharedWithUserId],
		references: [user.id]
	})
}));
