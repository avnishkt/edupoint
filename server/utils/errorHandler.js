
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    
    // Set status code
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
