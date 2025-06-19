const mongoose = require('mongoose');
const Product = require('./Product');
const Category = require('./Category');
const ProductStorage = require('./ProductStorage');
const Storage = require('./Storage');

const User = require('./User');

async function connect() {

  try{
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.model('Review', Review.schema);
    mongoose.model('Restaurant', Restaurant.schema);
    mongoose.model('User', User.schema);
  } catch(err){
    console.log("Error connecting to db");
    console.log(err);
    throw err;
  }
}

async function disconnect(){
    await mongoose.connection.close();
}


module.exports = {connect, disconnect};