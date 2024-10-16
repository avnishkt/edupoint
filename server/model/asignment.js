const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const assignmentSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['Math', 'Science', 'Programming', 'English', 'History', 'Other'], 
    required: [true, 'Category is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive value'],
  },
  status: {
    type: String,
    enum: ['done', 'notdone'],
    default: 'notdone',
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'PostedBy user ID is required'],
  },
  tags: {
    type: [String], 
    default: [], 
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

// Indexing to improve query performance, especially for frequently searched fields
assignmentSchema.index({ title: 'text', category: 1 });

// Virtual field to check if the assignment is overdue
assignmentSchema.virtual('isOverdue').get(function () {
 
  return Date.now() > this.dueDate; 
});


assignmentSchema.pre('save', function (next) {
  if (this.isNew && this.price < 0) {
    next(new Error('Price cannot be negative'));
  } else {
    next();
  }
});


const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
