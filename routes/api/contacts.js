const express = require("express");

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

router.get("/:contactId", getContactById);

router.post("/", addContactsValidation, addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContactsValidation, updateContact);

router.patch("/:contactId/favorite", updateFavoriteValidation, updateFavoriteById);

module.exports = router;
