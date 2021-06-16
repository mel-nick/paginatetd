const express = require('express');
const router = express.Router();

const User = require('../../dbmodels/User');

//@route GET api/users/search
//@desc GET all users matches search criteria
//@ccess public
router.get('/users', async (req, res) => {
  const { page = 1, limit = 10, q } = req.query;
  try {
    //@ search for users and get response to be paginated

    const users = await User.find({
      $or: [
        { first_name: { $regex: q, $options: 'i' } },
        { last_name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ],
    })
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    //@ get count of documents have been found

    const count = await User.countDocuments({
      $or: [
        { first_name: { $regex: q, $options: 'i' } },
        { last_name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ],
    });
    let pagesTotal = Math.ceil(count / limit);

    //@ return response with prev/next links, users, total pages, and current page

    res.json({
      prev:
        page > 1
          ? `${req.baseUrl}/users?q=${q}&page=${
              JSON.parse(page) - 1
            }&limit=${limit}`
          : null,
      next:
        page > 0 && page < pagesTotal
          ? `${req.baseUrl}/users?q=${q}&page=${
              JSON.parse(page) + 1
            }&limit=${limit}`
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
