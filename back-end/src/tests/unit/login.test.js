const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { User } = require('../../database/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as models', function () {
    describe('Quando o usuário não está cadastrado', function () {
      beforeEach(function () { return sinon.stub(User, 'findOne').resolves(null); });
      afterEach(function () { return sinon.restore(); });
      it('deve retornar um status 404', async function () {
        const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'string',
          password: 'string',
        });
        expect(chaiHttpResponse.status).to.equal(400);
      });
    });
    describe('Quando o usuário está cadastrado', function () {
      const user = {
        email: 'string@gmail.com',
        password: 'string',
        id: 1,
        name: 'stringstring',
        role: 'string',
      };
      beforeEach(function () {
        return sinon.stub(User, 'findOne').resolves(user);
      });
      afterEach(function () {
        return sinon.restore();
      });
      it('deve retornar um status 200', async function () {
        const chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'string@gmail.com',
          password: 'string',
        });
        // console.log(chaiHttpResponse);
        expect(chaiHttpResponse.status).to.equal(200);
      });
    });
  });