const errorMiddleWare = (err, req, res, next) => {
    try {
        let error = { ...err }
        error.message = err.message
        console.error(error.message)

        //Mongoose bad ObjectId
        if(error.name == 'CastError') {
            const message = "Resource not found" 
            error =  new Error(message)
            error.statusCode = 404
        }

        //Mongoose Duplicate key
        if(error.code == '11000') {
            const message = 'Duplicate feild found'
            error = new Error(message)
            error.statusCode = 400
        }

        //Mongoose validation error
        if(error.name == "Validation error") {
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message.join(','))
            error.statusCode = 400
        }

        res.status(err.statusCode || 500).json({ success: false, error: error.message || 'Server Error'})

    } catch (error) {
        next(error)
    }
}

export default errorMiddleWare