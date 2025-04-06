import { createSchemaFactory } from 'drizzle-zod';
import { z } from '@hono/zod-openapi';

import { todoTable } from './table.js';

const { createInsertSchema, createSelectSchema, createUpdateSchema } = createSchemaFactory({ zodInstance: z });

////////////////////////////////////////////////////////////////
// Create
export const createTodoReqBodySchema = createInsertSchema(todoTable, {
  todo: (schema) => schema.max(255, "'todo' must be 255 characters or less").openapi({ example: 'todo' }),
}).omit({
  id: true,
  done: true,
  createdAt: true,
  updatedAt: true,
}).required();

export const createTodoResBodySchema = createInsertSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
  todo: (schema) => schema.openapi({ example: 'todo' }),
  done: (schema) => schema.openapi({ example: false }),
  createdAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
  updatedAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
});

////////////////////////////////////////////////////////////////
// Read
export const readTodoReqPathParamSchema = createSelectSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
}).omit({
  todo: true,
  done: true,
  createdAt: true,
  updatedAt: true,
}).required();

export const readTodoResBodySchema = createSelectSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
  todo: (schema) => schema.openapi({ example: 'todo' }),
  done: (schema) => schema.openapi({ example: false }),
  createdAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
  updatedAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
});

export const readTodoListResBodySchema = createSelectSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
  todo: (schema) => schema.openapi({ example: 'todo' }),
  done: (schema) => schema.openapi({ example: false }),
  createdAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
  updatedAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
}).array();

////////////////////////////////////////////////////////////////
// Update
export const updateTodoReqPathParamSchema = createUpdateSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
}).omit({
  todo: true,
  done: true,
  createdAt: true,
  updatedAt: true,
}).required();

export const updateTodoReqBodySchema = createUpdateSchema(todoTable, {
  todo: (schema) => schema.openapi({ example: 'todo' }),
  done: (schema) => schema.openapi({ example: false }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTodoResBodySchema = createUpdateSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
  todo: (schema) => schema.openapi({ example: 'todo' }),
  done: (schema) => schema.openapi({ example: false }),
  createdAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
  updatedAt: (schema) => schema.openapi({ example: '2023-10-01T00:00:00.000Z' }),
});

////////////////////////////////////////////////////////////////
// Delete
export const deleteTodoReqPathParamSchema = createSelectSchema(todoTable, {
  id: (schema) => schema.openapi({ example: 'a415d538-88d5-4db4-8da2-628826a15b9f' }),
}).omit({
  todo: true,
  done: true,
  createdAt: true,
  updatedAt: true,
}).required();

////////////////////////////////////////////////////////////////
// Error
export const errorResBodySchema = z.object({
  id: z.string().openapi({
    example: 'a415d538-88d5-4db4-8da2-628826a15b9f',
  }),
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: "Bad Request",
  }),
});