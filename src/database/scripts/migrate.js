import Umzug from 'umzug';
import path from 'path';
import { env } from 'custom-env';

import database from '..';

(async () => {
  env(process.env.NODE_ENV, path.join(__dirname, '../../../'));
  try {
    const instance = await database.connect();
    const migrationType = process.argv[2];
    const umzug = new Umzug({
      migrations: {
        path: path.join(__dirname, '../migrations'),
      },
      storage: 'mongodb',
      storageOptions: {
        connection: instance.connection,
        collectionName: 'migrations',
      },
    });

    switch (migrationType) {
      case 'up':
        await umzug.up({});
        break;
      case 'down':
        await umzug.down({});
        break;
      default:
        throw new Error('Invalid migration type');
    }

    console.log(`Migration ${migrationType} ran successfully!`);
  } catch (e) {
    console.log(e);
  } finally {
    database.disconnect();
    process.exit();
  }
})();
