import fs from 'fs';

import { readDB } from './crud.js';
const paths = readDB();

class Core {
  getSourcePathDir() {
    const sourcePath = paths.filter(e => e.type === 'source');
    const sourcePathDir = sourcePath[0].dir
    return sourcePathDir;
  };

  getDestinationPathsDirs() {
    const destinationPathsDir = [];
    const destinationPaths = paths.filter(e => e.type === 'destination');
    for (const path of destinationPaths) {
      destinationPathsDir.push(path.dir)
    }
    return destinationPathsDir;
  };

  getNumExpte(file) {
    const splitedFile = file.split('.');
    const numExp = splitedFile[4];
    return numExp;
  };

  checkDir = async (numExpte) => {
    const destinationPathsDirs = await this.getDestinationPathsDirs();
    for (const dir of destinationPathsDirs) {
      if (fs.existsSync(`${dir}${numExpte}`)) {
        let path = `${dir}${numExpte}`;
        return path;
      }
    }
  }

  sort = async (method) => {
    const sourcePathDir = await this.getSourcePathDir();
    const files = await fs.promises.readdir(sourcePathDir);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isValid = (file.split('.').length === 6) &&
        (file.substring(file.length - 4) === '.pdf');
      if (isValid) {
        const numExpte = await this.getNumExpte(file);
        const currentFilePath = `${sourcePathDir}/${file}`;
        const newPath = await this.checkDir(`${numExpte}`);
        if (newPath) {
          const newFilePath = `${newPath}/${file}`;
          if (method === '-c') {
            fs.copyFileSync(currentFilePath, newFilePath);
          } else {
            fs.rename(currentFilePath, newFilePath, (err) => {
              if (err) {
                throw err
              }
            });
          }
        }
      }
    }

    return true;
  }

}

export default Core;