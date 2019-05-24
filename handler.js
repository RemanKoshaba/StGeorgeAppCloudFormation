"use strict";

// Validation using jsonschema to validate API requests.
const validation = require("./validation");

// Database manager to perform database operations.
const databaseManager = require("./databaseManager");

/**
 * Retrieve the person from the database.
 *
 * @param event The event containing the path parameter.
 * @param context Context about the call (Not used).
 * @param callback Callback function for sending the response.
 */
exports.getPerson = (event, context, callback) => {
  // Retrieve the hask key from the path parameter
  const personId = event.pathParameters.firstAndLastName;

  // Attempt to retrieve the key from the database
  databaseManager.getItem(personId).then(response => {
    // Send a 200 response code with the object stored in the database.
    sendResponse(200, response, callback);
  });
};

/**
 * Persist a person into the DynamoDB database.
 *
 * @param event The event containing the post body and headers.
 * @param context Context about the call (Not used).
 * @param callback Callback function for sending the response.
 */
exports.savePerson = (event, context, callback) => {
  // Parse the body
  const requestBody = JSON.parse(event.body);

  // Add the person schema so that it can be validated
  validation.validator.addSchema(validation.postSchema, "/PersonSchema");

  // Validate the request body based on the schema
  let validationResult = validation.validator.validate(
    requestBody,
    validation.postSchema
  );

  // Check if the request body is valid
  if (!validationResult.valid) {
    let validationMessages = validationResult.errors
      .map(x => x.message) // Map the errors to the message for the errors
      .join(", "); // Join each item in the array by a comma and space.

    // Throw a 400 indicating that there was a validation error with a message explaining the valiation error
    sendResponse(400, validationMessages, callback);
  }

  // Persist the person into the database if there were no issues and send a 200 with the body that was persisted
  databaseManager.saveItem(requestBody).then(response => {
    sendResponse(200, requestBody, callback);
  });
};

/**
 * Send a response with the status code and a message to send back.
 * @param {*} statusCode Status code for the call.
 * @param {*} message Message sent back in the response body.
 * @param {*} callback Callback function for sending the response.
 */
function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
  callback(null, response);
}
