const mongoose = require("mongoose");

const injurySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //required: true,
  },
  injury: {
    type: String,
    required: true,
    lowercase: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

injurySchema.virtual("date").get(function () {
  //formatted form: 2022-12-08, 17:02
  const formatted = DateTime.fromJSDate(this.timestamp).toFormat(
    "yyyy-MM-dd,HH:mm"
  );
  const year = formatted.substring(0, 4);
  const month = formatted.substring(5, 7);
  const day = formatted.substring(8, 10);

  return `${day} ${month} ${year}`;
});

module.exports = mongoose.model("Injury", injurySchema);
