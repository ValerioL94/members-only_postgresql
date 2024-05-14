const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  username: { type: String, required: true, minLength: 5, maxLength: 100 },
  password: { type: String, required: true, minLength: 5, maxLength: 100 },
  status: {
    type: String,
    required: true,
    minLength: 1,
    default: 'anon',
  },
});

UserSchema.virtual('fullname').get(function () {
  return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('User', UserSchema);
