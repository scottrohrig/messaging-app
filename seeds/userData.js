const { User } = require('../models');

const userData = [
  {
    id: 1,
    username: 'mickey',
    email: 'mm@dsny.com',
    password: '1234',
    pfp_path: 'avatar-3.png',
  },
  {
    id: 2,
    username: 'donald',
    email: 'dd@dsny.com',
    password: '1234',
    pfp_path: 'avatar-4.png',
  },
  {
    id: 3,
    username: 'goofy',
    email: 'gfy@dsny.com',
    password: '1234',
    pfp_path: 'avatar-5.png',
  },
  {
    id: 4,
    username: 'pluto',
    email: 'pl@dsny.com',
    password: '1234',
    pfp_path: 'avatar-6.png',
  },
];

// TODO: [ ]: Seed data does not order correctly
const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
