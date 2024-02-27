const express = require("express");
const {
  getContacts,
  getIndividualContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const router = express.Router();
// application.get("/detail",middleware,controller)
router.route("/").get(getContacts).post(createContact);
router
  .route("/:id")
  .get(getIndividualContact)
  .put(updateContact)
  .delete(deleteContact);
module.exports = router;
