const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  db: {
    native_parser: true,
    readPreference: 'primaryPreferred'
  },
  useUnifiedTopology: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
}).catch(function(err) {
  console.log(err);
});
