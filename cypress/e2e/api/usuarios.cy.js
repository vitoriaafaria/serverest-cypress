describe('API - ServeRest', () => {

  const api = Cypress.expose('apiUrl');

  it('API 01 - Deve listar produtos com sucesso', () => {
    cy.log('Dado: a API ServeRest está disponível');
    cy.log('Quando: solicita a lista de produtos');
    cy.request('GET', `${api}/produtos`).then((response) => {
      cy.log('Então: a API retorna HTTP 200 e uma lista válida');
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.be.a('number');
      expect(response.body.produtos).to.be.an('array');
      expect(response.body.quantidade).to.eq(response.body.produtos.length);
    });
  });

  it('API 02 - Deve cadastrar usuario com sucesso', () => {
    const usuario = {
      nome: 'Usuario API QA',
      email: `api_${Date.now()}@teste.com`,
      password: 'Teste@123',
      administrador: 'false'
    };

    cy.log('Dado: dados válidos e um e-mail único');
    cy.log('Quando: envia a solicitação de cadastro de usuário');
    cy.request('POST', `${api}/usuarios`, usuario)
      .then((response) => {
        cy.log('Então: a API confirma a criação e retorna o identificador');
        expect(response.status).to.eq(201);
        expect(response.body.message)
          .to.eq('Cadastro realizado com sucesso');
        expect(response.body._id).to.be.a('string').and.not.be.empty;
      });
  });

  it('API 03 - Deve rejeitar login com credenciais invalidas', () => {
    cy.log('Dado: e-mail inexistente e senha incorreta');
    cy.log('Quando: envia credenciais inválidas para autenticação');
    cy.request({
      method: 'POST',
      url: `${api}/login`,
      failOnStatusCode: false,
      body: {
        email: 'inexistente@teste.com',
        password: 'SenhaErrada123'
      }
    }).then((response) => {
      cy.log('Então: a API rejeita a autenticação com HTTP 401');
      expect(response.status).to.eq(401);
      expect(response.body.message)
        .to.eq('Email e/ou senha inválidos');
    });
  });

});
