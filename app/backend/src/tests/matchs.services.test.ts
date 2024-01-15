import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from "../database/models/Macthes";
import matchServices from "../Services/matchServices";
import { mockMatches, findAll } from './Mocks/matchsMock';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando partidas', function() {
    let chaiHttpResponse: Response;
    describe('Rota /matches', async function() {
      beforeEach(async () => {
          sinon
            .stub(Matches, "findAll")
            .resolves(findAll as any);
        });

      afterEach(() => {
        (Matches.findAll as sinon.SinonStub).restore();
      });

      it('Exibe corretamente os detalhes da partida?', async function(){
          chaiHttpResponse = await chai.request(app).get('/matches');      

          expect(chaiHttpResponse.status).to.equal(200);
          expect(chaiHttpResponse.body).to.deep.equal(findAll);
      });
    });
  });
