Feature: Cadastro e Login de usuário
  Como usuário do site Automation Exercise
  Quero realizar cadastro, login e logout
  Para validar os fluxos principais do sistema

  Scenario: Registrar novo usuário com sucesso
    Given que estou na página inicial da home
    When acesso a tela de login
    And preencho o formulário de cadastro com email único
    Then devo ver a mensagem de conta criada com sucesso
    And devo ver o usuário logado na página

  Scenario: Login com usuário válido
    Given que estou na página inicial da home
    When acesso a tela de login
    And faço login com email e senha válidos
    Then devo validar o usuario logado

  Scenario: Login com usuário inválido
    Given que estou na página inicial da home
    When acesso a tela de login
    And faço login com email e senha inválidos
    Then devo ver a mensagem de erro de login incorreto

  Scenario: Logout do usuário
    Given que estou na página inicial da home
    When acesso a tela de login
    And faço login com email e senha válidos
    And efetuo logout
    Then devo ser redirecionado para a página de login

  Scenario: Registrar usuário com email existente
    Given que estou na página inicial da home
    When acesso a tela de login
    And tento cadastrar com email já existente
    Then devo ver a mensagem de email já existente
