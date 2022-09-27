import colors from 'colors';

import Path from "./path.js";
import { savePath, readDB, deletePath } from '../helpers/crud.js'

class Paths {
  // _list = {}

  // get listArr() {
  //   const list = [];
  //   Object.keys(this._list).forEach(key => {
  //     const path = this._list[key];
  //     list.push(path);
  //   });
  //   return list;
  // }

  // constructor() {
  //   this._list = {};
  // }

  // cargarTareasFromArray(tareas = []) {
  //   tareas.forEach(tarea => {
  //     this._list[tarea.id] = tarea;
  //   });
  // }

  getAllPaths() {
    const allPaths = readDB();
    allPaths.forEach((path, index) => {
      const idx = `${index + 1}.`.green;
      const { dir, type } = path;
      let isSource = (type === 'source') ? 'path de Origen'.yellow.italic : 'path de Destino'.magenta.italic;

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