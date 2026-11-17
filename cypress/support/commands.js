Cypress.Commands.add('criarUsuario', () => {
  const usuario = {
    nome: 'Usuario QA',
    email: `qa_${Date.now()}@teste.com`,
    password: 'Teste@123',
    administrador: 'false'
  };

  return cy.request({
    method: 'POST',
    url: `${Cypress.expose('apiUrl')}/usuarios`,
    body: usuario
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
    return usuario;
  });
});
