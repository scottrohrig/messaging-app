const { User } = require('../models');

const userData = [
  {
    username: 'samsmith',
    email: 'smth@ss.co',
    password: '1234',
  },
  {
    username: 'janegoodall',
    email: 'jg@goodall.org',
    password: '1234',
  },
  {
    username: 'jazzy-jiggles',
    email: 'jeff.goldblum@jg.com',
    password: '1234',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
