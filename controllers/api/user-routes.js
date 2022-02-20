const router = require('express').Router();
const { User, Message } = require('../../models');

// GET ROUTES
// GET all users
router.get('/', async (req, res) => {
  User.findAll({})
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
router.get('/:email', async (req, res) => {
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

// POST ROUTES
// CREATE new user on signup
router.post('/signup', async (req, res) => {
  //validate req.body has all required user fields
  if (!req.body.email || !req.body.username || !req.body.password) {
    res.status(404).json({ message: 'User missing required fields' });
    return;
  }

  try{
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
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'No user found' });

    const matchPw = await bcrypt.compare(password, user.password);

    if (!matchPw) return res.status(400).json({ message: `Password is not Valid.` });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.email = user.email;
      req.session.loggedIn = true;

      console.log('\n\nLogged in...');
      res.status(200).json({ message: 'You are now logged in' });
    });

    user.password = undefined;

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wtong');
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
