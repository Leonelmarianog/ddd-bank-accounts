import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'better-sqlite3',
  database: process.env.DB_PATH,
};

export default new DataSource({
  ...dataSourceOptions,
  entities: [join(__dirname, 'src/**/database/entity/*.entity.ts')],
});
