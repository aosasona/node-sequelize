import * as http from "http"
import App from "./app";
import Database from "./database/database";
import NoteRoutes from "./routes/note.routes";

const db =  new Database()
const app = new App([new NoteRoutes()], db);
const server = http.createServer(app.getServer());
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
})

function handleExit(signal: string) {
    console.log(`Received ${signal}, shutting down, please wait...`);
    db.closeConnection().then(() => {
        console.log("Database connection closed");
        process.exit(0);
    });
}

process.on("uncaughtException", handleExit);
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
process.on("SIGUSR2", handleExit);