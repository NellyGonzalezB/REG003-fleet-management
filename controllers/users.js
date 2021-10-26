// const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
 getUsers: async (req, res) => {
   try{
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,

      }
    });

    res.json(users);
  
}
catch(error){
  console.log(error);
}
  },



  postUser: async (req, res) => {
    const { name, email, password } = req.body;
    try{
    const userExists = await prisma.user.findUnique({
      where: {
        name

      },
      select: {
        name: true,
        email: true,
        password: true,

      }
    })

    if (userExists) {
      return res.status(400).json({
        msg: "user already exists"
      })
    }

    let newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,

      }
    });

    res.json(newUser)
  }
  catch(error){
    console.log(error);
  }
  },


  // Eliminar usuario
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteUser = await prisma.user.delete({
        where: {
          id: parseInt(id)
        },
      })

     res.send("user eliminado");

    } catch (err) {
      return next(err);
    }

  },

  // modificar usuario
  putUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {name, email,password}= req.body;
      console.log(req);
      const updateUser = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name:name||undefined,
      email:email||undefined,
      password:password||undefined,
    },
  })
  res.json(updateUser);
  }
  catch (err) {
    return next(err);
  }
},

};