import mongoose from "mongoose"

const schemaUser = new mongoose.Schema({
    email: String,
    password: String,
    userType: String,
    nome: String,
    cpf: String,
    cep: String,
    end: String,
    tel: String,
    uc: String
})

var userModel = mongoose.model("userCollection", schemaUser);

export {userModel}