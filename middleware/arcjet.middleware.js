import { aj }from "../config/arcjet.js"


export const arcjetMiddlware = async (req, res, next)=> {

    try {
        const decision = await aj.protect(req,{
            requested: 1
        })
        
        if (decision.isDenied()) {
            if (decision.reason.isRatelimit()) {
                return res.statusCode(429).json({
                    message:"Rate limit exceeded"
                }) 
            }

            if(decision.reason.isBot()) {
                return res.statusCode(403).json({
                message: "Bot detected"
            })
            }
        }
        next()
    } catch (error) {
        console.error(`Arcject middleware error ${error}`)
        next(error)
    }
}
