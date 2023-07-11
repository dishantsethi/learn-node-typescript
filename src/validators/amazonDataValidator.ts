import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ApiError from '../helper/apiHelper';
import httpStatus from 'http-status';


export default class amazonDataValidator {
    async requestAmazonDataValidtor(req: Request, res: Response, next: NextFunction) {
        const data = Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required(),
            is_amazon_choice: Joi.bool().required(),
            rating: Joi.number().required(),
            rating_count: Joi.number().required(),
            is_prime: Joi.bool().required()
        });
        const arrayData = Joi.array().items(data)
        const schema = Joi.object({
            username: Joi.string().required(),
            data: arrayData
        })
        
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }
}