const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');  // Đã sửa thành require('mongoose')
const routes = require('./routes');
 const cors = require('cors'); // bao mat neu truy cap cac egmail ! nhau 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json ())
app.use(cookieParser ())
routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log('Da ket noi voi MongoDB');
  })
  .catch((err) => {
    console.log( err);
  });
app.listen(port, () => {
  console.log('Dang chay cong:', + port);
});
