const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductStorage = require('../models/ProductStorage');
const Storage = require('../models/Storage');

dotenv.config();
const connectDB = require('../config/db');
connect();

// Seed users
async function seedUsers() {
    const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
    const users = await Promise.all(usersData.map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
    })));

    await User.deleteMany();
    await User.insertMany(users);
    console.log('Users seeded successfully.');
}

// Seed categories
async function seedCategories() {
    const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'category.json'), 'utf-8'));
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log('Categories seeded successfully.');
}

// Seed products
async function seedProducts() {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'product.json'), 'utf-8'));
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded successfully.');
}

// Seed storage locations
async function seedStorage() {
  const storages = JSON.parse(fs.readFileSync(path.join(__dirname, 'storage.json'), 'utf-8'));
  await Storage.deleteMany();
  await Storage.insertMany(storages);
  console.log('Storages seeded successfully.');
}

// Seed product-storage relationships
async function seedProductStorage() {
  const productStorages = JSON.parse(fs.readFileSync(path.join(__dirname, 'ProductStorage.json'), 'utf-8'));
  await ProductStorage.deleteMany();
  await ProductStorage.insertMany(productStorages);
  console.log('ProductStorage seeded successfully.');
}

// main
async function main() {
  try {
    await seedUsers();
    await seedCategories();
    await seedProducts();
    await seedStorage();
    await seedProductStorage();

    console.log('All data seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

main();
