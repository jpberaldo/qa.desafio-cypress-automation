Feature: Produtos e compra
  Como usuário do site
  Quero ver produtos, pesquisar e finalizar pedido
  Para validar os fluxos principais de e-commerce

  Scenario: Verificar todos os produtos e página de detalhe
    Given que estou na página inicial da homepage
    When acesso a página de produtos
    Then devo ver a lista de produtos
    And devo ver a página de detalhe do produto selecionado

  Scenario: Pesquisar produto
    Given que estou na página inicial da homepage
    When acesso a página de produtos
    And busco por um produto existente
    Then devo ver os resultados de busca

  Scenario: Finalizar pedido após cadastro
    Given que estou na página inicial da homepage
    When faço cadastro de novo usuário
    And navego para a página de produtos
    And adiciono um produto ao carrinho
    And vou para checkout
    And adiciono informações de pagamento
    Then devo ver a confirmação do pedido
