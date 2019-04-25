'use strict';

const _ = require('lodash');

module.exports.list = async (req, res) => {
    const notes = await req.note.versions();
    res.json(_.invokeMap(notes, 'expose'));
};

/* module.exports.get = async (req, res) => {
    console.log(req.version);
    res.json(req.version.expose());
}; */
