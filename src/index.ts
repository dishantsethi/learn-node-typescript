import {createServer} from 'http';
import {app} from './app';
import {config} from './config/config';
import db from './models'

const port = config.port;

(async () => {
  await db.sequelize.sync();
  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();