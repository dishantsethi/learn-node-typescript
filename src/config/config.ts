import Joi from 'joi'; 
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = Joi.object().keys({ 
    NODE_ENV: Joi.string().valid('development', 'production', 'local').required(),
    PORT: Joi.number().default(3000),

    DB_HOST: Joi.string().default('localhost'),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required().allow(''),
    DB_NAME: Joi.string().required(),

    LOG_FOLDER: Joi.string().required(),
    LOG_FILE: Joi.string().required(),
    LOG_LEVEL: Joi.string().required(),

    FORM_ID: Joi.string().required(),
  }).unknown();

const {value: envVar, error} = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    nodeEnv: envVar.NODE_ENV,
    port: envVar.PORT,
    dbConfig: {
        dbHost: envVar.DB_HOST,
        dbUser: envVar.DB_USER,
        dbPass: envVar.DB_PASS,
        dbName: envVar.DB_NAME,
    },
    logConfig: {
        logFolder: envVar.LOG_FOLDER,
        logFile: envVar.LOG_FILE,
        logLevel: envVar.LOG_LEVEL,
    },
    form_id: envVar.FORM_ID
};
