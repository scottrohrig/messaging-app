const { User } = require('../models');

const userData = [
  {
    username: 'mickey',
    email: 'mm@dsny.com',
    password: '1234',
  },
  {
    username: 'donald',
    email: 'dd@dsny.com',
    password: '1234',
  },
  {
    username: 'goofy',
    email: 'gfy@dsny.com',
    password: '1234',
  },
  {
    username: 'pluto',
    email: 'pl@dsny.com',
    password: '1234',
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
