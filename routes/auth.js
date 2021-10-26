const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const { PrismaClient } = require('@prisma/client');
const prisma= new PrismaClient();
const { secret } = config;

module.exports = (app, nextMain) => {
  app.post('/auth', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(400);
      }
      const findUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log(findUser);
      if (findUser === null) {
        return next(404);
      }
     
        const token = jwt.sign({ uid: findUser.id, name: findUser.name, email: findUser.email }, secret);
        res.send({ token });
      
    } catch (error) {
      next(error);
    }
  });

  return nextMain();
};