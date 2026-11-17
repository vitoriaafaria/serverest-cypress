describe('E2E - Frontend ServeRest', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('E2E 01 - Dado usuário novo, quando se cadastra e autentica, então acessa o sistema', () => {
    const usuario = {
      nome: 'Usuario E2E QA',
      email: `e2e_${Date.now()}@teste.com`,
      password: 'Teste@123'
    };

    cy.log('Dado que um usuário novo acessa a tela de cadastro');
    cy.contains('a', 'Cadastre-se').click();

    cy.log('Quando informa os dados e envia o cadastro');
    cy.get('input[placeholder="Digite seu nome"]').type(usuario.nome);
    cy.get('input[placeholder="Digite seu email"]').type(usuario.email);
    cy.get('input[placeholder="Digite sua senha"]').type(usuario.password);
    cy.contains('button', 'Cadastrar').click();

    cy.log('Então a interface confirma o cadastro');
    cy.contains(/cadastro realizado com sucesso/i).should('be.visible');
    cy.screenshot('01-cadastro-confirmado-na-interface');

    cy.log('E o backend autentica o mesmo usuário cadastrado');
    cy.request('POST', `${Cypress.expose('apiUrl')}/login`, {
      email: usuario.email,
      password: usuario.password
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;
    });

    cy.log('Quando o usuário entra pela interface com as mesmas credenciais');
    cy.visit('/');
    cy.get('input[placeholder="Digite seu email"]').type(usuario.email);
    cy.get('input[placeholder="Digite sua senha"]').type(usuario.password);
    cy.contains('button', 'Entrar').click();

    cy.log('Então o usuário fica autenticado e pode acessar o sistema');
    cy.contains('Logout').should('be.visible');
    cy.screenshot('02-login-confirmado-na-interface');
  });

  it('E2E 02 - Dado usuário cadastrado, quando informa senha incorreta, então o acesso é recusado', () => {
    cy.log('Dado: existe um usuário válido cadastrado na API');
    cy.criarUsuario().then((usuario) => {
      cy.log('Quando: tenta entrar na interface usando uma senha incorreta');
      cy.get('input[placeholder="Digite seu email"]').type(usuario.email);
      cy.get('input[placeholder="Digite sua senha"]').type('SenhaErrada123');

      cy.contains('button', 'Entrar').click();

      cy.log('Então: a interface informa que as credenciais são inválidas');
      cy.contains(/email e\/ou senha inválidos/i)
        .should('be.visible');
      cy.screenshot('02-login-com-senha-incorreta');
    });
  });

  it('E2E 03 - Dado visitante, quando envia cadastro válido, então a interface confirma sucesso', () => {
    const email = `cadastro_${Date.now()}@teste.com`;

    cy.log('Dado: visitante está na tela de login');
    cy.contains('a', 'Cadastre-se').click();

    cy.log('Quando: preenche e envia nome, e-mail e senha válidos');
    cy.get('input[placeholder="Digite seu nome"]').type('Novo Usuario QA');
    cy.get('input[placeholder="Digite seu email"]').type(email);
    cy.get('input[placeholder="Digite sua senha"]').type('Teste@123');

    cy.contains('button', 'Cadastrar').click();

    cy.log('Então: a interface confirma que o cadastro foi realizado');
    cy.contains(/cadastro realizado com sucesso/i)
      .should('be.visible');
    cy.screenshot('03-cadastro-com-sucesso');
  });

});
