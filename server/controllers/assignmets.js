const Assignment = require('../model/asignment');
const Assignment=require('../model/asignment');
const catchAsyncAwait = require('../utils/CatchAsync');
const CustomError = require('../utils/CoustomError');

const createAssignments = catchAsyncAwait(async (req, res, next) => {
    
    const { title, category, price, tags} = req.body;
     const postedBy=req.user;
    // Validate required fields
    if (!title || !category || !price || !postedBy) {
        return next(new CustomError('Please provide all required fields', 400));
    }

    // Create a new assignment
    const newAssignment = await Assignment.create({
        title,
        category,
        price,
        status: 'notdone', 
        postedBy,           
        tags,               
    });

   
    res.status(201).json({
        success: true,
        data: newAssignment,  
    });
});

const deleteOrUpdateAssignment = catchAsyncAwait(async (req, res, next) => {
    const assignmentId = req.params.id; 
    const { sell, completedBy } = req.body; 

    // Check if the assignment exists
    const assignmentToUpdate = await Assignment.findById(assignmentId);
    if (!assignmentToUpdate) {
        return next(new CustomError('Assignment not found', 404));
    }

    if (sell) {
        
        assignmentToUpdate.status = 'done';
        assignmentToUpdate.completedBy = completedBy; // Set the user who completed it
        await assignmentToUpdate.save();

       
        res.status(200).json({
            success: true,
            message: 'Assignment marked as done successfully',
            data: assignmentToUpdate, 
        });
    } else {
        
        await Assignment.findByIdAndDelete(assignmentId);

       
        res.status(204).json({
            success: true,
            message: 'Assignment deleted successfully',
        });
    }
});



const getAssignments = catchAsyncAwait(async (req, res, next) => {
    const { category, completedBy, tags, minPrice, maxPrice } = req.query;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    // Prepare the filters object
    const filters = {
        category,
        completedBy,
        tags,
        minPrice,
        maxPrice,
    };

   
    const result = await assignmentService.getAssignments(filters, page, limit);

   
    res.status(200).json({
        success: true,
        data: result.assignments,
        pagination: {
            total: result.total,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
            limit,
        },
    });
});


 


module.exports = { createAssignments };
