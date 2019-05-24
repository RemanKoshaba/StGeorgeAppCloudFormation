var Validator = require("jsonschema").Validator;
let validator = new Validator();

let postSchema = {
  id: "/PersonSchema",
  type: "object",
  properties: {
    firstAndLastName: { type: "string", format: "alpha-numeric", minLength: 1 },
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    dob: { type: "string", minLength: 1 },
    email: { type: "string", minLength: 1 },
    street: { type: "string", minLength: 1 },
    city: { type: "string", minLength: 1 },
    state: { type: "string", minLength: 1 },
    zip: { type: "string", minLength: 5 },
    homePhone: { type: "string", minLength: 10 },
    cellPhone: { type: "string", minLength: 10 }
  },
  required: [
    "firstAndLastName",
    "firstName",
    "lastName",
    "dob",
    "email",
    "street",
    "city",
    "state",
    "zip",
    "homePhone",
    "cellPhone"
  ]
};

module.exports.validator = validator;
module.exports.postSchema = postSchema;
