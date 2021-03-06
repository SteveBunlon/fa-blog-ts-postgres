import * as path from 'path';
import { Options } from "sequelize";
import { DatabaseConfiguration } from "forest-express-sequelize";

const databaseOptions: Options = {
  logging: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? console.log : false,
  pool: { max: 10, min: 1 },
  dialectOptions: { },
};

if (process.env.DATABASE_SSL && JSON.parse(process.env.DATABASE_SSL.toLowerCase())) {
  const rejectUnauthorized = process.env.DATABASE_REJECT_UNAUTHORIZED;
  if (rejectUnauthorized && (JSON.parse(rejectUnauthorized.toLowerCase()) === false)) {
    databaseOptions.dialectOptions["ssl"] = { rejectUnauthorized: false };
  } else {
    databaseOptions.dialectOptions["ssl"] = true;
  }
}

const databasesConfiguration: DatabaseConfiguration[] = [{
  name: 'default',
  modelsDir: path.resolve(__dirname, '../models'),
  connection: {
    url: process.env.DATABASE_URL,
    options: { ...databaseOptions },
  },
}];

export default databasesConfiguration;
