const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // проверяем есть ли такой email в базе
  if (user) {
    throw HttpError(409, " Email alredy in use"); // кастомный message вместо стндартного
  }

  const hashPassword = await bcrypt.hash(password, 10); // хешируем пароль перед записью

  const result = await User.create({ ...req.body, password: hashPassword }); // записываем нового пользователя в базу
  // (в поле password сохраняем хешированный пароль ), в ответ получаем name, email, password, id

  // на фронтэнд возвращаем name, email
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
