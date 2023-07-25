const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getClubs = async (req, res) => {
  await prisma.club
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

const createClub = async (req, res) => {
  const club = req.body;
  await prisma.club
    .create({
      data: {
        name: club.name,
        address: club.address,
        telephone: club.telephone,
        email: club.email,
        location: {
          create: {
            location: {
              latitude: club.location.latitude,
              longitude: club.location.longitude,
            },
          },
        },
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

const getClub = async (req, res) => {
  const clubID = req.params.clubID;

  await prisma.club
    .findUnique({ where: { id: parseInt(clubID) } })
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

const updateClub = async (req, res) => {
  const clubID = req.params.clubID;
  const data = req.body;

  await prisma.club
    .update({ where: { id: parseInt(clubID) }, data: data })
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

const deleteClub = async (req, res) => {
  const clubID = req.params.clubID;

  await prisma.club
    .delete({ where: { id: parseInt(clubID) } })
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
  getClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub,
};
