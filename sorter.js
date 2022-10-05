import Core from './helpers/core.js';
import colors from 'Colors'

const main = async () => {
  const core = new Core();
  const method = process.argv[2] || '-m';

  if (method !== '-c' && method !== '-m') {
    console.log('No se admiten comandos distintos a "-c" o "-m"'.red);
  } else {
    await core.sort(method);
    console.log('Distribución de documento finalizada'.green);

  }
}

main();