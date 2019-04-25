'use strict';

const _ = require('lodash');
const domain = require('../domain');

class Note {
    constructor(note) {
        this._note = note;
    }

    get id() {
        return this._note.id;
    }

    get version() {
        return this._note.version;
    }

    expose() {
        return _.pick(this._note, [
            'id',
            'subject',
            'body',
            'version',
            'updatedAt',
        ]);
    }

    async update(body) {
        await this.createVersion(this._note.subject, this._note.body, this._note.version);
        await this._note.update({
            body,
            version: this._note.version + 1
        });
    }

    async delete() {
        await this._note.destroy();
    }

    async versions() {
        const versions = await this._note.getVersions({
            order: [
                ['version', 'DESC']
            ],
        });
        return _.map(versions, version => new domain.Version(version));
    }

    async createVersion(subject, body, prevVersion) {
        const version = await this._note.createVersion({
            subject,
            body,
            version: prevVersion
        });

        return new domain.Version(version);
    }
}

module.exports = Note;
