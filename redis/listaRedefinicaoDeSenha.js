const redis = require('redis');
const conexao = redis.createClient( { prefix: 'redefinição-de-senha' } )
const manipulaLista = require('./manipula-lista')

module.exports = manipulaLista(conexao);