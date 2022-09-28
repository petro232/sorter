#!/usr/bin/env node

import {
  mainMenu,
  pause,
  userInput,
  pathsListToDelete,
  confirm,
  sortMethod
} from './helpers/inquirer.js';

import Paths from './models/paths.js';
import Core from './helpers/core.js'

// import { savePath, readDB } from './helpers/crud.js'


const main = async () => {
  let opt = '';
  const paths = new Paths();
  const core = new Core();
  // const pathsDB = readDB();
  // if (pathsDB) {
  //   const allPaths = paths.loadPaths(pathsDB);
  //   console.log(allPaths);
  // }

  do {
    opt = await mainMenu();
    switch (opt) {
      case '1':
        // clasificar archivos
        const method = await sortMethod();
        await core.sort(method);
        console.log('Distribución de documento finalizada'.green)
        break;
      case '2':
        // ver paths
        paths.getAllPaths();
        break;
      case '3':
        // config path de origen
        const sourcePath = await userInput(`Ingrese el ${'Path:'.cyan}`);
        const okAddingSourcePath = await confirm('Está segura/o de agregar o cambiar el path de origen?');
        if (okAddingSourcePath) {
          paths.addPath({ dir: sourcePath, type: 'source' });
          console.log('Path agregado correctamente'.green)
        }
        break;
      case '4':
        // config paths de destino
        const destinationPath = await userInput(`Ingrese el ${'Path:'.cyan}`);
        const okAddingDestinationPath = await confirm('Está segura/o de agregar el path de destino?');
        if (okAddingDestinationPath) {
          paths.addPath({ dir: destinationPath, type: 'destination' });
          console.log('Path agregado correctamente'.green)
        }
        break;
      case '5':
        const pathToDeleteID = await pathsListToDelete();
        const ok = await confirm('Está segura/o de borrar el path seleccionado?');
        if (ok) {
          paths.deletePath(pathToDeleteID);
          console.log('Path borrado correctamente'.green)
        }
        break;
    }

    // savePath(paths._list);

    await pause();

  } while (opt !== '6');

}
main();