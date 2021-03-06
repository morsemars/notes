'use strict';

const _ = require('lodash');

class Version {
    constructor(version) {
        this._version = version;
    }

    get id() {
        return this._version.id;
    }

    expose() {
        return _.pick(this._version, [
            'id',
            'subject',
            'body',
            'version',
            'updatedAt',
        ]);
    }
}

module.exports = Version;
