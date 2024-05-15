const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 30 },
  comment: { type: String, required: true, minLength: 1, maxLength: 300 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date },
});

module.exports = mongoose.model('Post', PostSchema);
