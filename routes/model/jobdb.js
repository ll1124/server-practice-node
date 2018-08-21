var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  question: String,
  subject: String,
  frequency: String,
  answer: String
});
module.exports = mongoose.model('jobdata',jobSchema);
