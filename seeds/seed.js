const sequelize = require('../config/connection');
const { User, Menu, Employee } = require('../models');

const userData = require('./userData.json');
const menuData = require('./menuData.json');
const employeeData = require('./employeeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const menu of menuData) {
    await Menu.create({
      ...menu,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();


  // for (const employee of employeeData) {
  //   await Employee.create({
  //     ...employee,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }
