'use strict';

const Sequelize = require('sequelize');

module.exports.define = sequelize => {
    return sequelize.define('Version', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        version: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'Notes_version_id',
                unique: true,
                fields: ['noteId', 'id']
            },
        ],
    });
};
