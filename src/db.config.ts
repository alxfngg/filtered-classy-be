import Mongoose, { ConnectOptions } from "mongoose";
// const Mongoose = require('mongoose');
require('dotenv').config()

let database: Mongoose.Connection;

export const connect = () => {

  const mongoURI = process.env.MONGO_CONNECTION_STRING;


  Mongoose.connect(mongoURI!, {
  }).then(() => {
    console.log('connected to database');
  }).catch((err) => {
    console.log('error: could not connect to db:', err);
  });

};

export const disconnect = () => {

  if (!database) {
    return;
  }

  Mongoose.disconnect();

  database.once("close", async () => {
    console.log("Diconnected  to database");
  });

};