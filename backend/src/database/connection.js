const knex = require('knex');
const knexfile = require('../../knexfile');

const env = process.env.NODE_ENV || ('development' || 'test');
//process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const configOptions = knexfile[env];

module.exports = knex(configOptions);