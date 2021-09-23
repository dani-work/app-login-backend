const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  });

PersonSchema.methods.toJSON = function () {
    const { __v, _id, password, ...person } = this.toObject();
    person.uid = _id;
    return person;
}

module.exports = model('Person', PersonSchema, 'person');