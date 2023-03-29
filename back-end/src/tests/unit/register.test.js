const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const { User } = require('../../database/models');

chai.use(chaiHttp);

const { expect } = chai;
const userEmail = 'string@gmail.com';

describe('Testando as models', function () {
  describe('Quando tento registrar um usuário que já existe', function () {
    const user = {
      email: userEmail,
      password: 'string',
      id: 1,
      name: 'stringstring',
      role: 'string',
    };
    beforeEach(function () {
      const callBack = sinon.stub(User, 'findOne');
      callBack.onCall(0).resolves(user);
      callBack.onCall(1).resolves(user);
      sinon.stub(User, 'create').resolves(user);
    });
    afterEach(function () {
      sinon.restore();
    });
    it('Tem que retornar o status 409', async function () {
      const chaiHttpResponse = await chai.request(app).post('/register').send({
        name: 'stringstring',
        email: userEmail,
        password: 'string',
      });
      expect(chaiHttpResponse.status).to.equal(409);
    });
  });
  describe('Testando as models', function () {
    describe('Quando tento registrar um usuario inválido', function () {
      it('Tem que retornar o status 400', async function () {
        const chaiHttpResponse = await chai.request(app).post('/register').send({
          name: 'stringstring',
          email: 'stringmail.com',
          password: 'string',
        });
        expect(chaiHttpResponse.status).to.equal(400);
      });
    });
  });
  describe('Quando tento registrar um usuario novo', function () {
    const user = {
      email: userEmail,
      password: 'string',
      id: 1,
      name: 'stringstring',
      role: 'string',
    };
    beforeEach(function () {
      const callBack = sinon.stub(User, 'findOne');
      callBack.onCall(0).resolves(null);
      callBack.onCall(1).resolves(null);
      callBack.onCall(2).resolves(user);
      sinon.stub(User, 'create').resolves(user); 
    });
    afterEach(function () {
      sinon.restore();
    });
    it('Tem que retornar o status 201', async function () {
      const chaiHttpResponse = await chai.request(app).post('/register').send({
        name: 'stringstring',
        email: userEmail,
        password: 'string',
      });
      expect(chaiHttpResponse.status).to.equal(201);
    });
  });
  });
