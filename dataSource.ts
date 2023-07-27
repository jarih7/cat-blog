import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const datasource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: [
        "src/**/*.entity.ts",
        "dist/src/**/*.entity.js"
    ],
    synchronize: true,
} as DataSourceOptions);

datasource.initialize();

module.exports = { datasource };
