import * as http from "http"
import App from "./app";
import NoteRoutes from "./routes/note.routes";
import UserRoutes from "./routes/user.routes";

const routes = [new NoteRoutes(), new UserRoutes()];
const app = new App(routes).getServer();
const server = http.createServer(app);
const port = process.env.PORT || 8800;

server.listen(port, () => {
	console.log(`[+] API is running on port ${port}`);
})