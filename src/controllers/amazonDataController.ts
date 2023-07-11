import { Request, Response } from 'express';
import db from '../models'
import httpStatus, { CREATED } from 'http-status';
import googleForm from './googleForm';

export default class amazonDataController {
    private googleForm: googleForm
    constructor() {
        this.googleForm = new googleForm()
    }

    create = async (req: Request, res: Response) => {
        try {
            let username = req.body.username
            let data = req.body.data
            const user_id = await db.User.create({username: username})
            let id = user_id.dataValues.user_id
            data.map((o: { user_id: string; }) => (o.user_id = id));
            const created_items = await db.Item.bulkCreate(data)
            this.googleForm.send(username, data)
            
            res.status(httpStatus.CREATED).json({status: httpStatus.CREATED, message: `${created_items.length} items created for user ${username}`})
        }
        catch (e) {
            console.log(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }
}