const hashLib = require("../utils/hash");
const jwt = require("jsonwebtoken");
const encryptLib = require("../utils/encrypt");
const { Users } = require("../models");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};

/* get users */
exports.getUsers = async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.status(200).json(listOfUsers);
};

// get user by email
exports.getUserEmail = async (req, res) => {
  const email = req.params.mail;
  const userdb = await Users.findOne({
    where: { email: email },
    include: [],
  });
  res.status(200).json(userdb);
};

// create user
exports.createUser = async (req, res) => {
  const userInfos = req.body;
  userInfos.username = "username";
  let admin = true;
  if (!userInfos.admin) {
    admin = false;
  }
  userInfos.password = hashLib.hashPwd(userInfos.password);
  const user = await Users.create({
    admin: admin,
    email: userInfos.email,
    password: userInfos.password,
    username: "utilisateur",
  });

  if (user) {
    // generate acces token
    const accessToken = generateAccessToken(u);
    const cookie = {
      email: user.email,
      accessToken: accessToken,
      admin: user.admin,
    };
    // encrypted
    console.log("user is being finded");
    const encryptedText = encryptLib.encrypt(cookie);
    res.cookie("remember", encryptedText, {
      maxAge: 3600 * 24 * 30,
    }); // 30 days)
    res.status(200).json("user created successfully");
  } else {
    res.status(400).json("An error occured while creating user ");
  }
};

// login user
exports.authenticationUser = async (req, res) => {
    const { email, password } = req.body;
    
    const hpwd = hashLib.hashPwd(password);
    const user = await Users.findOne({
        where: [{ email: email }, { password: hpwd }],
    });
    if (user) {
        // generate acces token
        const accessToken = generateAccessToken(user);
        const cookie = {
            email: email,
            accessToken: accessToken,
            admin: user.admin
        };
        // encrypted

        const encryptedText = encryptLib.encrypt(cookie);
        res.cookie("remember", encryptedText, {
            maxAge: 3600 * 24 * 30,
        }); // 30 days);
        res.status(200).json("user logged in successfully");

    } else {
        res.status(400).json("Username or password incorrect!");
    }
};

// modify user infos
exports.modifyUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const userdb = await Users.findByPk(id);
  if (userdb) {
    userdb.update(user);
    res.status(200).json("user modified successfully");
  } else {
    res.status(400).json("user not found");
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const id = req.params;
    const userToDelete = await Users.findByPk(id.id);
    try {
          await userToDelete.destroy();
          res.status(200).json("User succesfully deleted");

    } catch (error) {
          res.status(400).json("User doesn't exist.");

    }
};