import 'babel-polyfill';
import {resolvers,typeDefs} from './db/oracle';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import graphqlHTTP from 'express-graphql';
//var {resolvers} = require('./db/oracle');
//var {typeDefs} = require('./db/oracle');


const schema = makeExecutableSchema({typeDefs, resolvers});

//var root = { hello: () => {return resolvers} };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //rootValue: root,
  graphiql: true,
}));
app.listen(4001, () => console.log('Now browse to localhost:4000/graphql'));
