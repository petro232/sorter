import colors from 'colors';

import Path from "./path.js";
import { savePath, readDB, deletePath } from '../helpers/crud.js'

class Paths {

  getAllPaths() {
    const allPaths = readDB();
    allPaths.forEach((path, index) => {
      const idx = `${index + 1}.`.green;
      const { dir, type } = path;
      let isSource = (type === 'source') ? 'Dirctorio de Origen'.yellow.italic : 'Directorio de Destino'.magenta.italic;

      console.log(`${idx} ${dir} :: ${isSource}`);
    })
  }

  addPath(data = {}) {
    const path = new Path(data);
    savePath(path)
  }

  deletePath(id) {
    deletePath(id);
  }

}

export default Paths;