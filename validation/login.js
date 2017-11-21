'use strict';

var Joi = require('joi');

module.exports = {
  headers: {
    accesstoken: Joi.string().regex(/^XCOOg3LY0odbv8lV9qd78sJhyhHqNY9sNYH$/).required(),
    applicationtoken : Joi.string().regex(/^[a-zA-Z0-9]{16}$/).required()
  }
};