import { v4 as uuidv4 } from 'uuid';

class Path {
  id = '';
  dir = '';
  type = '';

  constructor(path) {
    this.id = uuidv4();
    this.dir = path.dir;
    this.type = path.type;
  }

}

export default Path;