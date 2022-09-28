import inquirer from "inquirer";
import colors from 'colors'
import { readDB } from './crud.js'

const mainQueries = [
  {
    type: 'list',
    name: 'option',
    message: 'Qué desea hacer?',
    pageSize: 10,
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Distribuir documentos`
      },
      new inquirer.Separator(),
      {
        value: '2',
        name: `${'2.'.green} Ver paths agregados`,
      },
      {
        value: '3',
        name: `${'3.'.green} Agregar/Cambiar path de origen`,
      },
      {
        value: '4',
        name: `${'4.'.green} Agregar paths de destino`
      },
      {
        value: '5',
        name: `${'5.'.green} Borrar paths`
      },
      new inquirer.Separator(),
      {
        value: '6',
        name: `${'6.'.green} Salir`
      }
    ]
  }
]


const mainMenu = async () => {
  console.clear();
  console.log(':::::::::::::::: SORTER :::::::::::::::::'.green);
  console.log('   Distribuidor automático de archivos   '.white);
  console.log(':::::::::::::::::::::::::::::::::::::::::\n'.green);

  const { option } = await inquirer.prompt(mainQueries);
  return option;
}

const pause = async () => {
  const question = {
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.cyan} para continuar`
  }
  console.log('\n');
  await inquirer.prompt(question);

}

const userInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'dir',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Ingrese un path'.red
        }
        return true;
      }
    }
  ];
  const { dir } = await inquirer.prompt(question);
  return dir;
}

const pathsListToDelete = async () => {
  const paths = readDB();
  const choices = paths.map((path, i) => {
    const idx = `${i + 1}.`.green;
    let isSource = (path.type === 'source') ? 'path de Origen'.yellow.italic : 'path de Destino'.magenta.italic;
    return {
      value: path.id,
      name: `${idx} ${path.dir} :: ${isSource}`
    }
  });
  const options = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar path',
      choices
    }
  ]
  const { id } = await inquirer.prompt(options);
  return id;
}

const sortMethod = async () => {
  const options = [
    {
      type: 'list',
      name: 'method',
      message: 'Seleccione una opción para distribuir los documentos'.green,
      choices: ['Copiar documentos', 'Mover documentos']
    }
  ]
  const { method } = await inquirer.prompt(options);
  return method;
}

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
}

export {
  mainMenu,
  pause,
  userInput,
  pathsListToDelete,
  confirm,
  sortMethod
}