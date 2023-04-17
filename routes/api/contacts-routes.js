const express = require("express");

const { isValidId, authenficate } = require("../../middlewares");

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavoriteById,
} = require("../../controllers/contacts-controllers");

const {
  addContactsValidation,
  updateContactsValidation,
  updateFavoriteValidation,
} = require("../../models/contact");

const router = express.Router();

router.get("/", authenficate, getAllContacts);

router.get("/:contactId", authenficate, isValidId, getContactById);

router.post("/", authenficate, addContactsValidation, addContact);

router.delete("/:contactId", authenficate, isValidId, deleteContact);

router.put("/:contactId", authenficate, isValidId, updateContactsValidation, updateContact);

router.patch(
  "/:contactId/favorite",
  authenficate,
  isValidId,
  updateFavoriteValidation,
  updateFavoriteById
);

module.exports = router;
