const User = require('./User');
const Menu = require('./Menu');
const Employee = require('./Employee');

User.hasMany(Menu, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Menu.belongsTo(User, {
  foreignKey: 'user_id'
});

// User.hasMany(Employee, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Employee.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, Menu, Employee };


