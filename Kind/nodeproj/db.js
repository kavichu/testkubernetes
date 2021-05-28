const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_DB,
  MONGO_STATEFULSET_NAME,
  MONGO_SERVICE_NAME,
  MONGO_NAMESPACE,
  MONGO_REPLICAS_COUNT = 1
} = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

const replicas = Array.from(Array(parseInt(MONGO_REPLICAS_COUNT)).keys())
                      .map(index => `${MONGO_STATEFULSET_NAME}-${index}.${MONGO_SERVICE_NAME}.${MONGO_NAMESPACE}.svc.cluster.local`)
                      .map(hostname => `${hostname}:${MONGO_PORT}`)
                      .join(',');
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${replicas}/${MONGO_DB}`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
}).catch(function(err) {
  console.log(err);
});
