import { Subscription } from "../models/subscription.model.js"

export const createSubscription = async (req, res, next)=> {
try {

    const subscription = await Subscription.create({
        ...req.body,
        user: req.user._id
    })
    
    return res.status(201).json({
        success: true,
        message: "Subscription sucessfull",
        data: subscription
    })
    
} catch (error) {
    console.error(`There was an error creating subscription ${error}`)
    next(error)
}
}


export const getUserSubscription = async (req, res, next)=> {
try {
    const subtoken = req.user.id
    const sub = req.params.id
    const subscriptions = Subscription.find({sub})

    if (subtoken !== sub) return res.status(404).json({
        success: false,
        message: "You are not allowed to acces this subscription"
    })

    if (!subscriptions) return res.status(404).json({
        success: false,
        message: "there are no subscriptions"
    })

    return res.status(200).json({
        success: true,
        data: [subscriptions]
    })

} catch (error) {
    next(error)
}
}