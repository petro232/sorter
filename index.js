const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public')); // necesario para que funciones el templating desde cualquien directorio. Tipo "path absoluto "

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/config', (req, res) => {
  res.render('config')
})




// app.get('/cats', (req, res) => {
//   const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
//   res.render('cats', { cats })
// })
// app.get('/rand', (req, res) => {
//   const num = Math.floor(Math.random() * 10) + 1;
//   res.render('random', { num })
// })
// app.get('/r/:subreddit', (req, res) => {
//   const { subreddit } = req.params;
//   const data = redditData[subreddit];
//   if (data) {
//     res.render('subreddit', { ...data })
//   } else {
//     res.render('notfound', { subreddit })
//   }
// })

app.listen(3000, () => {
  console.log('listening on port 3000')
})