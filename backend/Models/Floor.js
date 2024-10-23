// models/Floor.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  room_no: { type: String, required: true },
  capacity: { type: Number, required: true },
  description: { type: String },
});

const FloorSchema = new mongoose.Schema({
  floor_no: { type: Number, required: true, unique: true },
  rooms: [RoomSchema],
});

const Floor = mongoose.models.Floor || mongoose.model('Floor', FloorSchema);

module.exports = Floor;