const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});
// TODO: [ ]: conversation/:id view
// router.get('/conversation/:id', (req, res) => {
//   res.render('conversation');
// });

module.exports = router;
