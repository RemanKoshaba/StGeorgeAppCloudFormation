"use strict";

const AWS = require("aws-sdk");
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "People";

module.exports.initializateDynamoClient = newDynamo => {
  dynamo = newDynamo;
};

module.exports.saveItem = item => {
  console.log("Item: ", item);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      firstAndLastName: item.firstAndLastName,
      firstName: item.firstName,
      lastName: item.lastName,
      dob: item.dob,
      email: item.email,
      street: item.street,
      city: item.city,
      state: item.state,
      zip: item.zip,
      homePhone: item.homePhone,
      cellPhone: item.cellPhone
    }
  };

  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return item;
    });
};

module.exports.getItem = itemId => {
  const params = {
    Key: {
      firstAndLastName: itemId
    },
    TableName: TABLE_NAME
  };

  return dynamo
    .get(params)
    .promise()
    .then(result => {
      return result.Item;
    });
};
