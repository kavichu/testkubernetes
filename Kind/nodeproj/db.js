const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

const replicas = Array.from(Array(5).keys())
                      .map(index => `mongodb-${index}.db.default.svc.cluster.local`)
                      .map(hostname => `${hostname}:${MONGO_PORT}`)
                      .join(",");
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${replicas}/${MONGO_DB}`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
}).catch(function(err) {
  console.log(err);
});
