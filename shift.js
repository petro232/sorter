const fs = require('fs');
const sourceFolder = '/Users/tronio/downloads/test';
const destinationFolder = '/Users/tronio/desktop';

const getNumExpte = (file) => {
  const splitedFile = file.split('-');
  const numAndExtention = splitedFile[4];
  const numExp = numAndExtention.split('.');
  return numExp[0];
}

const checkDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    fs.mkdirSync(`${path}/Procesal`);
  }
  return path;
}

const loopFiles = async (dir) => {
  const files = await fs.promises.readdir(dir);
  const PDFfiles = files.filter(e => e !== '.DS_Store');
  const action = process.argv[2] || '-c';

  if (action !== '-x' && action !== '-c') {
    console.log('Sólo se admiten como parámetros "-c" o "-x"');
    return false;
  }

  for (let index = 0; index < PDFfiles.length; index++) {
    const file = PDFfiles[index];
    const isValid = file.split('-').length === 5;
    if (isValid) {
      const numExp = getNumExpte(file);
      const newPath = checkDir(`${destinationFolder}/${numExp}`);
      const currentFile = `${dir}/${file}`;
      const newFile = `${newPath}/${file}`;
      if (action === '-c') {
        fs.copyFileSync(currentFile, newFile);
      } else {
        fs.rename(currentFile, newFile, (err) => {
          if (err) {
            throw err
          }
        });
      }
    }
  }

  if (action === '-c') {
    console.log(`********** Proceso finalizado. Los archivos fueron copiados **********`)
  } else {
    console.log(`********** Proceso finalizado. Los archivos fueron movidos **********`)
  }
}

loopFiles(sourceFolder);
