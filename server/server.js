const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
app.set('port', PORT);

const swaggerSpec = swaggerJSDoc(options);
app.use(cors({
  origin: true,
  credentials: true
}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));a
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(__dirname + '/../frontend/build/static'));
app.use('/api', require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
})
app.listen(app.get('port'), function () {
  console.log('Example app listening on' + app.get('port') + 'port');
})