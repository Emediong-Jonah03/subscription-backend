import { Router } from "express";
import { authorise } from "../middleware/autho.middleware.js";
import { createSubscription } from "../subscription-tracker/subscription.controller.js";

const subscriptionRouter = Router();

// PATH api/v1/subscriptions (POST)
subscriptionRouter.post('/', authorise, createSubscription);

// PATH api/v1/subscriptions/upcoming-renewal (GET)
subscriptionRouter.get('/upcoming-renewal', (req, res) => {
    res.send({title: "get upcoming"});
});

// PATH api/v1/subscriptions/user/:id (GET)
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({title: "get all user subscriptions"});
});

// PATH api/v1/subscriptions (GET)
subscriptionRouter.get('/', (req, res) => {
    res.send({title: "Get all subscriptions"});
});

// PATH api/v1/subscriptions/:id (GET)
subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: "Get subscription by id"});
});

// PATH api/v1/subscriptions/:id/cancel (PUT)
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({title: "cancel user subscription"});
});

// PATH api/v1/subscriptions/:id (PUT)
subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: "update subscription"});
});

// PATH api/v1/subscriptions/:id (DELETe)
subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: "delete subscription"});
});

export default subscriptionRouter;
