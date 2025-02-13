const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { HttpError } = require("../helpers");
const { handleMongooseError } = require("../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must be exist"],
    },
    email: {
      type: String,
      required: [true, "email must be exist"],
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).unknown(false);

const updateContactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
  .or("name", "email", "phone", "favorite")
  .unknown(false);

const updateFovoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addContactsValidation = (req, _, next) => {
  const { error } = addContactsSchema.validate(req.body);

  if (error) {
    const path = error.details[0].path;
    throw HttpError(400, `Missing required ${path} field`);
  }
  next();
};

const updateContactsValidation = (req, _, next) => {
  const { error } = updateContactsSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "Missing fields");
  }
  next();
};

const updateFavoriteValidation = (req, _, next) => {
  const { error } = updateFovoriteSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "Missing field favorite");
  }
  next();
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addContactsValidation,
  updateContactsValidation,
  updateFavoriteValidation,
};
