import express from 'express';
import path from 'path';
const app = express();
import Core from './helpers/core.js'

app.set('view engine', 'ejs');
const { pathname: root } = new URL('./public', import.meta.url)
app.set('views', root); // necesario para que funciones el templating desde cualquien directorio. Tipo "path absoluto "




app.get('/', (req, res) => {
  if (req.query) {
    let { method } = req.query;
    const core = new Core();
    try {
      core.allocateFiles(method);
      res.render('home', { wereAllocated: true })
    } catch (error) {
      res.render('home', { wereAllocated: false })
    }
  } else {
    res.render('home', { wereAllocated: false })
  }
})

app.get('/config', (req, res) => {
  res.render('config')
})

app.get('/allocate', (req, res) => {
  let { method } = req.query;
  const core = new Core();
  try {
    core.allocateFiles(method);
    res.render('home', { wereAllocated: true })
  } catch (error) {
    res.render('home', { wereAllocated: false })
  }
})

app.get('*', (req, res) => {
  res.render('home')
})


app.listen(3000, () => {
  console.log('listening on port 3000')
})