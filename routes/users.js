const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// const User = require('../model/user-model');
// const {
//   requireAuth,
//   requireAdmin,
// } = require('../middleware/auth');

const {
  getUsers, postUser, deleteUser,putUser} = require('../controllers/users');

const initAdminUser = (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    return next();
  }

  const adminUser = {
    email: adminEmail,
    password: bcrypt.hashSync(adminPassword, 10),
    roles: { admin: true },
  };

  // TODO: crear usuaria admin
  const user = prisma.user.findUnique({
    where:{email: adminEmail}  });
  if (!user) {
    // TODO: crear usuaria admin
    const newAdminUser = new User(adminUser);
    newAdminUser.save();
  }
  next();
};


module.exports = (app, next) => {
  
  app.get('/users', getUsers);

  
  // app.get('/users/:uid', requireAuth, (req, resp) => {
  // });

  
  app.post('/users',postUser );

  
  app.put('/users/:id', putUser) ;

  
  app.delete('/users/:id', deleteUser); 

  initAdminUser(app, next);
};