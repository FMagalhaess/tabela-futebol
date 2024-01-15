import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from "../database/models/Teams";
import matchService from '../Services/matchServices';
import teamServices from "../Services/teamServices";
import { matchesMock, teamsMock } from './Mocks/matchsMock';
chai.use(chaiHttp);

const { expect } = chai;

describe("TeamServices", () => {
  describe("getAll", () => {
    it("should return all teams", async () => {
      const findAllStub = sinon.stub(Teams, "findAll");
      const mockTeams = [
        { id: 1, name: "Team A" },
        { id: 2, name: "Team B" },
      ];

      findAllStub.resolves(mockTeams as any);

      const result = await teamServices.getAll();

      expect(result).to.deep.equal(mockTeams as any);

      findAllStub.restore();
    });
  });

  describe("getById", () => {
    it("should return a team by ID", async () => {
      const findByIdStub = sinon.stub(Teams, "findByPk");
      const mockTeam = { id: 1, name: "Team A" };

      findByIdStub.resolves(mockTeam as any);

      const result = await teamServices.getById(1);

      expect(result).to.deep.equal(mockTeam as any);

      findByIdStub.restore();
    });
  });
});
