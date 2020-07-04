import 'reflect-metadata';
import server from './server';

(async () => {
  await server.start();
})();
