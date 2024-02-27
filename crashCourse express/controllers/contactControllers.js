const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const getContacts = async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
};

const getIndividualContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Contact deleted with Id ${req.params.id}` });
});

module.exports = {
  getContacts,
  getIndividualContact,
  createContact,
  updateContact,
  deleteContact,
};
