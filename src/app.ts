import cors from 'cors';
import express, {Express, NextFunction, Request, Response} from 'express';
import httpStatus from 'http-status';
import ApiError from './helper/apiHelper';
import routes from './route';
import { errorConverter, errorHandler } from './middlewares/errors';
export const app: Express = express();

// enable cors, options for cors middleware
app.use(
    cors({
        origin: '*',
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    res.status(200).send('Well done!');
})

app.get('/api/v1/test', async (req, res) => {
    res.status(200).send('Congratulations!Typescript API is working!');
});

app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
