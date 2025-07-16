const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: String,
  usn: String,
  collegeName: String,
  collegeAddress: String,
  userAddress: String,
  projectTitle: String,
  mobile: String, // ✅ This must exist
  present: Boolean,
  date: String,
});


module.exports = mongoose.model('Submission', submissionSchema);
