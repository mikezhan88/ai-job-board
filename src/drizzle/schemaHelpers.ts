import {timestamp, uuid} from 'drizzle-orm/pg-core';

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp({withTimezone: true}).defaultNow().notNull();
export const updatedAt = timestamp({withTimezone: true}).defaultNow().notNull().$onUpdate(() => new Date());