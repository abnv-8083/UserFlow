module.exports = ((req,res,next)=>{
    const dateTime = Date()
    console.log(dateTime)
    next()
})