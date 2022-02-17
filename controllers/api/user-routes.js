const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  User.findAll({})
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET user by id
router.get('/:id', (req, res) => {
  User.findAll({
    where: { id: req.params.id },
    attributes: { exclude: ['password'] },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE new user / SIGNUP
router.post('/', async (req, res) => {
  // validate req.body has all required user fields
  if (!req.body.email || !req.body.username || !req.body.password) {
    res.status(404).json({ message: 'User missing required fields' });
    return;
  }

  try {
    const { email, username, password } = req.body;

    const newUser = await User.create(
      {
        email,
        username,
        password,
      },
      {
        returning: true,
      }
    );

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      res.status(400).json({ message: 'No user found' });
      return;
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      res.status(400).json({ message: `Password Valid: ${match}` });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;

      console.log('\n\nLogged in...');
      res.status(200).json({ message: 'You are now logged in' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
router.put('/', async (req, res) => {
  // TODO:
  // [ ]: validate session, get user_id from session
  // [ ]:  respond with 400 status "you must be logged in to change your password"
  try {
    const updatedUser = await User.update(req.body, {
      individualHooks: true,
      where: { email: req.body.email },
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: err });
  }
});

// DELETE user

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
