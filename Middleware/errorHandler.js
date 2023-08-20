const { CustomAPIError } = require("../Errors/customErrors");

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({ msg: "There was an error " + error });
};

module.exports = errorHandler;
