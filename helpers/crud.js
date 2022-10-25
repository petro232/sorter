import fs from "fs";
const db = './db/data.json';
const dbData = JSON.parse(fs.readFileSync(db));

const savePath = (data) => {
  if (data.type === 'source') {
    const sourcePath = dbData.filter(e => e.type === 'source');

    if (sourcePath.length === 0) {
      dbData.unshift(data);
    } else {
      dbData[0] = data;
    }

    fs.writeFileSync(db, JSON.stringify(dbData));
  }

  if (data.type === 'destination') {
    dbData.push(data);
    fs.writeFileSync(db, JSON.stringify(dbData));
  }
}

const readDB = () => {
  if (!fs.existsSync(db)) {
    return null;
  }
  const info = fs.readFileSync(db, { encoding: 'utf-8' });
  const data = JSON.parse(info);
  return data;
}

const deletePath = (pathId) => {
  const path = dbData.findIndex(element => element.id === pathId);
  dbData.splice(path, 1);
  fs.writeFileSync(db, JSON.stringify(dbData));
}

export {
  savePath,
  readDB,
  deletePath
}