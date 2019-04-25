'use strict';

require('should');
const sinon = require('sinon');
const route = require('../../../src/api/route');

describe('Tests for api route note', () => {
    let req;
    let res;
    let note;
    let version;

    beforeEach(() => {
        req = {};
        res = {
            json: sinon.spy(),
            sendStatus: sinon.spy(),
        };

        version = {
            expose: sinon.stub().returns('exposedVersion')
        };

        note = {
            expose: sinon.stub().returns('exposedNote'),
            update: sinon.stub().resolves(),
            delete: sinon.stub().resolves(),
            createVersion: sinon.stub().resolves(version),
            versions: sinon.stub().resolves([
                version,
                version
            ])
        };

    });

    describe('list', () => {
        it('should json the list of exposed versions', async () => {

            req.note = note;

            await route.version.list(req, res);
            req.note.versions.calledWithExactly().should.be.true();
            res.json.calledWithExactly([
                'exposedVersion',
                'exposedVersion'
            ]).should.be.true();
        });
    });

    describe('get', () => {
        it('should json the exposed version', () => {
            req.version = version;

            route.version.get(req, res);

            res.json.calledWithExactly('exposedVersion').should.be.true();
        });
    });

});
