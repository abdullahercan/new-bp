import createServer from "./server";
const server = createServer();

server.listen(process.env.PORT || "3000", (err, address) => {
  if (err) throw err;
  console.log(`server listening on ${address}`);
});
