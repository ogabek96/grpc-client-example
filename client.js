const grpc = require('grpc');
const userProtoPath = __dirname + '/user.proto';

const protoLoader = require('@grpc/proto-loader');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
  userProtoPath,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const userProto = grpc.loadPackageDefinition(packageDefinition);

const client = new userProto.User('127.0.0.1:50051',
  grpc.credentials.createInsecure());

client.getById({id: '89101824-E4E7-93BB-E9C3-DD5884573F95'}, function (error, user) {
  if (error)
    console.log('Error: ', error);
  else
    console.log(user);
});

client.getByEmail({email: 'nec@risusDonecegestas.ca'}, function (error, user) {
  if (error)
    console.log('Error: ', error);
  else
    console.log(user);
});

client.list({}, function (error, users) {
  if (error)
    console.log('Error: ', error);
  else
    console.log(users);
});
