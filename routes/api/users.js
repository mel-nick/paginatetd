const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../dbmodels/User');

//@route POST api/users
//@desc Register user
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email } = req.body;
    try {
      //see if the user exists
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

      user = new User({
        name,
        email,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route GET api/users
//@desc GET all user
//@ccess public

router.get('/', async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;
  let prevPage = page - 1;
  let nexPage = page + 1;
  try {
    // execute query with page and limit values
    const users = await User.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Users collection
    const count = await User.countDocuments();
    let pagesTotal = Math.ceil(count / limit);
    // return response with prev/next links, users, total pages, and current page
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
