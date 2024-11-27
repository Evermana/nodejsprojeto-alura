import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Establish database connection
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Function to retrieve all posts from the database
export async function getTodosPosts() {
    
    // Connect to the database
    const db = conexao.db("imersao-instabytes");
    // Select the 'posts' collection
    const colecao = db.collection("posts");
    // Find all documents in the collection and return them as an array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}