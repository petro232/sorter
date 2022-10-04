import express from 'express';
const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.get('/', (req, res) => { })
// app.post('/', (req, res) => { console.log('post to index') })







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})