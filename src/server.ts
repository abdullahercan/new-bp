import fastify, { FastifyInstance } from "fastify";
import fastifyEnv from "fastify-env";
import fastifyTypeormPlugin from "fastify-typeorm-plugin";
import routes from "./routes";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    APP_ENV: {
      type: "string",
      default: "dev",
    },
  },
};

const options = {
  confKey: "config",
  schema: schema,
  dotenv: {
    path: `${process.cwd()}/.env`,
    debug: true,
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
    };
  }
}

export default () => {
  // create fastify server instance
  const app: FastifyInstance = fastify();

  // register fastify env
  app.register(fastifyEnv, options);

  // register routes
  app.register(routes);

  // register fastify orm
  app.register(fastifyTypeormPlugin, {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/modules/**/*.entity.ts"],
  });

  return app;
};
