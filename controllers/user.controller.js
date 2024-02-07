const prisma = require("../db/db.config");
const { checkUserExists, ifUserExists } = require("../helper/helper");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await checkUserExists({ email, password });
  if (userExists) {
    res.status(400).json({ error: userExists.error });
    return;
  }
  try {
    const createUser = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    console.log("createUser: ", createUser);

    res.status(200).json({ success: "inserted successfull!" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  const ifExists = await ifUserExists({ id: Number(req.params.id) });

  if (ifExists) {
    res.status(400).json({ error: ifExists.error });
    return;
  }

  try {
    const updateUser = await prisma.users.update({
      where: { id: Number(req.params.id) },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    res
      .status(200)
      .json({ success: "data updated successfull!", updated: updateUser });

    console.log("updateUser: ", updateUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    console.log("users: ", users);
    res.status(200).json({ allUsers: users });
  } catch (err) {
    console.log("err: ", err);
    res.status(400).json({ error: err });
  }
};

const deleteUser = async (req, res) => {
  const ifExists = await ifUserExists({ id: Number(req.params.id) });

  if (ifExists) {
    res.status(400).json({ error: ifExists.error });
    return;
  }

  try {
    const updateUser = await prisma.users.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json({ success: "data deleted successfull!" });

    console.log("updateUser: ", updateUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const searchUser = async (req, res) => {
  try {
    console.log("req.params.name: ", req.params.name);
    const searchedUser = await prisma.users.findMany({
      where: {
        name: { startsWith: req.params.name },
      },
    });

    console.log("searchedUser: ", searchedUser);
    res.status(200).json({ searchedUser });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { addUser, updateUser, getUsers, deleteUser, searchUser };
