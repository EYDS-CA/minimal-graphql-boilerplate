import path from 'path';
import { env } from 'custom-env';

import database from '..';

(async () => {
  env(process.env.NODE_ENV, path.join(__dirname, '../../../'));
  try {
    const instance = await database.connect();
    await instance.connection.db.dropDatabase();
    console.log('Database wiped!');
  } catch (e) {
    console.log(e);
  } finally {
    database.disconnect();
    process.exit();
  }
})();
