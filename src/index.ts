import { serve } from '@hono/node-server'
import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from 'hono/request-id'
import { logger } from 'hono/logger'
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import api from "./api.js";

export type Variables = {
  db: NodePgDatabase
}

const app = new OpenAPIHono<{ Variables: Variables }>()
  .use(requestId())
  .use(logger())
  .use(async (c, next) => {
    const db = drizzle('postgres://myuser:mypassword@localhost:5432/');
    c.set('db', db)
    await next()
  })
  .route('/todo', api)

serve({
  fetch: app.fetch,
  port: 3003
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app
export type AppType = typeof app