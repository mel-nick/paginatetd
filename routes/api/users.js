const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../dbmodels/User');

//@route POST api/users
//@desc Register user
//@ccess public
router.post(
  '/',
  [
    check('first_name', 'First Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { last_name, first_name, email } = req.body;
    try {
      //check if the user exists
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }
      const newUser = new User({
        first_name,
        last_name,
        email,
      });
      const addUser = await newUser.save();
      res.json(addUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route GET api/users
//@desc GET all users
//@ccess public

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    //@ get all users from DB to be paginated
    const users = await User.find({})
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    //@ get total documents count

    const count = await User.countDocuments();
    let pagesTotal = Math.ceil(count / limit);

    //@ response with prev/next links, users, total pages, and current page
    res.json({
      prev:
        page > 1
          ? `${req.baseUrl}?page=${JSON.parse(page) - 1}&limit=${limit}`
          : null,
      next:
        page > 0 && page < pagesTotal
          ? `${req.baseUrl}?page=${JSON.parse(page) + 1}&limit=${limit}`
          : null,
      currentPage: JSON.parse(page),
      totalPages: pagesTotal,
      users,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
