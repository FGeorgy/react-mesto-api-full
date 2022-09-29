const mongoose = require('mongoose');
const validator = require('validator');

const linkRegExp = require('../middlewares/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        linkRegExp.test(avatar);
      },
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(email) {
        validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

module.exports = mongoose.model('User', userSchema);
