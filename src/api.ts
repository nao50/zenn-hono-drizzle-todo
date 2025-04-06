import { OpenAPIHono } from "@hono/zod-openapi";
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { createTodoRoute, readTodoRoute, readTodoListRoute, updateTodoRoute, deleteTodoRoute  } from "./route.js";
import { todoTable } from './table.js';
import pg from "pg";
import { eq } from "drizzle-orm";

type Variables = {
  db: NodePgDatabase
}

const app = new OpenAPIHono<{ Variables: Variables }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({
        id: c.get('requestId'),
        code: 400,
        message: result.error.errors.map(error => error.message).join(', '),
      }, 400);
    }
  },
}).openapi(createTodoRoute, async (c) => {
  const data = c.req.valid('json')
  const db = c.get('db')
  try {
    const result = await db.insert(todoTable).values({...data, done: false}).returning();
    return c.json(result[0], 200);
  } catch (error) {
    if (error instanceof pg.DatabaseError) {
      if(error.constraint === "table_todo_unique") {
        return c.json({id: c.get('requestId'), code: 409, message: "Todo already exists"}, 409);
      }
    }
    return c.json({id: c.get('requestId'), code: 400, message: error}, 400)
  }
}).openapi(readTodoRoute, async (c) => {
  const { id } = c.req.valid('param')
  const db = c.get('db')
  const result = await db.select().from(todoTable).where(eq(todoTable.id, id));
  if (result.length === 0) {
    return c.json({id: c.get('requestId'), code: 404, message: 'Not Found'}, 404)
  }
  return c.json(result[0], 200);
}).openapi(readTodoListRoute, async (c) => {
  const db = c.get('db')
  const result = await db.select().from(todoTable);
  return c.json(result, 200);
}).openapi(updateTodoRoute, async (c) => {
  const { id } = c.req.valid('param')
  const data = c.req.valid('json')
  const db = c.get('db')
  const result = await db.update(todoTable).set(data).where(eq(todoTable.id, id)).returning();
  if (result.length === 0) {
    return c.json({id: c.get('requestId'), code: 404, message: 'Not Found'}, 404)
  }
  return c.json(result[0], 200);
}).openapi(deleteTodoRoute, async (c) => {
  const { id } = c.req.valid('param')
  const db = c.get('db')
  const result = await db.delete(todoTable).where(eq(todoTable.id, id)).returning();
  if (result.length === 0) {
    return c.json({id: c.get('requestId'), code: 404, message: 'Not Found'}, 404)
  }
  return c.text('Successfully deleted')
});

export default app