module.exports = (err, req, res, next) => {
    if(err) {
        if(err.name === 'ValidationError') {
            let arrayOfError = [];
            for(var field in err.errors) {
                arrayOfError.push(err.errors[field].message)
            }
            res.status(400).json(arrayOfError)
        }
        else {
            res.status(err.status || 500).json(err.message || "Internal Server error")
        }
    }
}