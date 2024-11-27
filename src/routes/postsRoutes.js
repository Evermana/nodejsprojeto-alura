import express from "express";
import multer from "multer";
import { listarposts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postscontroller.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


// Configure Multer for file uploads (adjust destination as needed)
const upload = multer({ dest: "./uploads" }); // Adjust path if necessary

const routes = (app) => {
    // **Middleware: Parse incoming JSON data**
    // - This allows Express to handle requests with JSON bodies,
    //   which is often the case for API calls.
    app.use(express.json());
    app.use(cors(corsOptions))

    // **Route:** Get all posts
    // - This route handler (listarposts) fetches all posts from the database
    //   and sends them back as a JSON response.
    app.get("/posts", listarposts);

    // **Route:** Create a new post
    // - This route handler (postarNovoPost) likely takes data from the request body
    //   (e.g., title, content) to create a new post in the database.
    app.post("/posts", postarNovoPost);

    // **Route:** Upload an image
    // - This route uses Multer middleware to handle image uploads.
    //   - `upload.single("imagem")`: Configures Multer to handle a single file
    //     named "imagem" in the request body.
    //   - `uploadImagem`: This route handler (uploadImagem) likely processes the
    //     uploaded image and potentially associates it with a post (implementation
    //     details depend on your specific logic).
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;