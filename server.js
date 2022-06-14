require('dotenv').config()

const app = require('./app')
const port = 3000
require('./database')
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')
const { InvalidArgumentError, NaoEncontrado, NaoAutorizado } = require('./src/erros')
const {ConversorErro} = require('./src/conversores.js')

app.use((requisicao, resposta, proximo) => {

    resposta.set({

        'Content-type' : 'application/json'

    })

    proximo();

})

const routes = require('./rotas')
const res = require('express/lib/response')
routes(app)

app.use((erro, requisicao, resposta, proximo) => {

    const conversor = new ConversorErro('json')
    resposta.send(conversor.converter(corpo))

    let status = 500;
    const corpo = {

        mensagem: erro.message

    }

    if(erro instanceof NaoEncontrado){

        status = 404;

    }

    if(erro instanceof NaoAutorizado){

        status = 401;

    }

    if(erro instanceof InvalidArgumentError){

        status = 400;

    }

    if(erro instanceof jwt.JsonWebTokenError) {

        status = 401

    }

    if(erro instanceof jwt.TokenExpiredError) {

        status = 401
        corpo.expiradoEm = erro.expiredAt

    }

    resposta.status(status);
    resposta.json(corpo);

})

app.listen(port, () => console.log('A API está funcionando!'))
