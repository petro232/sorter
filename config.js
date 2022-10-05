import {
  mainMenu,
  pause,
  userInput,
  pathsListToDelete,
  confirm
} from './helpers/inquirer.js';

import Paths from './models/paths.js';
import Core from './helpers/core.js'

const main = async () => {
  let opt = '';
  const paths = new Paths();

  do {
    opt = await mainMenu();
    switch (opt) {
      case '1':
        // ver paths
        paths.getAllPaths();
        break;
      case '2':
        // config path de origen
        const sourcePath = await userInput(`Ingrese el ${'Directorio de origen:'.yellow}`);
        const okAddingSourcePath = await confirm(`Está segura/o de agregar o cambiar el ${'Directorio de origen'.cyan}?`);
        if (okAddingSourcePath) {
          paths.addPath({ dir: sourcePath, type: 'source' });
          console.log(`${'Directorio de origen'.yellow} agregado correctamente`.green)
        }
        break;
      case '3':
        // config paths de destino
        const destinationPath = await userInput(`Ingrese un ${'Directorio de destino:'.magenta}`);
        const okAddingDestinationPath = await confirm(`Está segura/o de agregar el ${'Directorio de destino'.cyan}?`);
        if (okAddingDestinationPath) {
          paths.addPath({ dir: destinationPath, type: 'destination' });
          console.log(`${'Directorio de destino'.magenta} agregado correctamente`.green)
        }
        break;
      case '4':
        const pathToDeleteID = await pathsListToDelete();
        const ok = await confirm('Está segura/o de borrar el Directorio seleccionado?'.bgYellow);
        if (ok) {
          paths.deletePath(pathToDeleteID);
          console.log('Path borrado correctamente'.green)
        }
        break;
    }

    await pause();

  } while (opt !== '5');

}
main();