class InvalidArgumentError extends Error {
  constructor (mensagem) {
    super(mensagem)
    this.name = 'InvalidArgumentError'
  }
}

class InternalServerError extends Error {
  constructor (mensagem) {
    super(mensagem)
    this.name = 'InternalServerError'
  }
}

class NaoEncontrado extends Error {

  constructor() {

    const mensagem = `Não Foi possível encontrar ${entidade}`
    super(mensagem)
    this.name = 'NaoEncontrado'

  }

}

class NaoAutorizado extends Error {

  constructor() {

    const mensagem = 'Não foi possível encontrar esse recurso'
    super(mensagem)
    this.name = 'NaoAutorizado'

  }

}

module.exports = { InvalidArgumentError, InternalServerError, NaoEncontrado, NaoAutorizado }
