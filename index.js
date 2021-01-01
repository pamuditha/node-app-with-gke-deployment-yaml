const app = require('express')();
const { PORT = 4000 } = process.env;



app.get('/', ({ query }, res) => {
  res.send(("Hello ! " + query));
});


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});