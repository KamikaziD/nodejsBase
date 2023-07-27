const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  await prisma.user
    .findMany({ include: { profile: true } })
    .then(async (data) => {
      res.json({ data: data });
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send(e.message);
      await prisma.$disconnect();
      process.exit(1);
    });
};

const createUser = async (req, res) => {
  const user = req.body;
  await prisma.user
    .create({
      data: {
        email: user.email,
        name: user.name,
        profile: { create: { bio: user.bio } },
      },
    })
    .then(async (data) => {
      res.json({ data: data });
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send(e.message);
      await prisma.$disconnect();
      process.exit(1);
    });
};

const getUser = async (req, res) => {
  const userID = req.params.userID;

  await prisma.user
    .findUnique({
      where: { id: userID },
      include: { profile: true },
    })
    .then(async (data) => {
      res.json({ data: data });
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send(e.message);
      await prisma.$disconnect();
      process.exit(1);
    });
};

const updateUser = async (req, res) => {
  const userID = req.params.userID;
  const data = req.body;

  await prisma.user
    .update({ where: { id: userID }, data: data })
    .then(async (data) => {
      res.json({ data: data });
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send(e.message);
      await prisma.$disconnect();
      process.exit(1);
    });
};

const deleteUser = async (req, res) => {
  const userID = req.params.userID;

  await prisma.user
    .delete({ where: { id: userID }, include: { profile: true } })
    .then(async (data) => {
      res.json({ data: data });
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.send(e.message);
      await prisma.$disconnect();
      process.exit(1);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
