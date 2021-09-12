import express, { request, response } from 'express'
const app = express()
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
import handlebars from "express-handlebars"
import {save, verify }  from "./services/userService.js"
import mongoose from 'mongoose'

//config
//template engine
app.engine('handlebars', handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Public folder
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '/public/')));

//DB
const conectar = async () => {
    await mongoose.connect('mongodb+srv://temperado:FYjMqzNpzjOo7Vty@cluster0.ty6sm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}


const main = async () => {

    await conectar()

    app.use(express.urlencoded({ extended: true }))

    //Página home
    app.get('/', (request, response) => {
        return response.render('inicio')
    })

    //Página de login
    app.get('/login', (request, response) => {
        return response.render('login')
    })

    app.post('/login', (request, response) => {
        verify(request).then((resp)=>{
            
        if (resp.status == "correct_password") {
            console.log('Senha correta')
            if (resp.userType == "Comprador") {
                return response.redirect('/comprador')
            }else{
                return response.redirect('/vendedor')
            }
        }else if(resp.status == "incorrect_password"){
            console.log("Senha incorreta")
            return response.redirect('/')
        }else if(resp.status == "user_not_registered"){
            console.log('Não registrado')
            return response.redirect("/cadastro")
         }
        }) 

    })

    //Página vendedor
    app.get('/vendedor', (request, response) => {
        return response.render('conta_vendedor')
    })

    //Página comprador
    app.get('/comprador', (request, response) => {
        return response.render('conta_comprador')
    })

    //Página de anuncio
    app.get('/anuncio', (request, response) => {
        return response.render('anuncio')
    })

    //Página de compra
    app.get('/comprar', (request, response) => {
        // chamada p banco de dados
        let painels = [
            {
                img: "tal",
                price: 250,
                qnt: 3,
                seller: "Heitor"
            },
            {
                img: "me",
                price: 220,
                qnt: 5,
                seller: "Lucas"
            },
            {
                img: "tal",
                price: 50,
                qnt: 1,
                seller: "Terabidia"
            },
        ]

        return response.render('comprar', {painels})
    })

    //Página de dados bancários
    app.get('/dados', (request, response) => {
        return response.render('dados')
    })

    //Página de pagamento
    app.get('/pagamento', (request, response) => {
        return response.render('pagamento')
    })

    //Páginas de agradecimento
    app.get('/agradecimento_anuncio', (request, response) => {
        return response.render('agradecimento_anuncio')
    })

    app.get('/agradecimento_compra', (request, response) => {
        return response.render('agradecimento_compra')
    })

    //Página de cadastro
    app.get('/cadastro', (request, response) => {
        return response.render('cadastro')
    })

    app.post('/cadastro', (request, response) => {
        save(request)
        return response.redirect("/login")
    })

    app.listen(5050, () => {
        console.log('server running at http://localhost:5050')
    })

    // app.listen(process.env.PORT || 5000)
}

main()