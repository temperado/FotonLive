import { userModel } from "../src/database/schema/users.js"
import mongoose from 'mongoose'

//Salvar novo usuário
function save(request) {
    const { email, password, userType, nome, cpf, cep, end, tel, uc } = request.body
    console.log(email, password, userType, nome, cpf, cep, end, tel, uc)
    const userCollection = new userModel({ email: email, password: password, userType: userType, nome: nome, cpf: cpf, cep: cep, end: end, tel: tel, uc: uc })

    const savedUser = userCollection.save((err, doc) => {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
    });
}

//Fazer login
async function verify(request) {
    const { email, password } = request.body

    const user = await userModel.findOne({ email: email }, "password userType")
    const responseDTO = {
        status:"",
        userType:""
    }

    if(user == null){
        responseDTO.status = "user_not_registered"
        responseDTO.userType = user.userType
        return responseDTO
    }else if (user.password == password) {
        responseDTO.status = "correct_password"
        responseDTO.userType = user.userType
        return responseDTO 
    }else{
        responseDTO.status = "incorrect_password"
        responseDTO.userType = user.userType
        return responseDTO
    }
}

export { save, verify }