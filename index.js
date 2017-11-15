let express = require('express');
let path = require('path');

let app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});