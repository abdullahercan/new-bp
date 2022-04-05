import { FastifyInstance } from "fastify";

import userController from "./modules/user/user.controller";

const routes = (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get("/", userController.index);

  done();
};

export default routes;
