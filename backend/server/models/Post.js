const mongoose = require('mongoose');
/**
 * The Post Schema structures the data rules for every blog entry.
 * If incoming data does not match this format, MongoDB will reject it.
 */
const PostSchema = new mongoose.Schema({
 title: {
 type: String,
 required: [true, 'Validation Failure: Every post requires an explicit title.'],
 trim: true
 },
 slug: {
 type: String,
 required: true,
 unique: true // Prevents duplicate URL pathways within the database room
 },
 summary: {
 type: String,
 required: [true, 'Validation Failure: A descriptive short summary is required.'],
 trim: true
 },
 readTime: {
 type: String,
 required: [true, 'Validation Failure: Read Time is required.'],
 trim: true
 },
 thumbnail: {
 type: String,
 required: [true, 'Validation Failure: The thumbnail image URL is required.'],
 trim: true
 },
 content: {
 type: String,
 required: [true, 'Validation Failure: Main body content cannot be empty.']
 },
 author: {
 type: String,
 default: 'Nexus User' 
 },
 createdAt: {
 type: Date,
 default: Date.now 
 }
});
module.exports = mongoose.model('Post', PostSchema);