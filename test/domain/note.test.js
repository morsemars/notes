'use strict';

const _ = require('lodash');
require('should');
const domain = require('../../src/domain');
const model = require('../../src/model');

describe('Tests for domain Note', () => {
    let noteId;
    let modelUser;
    let domainNote;

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
    });

    describe('instance method', () => {
        describe('getters', () => {
            it('should get the id', () => {
                domainNote.id.should.equal(noteId);
            });
        });

        describe('expose', () => {
            it('should expose the id, subject, version, body and updatedAt of the note', () => {
                domainNote.expose().should.match({
                    id: noteId,
                    subject: 'some subject',
                    body: 'some body',
                    version: 1,
                    updatedAt: _.isDate,
                });
            });
        });

        describe('update', () => {
            it('should update the body and version of the note', async () => {
                await domainNote.update('new body');
                domainNote.expose().should.match({
                    id: noteId,
                    subject: 'some subject',
                    body: 'new body',
                    version: 2,
                    updatedAt: _.isDate,
                });
            });

            it('should not update the subject of the note', async () => {
                await domainNote.update({
                    subject: 'new subject',
                    body: 'updated body'
                }).should.be.rejectedWith(model.sequelize.ValidationError);
            });

        });

        describe('versions', () => {
            it('should retrieve all the versions of the note', async () => {
                await domainNote.update('new body');
                const versions = await domainNote.versions();
                versions.length.should.be.equal(1);
            });
        });

        describe('delete', () => {
            it('should delete the note', async () => {
                await domainNote.delete();

                (await modelUser.getNotes()).should.be.empty();
            });
        });
    });
});
