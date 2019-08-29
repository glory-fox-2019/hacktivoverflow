module.exports = (err, req, res, next) => {
    console.log(err)
    let code = err.code||500
    let message = err.message||'Internal Server Error'
    res
        .status(code)
        .json({
            message
        })
}