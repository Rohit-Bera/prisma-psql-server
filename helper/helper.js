const prisma = require("../db/db.config");

// check if not exists then add!
const checkUserExists = async ({ email, password }) => {
  const checkUser = await prisma.users.findFirst({
    where: {
      email: email,
      password: password,
    },
  });

  console.log("checkUser: ", checkUser);
  if (checkUser) {
    return { error: "user already exists!" };
  }
};

// check if data updateable
const ifUserExists = async ({ id }) => {
  const ifExists = await prisma.users.findFirst({
    where: { id: id },
  });

  if (!ifExists) {
    return { error: "user doesn't exists!" };
  }
};

module.exports = { checkUserExists, ifUserExists };
