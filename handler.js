"use strict";

const databaseManager = require("./databaseManager");

exports.getPerson = (event, context, callback) => {
  const itemId = event.pathParameters.firstAndLastName;

  databaseManager.getItem(itemId).then(response => {
    sendResponse(200, response, callback);
  });
};

exports.savePerson = (event, context, callback) => {
  const item = JSON.parse(event.body);

  databaseManager.saveItem(item).then(response => {
    sendResponse(200, item, callback);
  });
};

function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
  callback(null, response);
}
