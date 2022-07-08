const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { EUserType } = require("./enums");
const { getEnum } = require("../utils/common.util.js");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("swaggiffy");

/**
 * User shcema
 */
const userSchema = mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  nationalId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String
  },
  userType: {
    type: String,
    enum: getEnum(EUserType),
    required: true
},
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
userSchema.plugin(timestamps);
/**
 * generate Auth Token
 * @returns token
 */
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      names: this.names,
      address: this.address, 
      userType: this.userType,
      phoneNumber: this.phoneNumber,
      nationalId: this.nationalId,
    },
    process.env.JWT_SECRET
  );
};

/**
 * User Model
 */
const User = mongoose.model("User", userSchema);

/**
 * user dto
 */
const userDto = {
  names: "",
  email: "",
  nationalId: "",
  phoneNumber: "",
  password: "",
  address: '',
};
/**
 * register swagger
 */
registerSchema("User", userDto);

/**
 * validate input
 * @param {} data
 * @returns
 */
const validate = (data) => {
  const schema = {
    names: Joi.string().required(),
    email: Joi.string().email().required(),
    nationalId: Joi.string()
      .regex(/^\d{16}$/)
      .required(),
    phoneNumber: Joi.string()
      .regex(/^\d{10}$/)
      .required(),
    password: Joi.string().min(5).required(),
    address: Joi.string().required()
  };

  return Joi.validate(data, schema);
};

/**
 * auth dto
 */

const authDto = {
  email: "",
  password: "",
};

/**
 * register schema
 */
registerSchema("AuthDto", authDto);

/**
 * validate login
 * @param {*} data
 * @returns
 */
const validateLogin = (data) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  return Joi.validate(data, schema);
};

module.exports = {
  User,
  validate,
  validateLogin,
};
