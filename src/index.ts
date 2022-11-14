import * as http from "http"
import App from "./app";

const app = new App();
const server = http.createServer(app.getServer());

server.listen(3000, () => {
  console.log("Server listening on port 3000");
})