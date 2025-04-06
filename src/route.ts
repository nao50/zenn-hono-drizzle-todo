import { createRoute } from '@hono/zod-openapi'
import { 
  createTodoReqBodySchema,
  createTodoResBodySchema,
  readTodoReqPathParamSchema,
  readTodoResBodySchema,
  readTodoListResBodySchema,
  updateTodoReqPathParamSchema,
  updateTodoReqBodySchema,
  updateTodoResBodySchema,
  deleteTodoReqPathParamSchema,
  errorResBodySchema
} from './schema.js';

////////////////////////////////////////////////////////////////
// Create
export const createTodoRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTodoReqBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: createTodoResBodySchema,
        },
      },
    },
    400: {
      content: {
        "application/json": {
          schema: errorResBodySchema,
        },
      },
      description: "Bad Request",
    },
    409: {
      content: {
        "application/json": {
          schema: errorResBodySchema,
        },
      },
      description: "Conflict",
    }
  },
});


////////////////////////////////////////////////////////////////
// Read
export const readTodoRoute = createRoute({
  method: 'get',
  path: "/{id}",
  request: {
    params: readTodoReqPathParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: readTodoResBodySchema,
        },
      },
      description: 'Retrieve the user',
    },
    404: {
      content: {
        "application/json": {
          schema: errorResBodySchema,
        },
      },
      description: "Not Found",
    },
  },
});

export const readTodoListRoute = createRoute({
  method: 'get',
  path: "/",
  responses: {
    200: {
      content: {
        'application/json': {
          schema: readTodoListResBodySchema,
        },
      },
      description: 'Retrieve the user',
    }
  },
});

////////////////////////////////////////////////////////////////
// Update
export const updateTodoRoute = createRoute({
  method: "put",
  path: "/{id}",
  request: {
    params: updateTodoReqPathParamSchema,
    body: {
      content: {
        'application/json': {
          schema: updateTodoReqBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: updateTodoResBodySchema,
        },
      },
      description: 'Retrieve the user',
    },
    400: {
      content: {
        "application/json": {
          schema: errorResBodySchema,
        },
      },
      description: "Bad Request",
    },
    404: {
      content: {
        "application/json": {
          schema: errorResBodySchema,
        },
      },
      description: "Not Found",
    },
  },
});

////////////////////////////////////////////////////////////////
// Delete
export const deleteTodoRoute = createRoute({
  method: "delete",
  path: "/{id}",
  request: {
    params: deleteTodoReqPathParamSchema,
  },
  responses: {
    204: { 
      description: 'Successfully deleted'
    },
    404: {
      content: {
        "application/json": {
          schema: errorResBodySchema,
        },
      },
      description: "Not Found",
    },
  }
});