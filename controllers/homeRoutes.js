const router = require('express').Router();
const { Menu, User, Employee } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const menuData = await Menu.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const menus = menuData.map((menu) => menu.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      menus, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/menu/:id', async (req, res) => {
  try {
    const menuData = await Menu.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const menu = menuData.get({ plain: true });

    res.render('menu', {
      ...menu,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/menuAdmin', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Menu }],
    });

    const user = userData.get({ plain: true });

    res.render('menuAdmin', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/menuAdmin');
    return;
  }

  res.render('login');
});

module.exports = router;
