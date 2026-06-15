describe('Testes de API', () => {
  
    const apiUrl = 'https://api.trello.com/1/actions/592f11060f95a3d3d46a987a';

  it('Quando realizer um GET para api do Trello deve ser retornado 200', () => {
    cy.request(apiUrl).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('list');
      expect(response.body.data.list).to.have.property('name');
      cy.log(`list.name: ${response.body.data.list.name}`);
    });
  });
});
