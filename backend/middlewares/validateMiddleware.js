const { body, validationResult } = require("express-validator");

const userValidationRules = [
  body("name")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("address")
    .isLength({ max: 400 })
    .withMessage("Address must be under 400 characters"),
  body("password")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage("Password must be 8-16 chars, 1 uppercase & 1 special char"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { userValidationRules, validate };
