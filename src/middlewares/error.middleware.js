const middlewareError = (error, req, res, next) => {
    console.log("Entró a middleware de Error")
    res.status(400).json({
        error: {
        name: error.name,
        message: error.message,
        } 
    });
}

module.exports = middlewareError;