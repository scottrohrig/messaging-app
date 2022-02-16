const { User } = require('../models');

const userData = [
  {
    id: 1,
    username: 'mickey',
    email: 'mm@dsny.com',
    password: '1234',
  },
  {
    id: 2,
    username: 'donald',
    email: 'dd@dsny.com',
    password: '1234',
  },
  {
    id: 3,
    username: 'goofy',
    email: 'gfy@dsny.com',
    password: '1234',
  },
  {
    id: 4,
    username: 'pluto',
    email: 'pl@dsny.com',
    password: '1234',
  },
];

// TODO: [ ]: Seed data does not order correctly
const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
