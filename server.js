var express = require('express');
var cors = require('cors');
require('dotenv').config()

const bodyParser = require('body-parser')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Create User post API
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({ name: file.originalname, type: file.mimetype, size: file.size })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
