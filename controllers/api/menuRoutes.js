const router = require('express').Router();
const { Menu } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newMenu = await Menu.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMenu);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const menuData = await Menu.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!menuData) {
      res.status(404).json({ message: 'No menu found with this id!' });
      return;
    }

    res.status(200).json(menuData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
