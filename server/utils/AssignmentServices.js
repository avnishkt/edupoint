
const Assignment = require('../model/asignment');
const CustomError = require('./CoustomError'); 

const getAssignmentservice = async (filters, page, limit) => {
    const query = {};

    
    if (filters.category) {
        query.category = filters.category;
    }

   
    if (filters.completedBy) {
        query.completedBy = filters.completedBy;
    }

    
    if (filters.tags) {
        const tagsArray = Array.isArray(filters.tags) ? filters.tags : [filters.tags];
        query.tags = { $in: tagsArray };
    }

    
    if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) {
            query.price.$gte = filters.minPrice;
        }
        if (filters.maxPrice) {
            query.price.$lte = filters.maxPrice;
        }
    }

    //pagination
    const skip = (page - 1) * limit; 
    const totalAssignments = await Assignment.countDocuments(query); 
    const assignments = await Assignment.find(query).skip(skip).limit(limit); 

    return {
        total: totalAssignments,
        assignments,
        totalPages: Math.ceil(totalAssignments / limit),
        currentPage: page,
    };
};

module.exports = {
    getAssignmentservice,
};
