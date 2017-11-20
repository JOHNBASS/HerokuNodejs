'use strict';

var Joi = require('joi');

module.exports = {
  headers: {
    accesstoken: Joi.string().required(),
    applicationtoken : Joi.string().required()
  }
};