const router = require('express').Router();
const { User, Message } = require('../../models');

// GET ROUTES
// GET all users
router.get('/', async (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET one user by id
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Message,
        attributes: { exclude: ['password'] },
      },
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ISSUE: this route overwrites the CREATE new user route...c
// FIX: change this to a get route by :email from the params (eg ?email...)
// // GET user by email as recipient when CREATE new conversation
/* router.get('/:email', async (req, res) => {
  try {
    const recipient = await User.findOne({
      where: {
        email: req.body.email,
        attributes: { include: ['email', 'id'] },
      },
    });

    res.status(200).json(recipient);
  } catch (err) {
    res.json(err);
  }
});
*/

// POST ROUTES
// CREATE new user on signup
router.post('/', async (req, res) => {
  // validate req.body has all required user fields
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        res.json({ user, message: 'Your are logged in' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login
router.post('/login', async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      const matchPw = user.checkPassword(req.body.password);
      if (!matchPw) {
        res.status(400).json({ message: 'Password is not valid' });
        return;
      }
      req.session.save(() => {
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.loggedIn = true;

        console.log('\n\nLogged in...');
        res.status(200).json({ message: 'You are now logged in' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE password
router.put('/:id', async (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE user

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
