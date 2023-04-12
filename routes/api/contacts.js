const express = require("express");

const { isValidId } = require("../../middlewares");

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavoriteById,
} = require("../../controllers/contacts");

const {
  addContactsValidation,
  updateContactsValidation,
  updateFavoriteValidation,
} = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContactsValidation, addContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, updateContactsValidation, updateContact);

router.patch("/:contactId/favorite", isValidId, updateFavoriteValidation, updateFavoriteById);

module.exports = router;
