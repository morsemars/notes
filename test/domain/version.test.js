'use strict';

const _ = require('lodash');
require('should');
const domain = require('../../src/domain');
const model = require('../../src/model');

describe('Tests for domain Version', () => {
    let noteId;
    let modelUser;
    let domainNote;
    let version;

    beforeEach(async () => {
        await model.sequelize.sync({
            force: true
        });

        modelUser = await model.User.createUser('user1', 'password1');

        const note = await modelUser.createNote({
            subject: 'some subject',
            body: 'some body',
        });
        noteId = note.id;
        domainNote = new domain.Note(note);
        version = await domainNote.createVersion('new subject', 'new body', 1);
    });

    describe('instance method', () => {
        describe('getters', () => {
            it('should get the id', () => {
                version.id.should.equal(noteId);
            });
        });

        describe('expose', () => {
            it('should expose the id, subject, version, body and updatedAt of the current note version', () => {
                version.expose().should.match({
                    id: 1,
                    subject: 'new subject',
                    body: 'new body',
                    version: 1,
                    updatedAt: _.isDate,
                });
            });
        });

    });
});
