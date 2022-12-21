const {check, validationResult} = require('express-validator');

exports.validateUser = [
  check('nome')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Nome não pode estar vazio.')
    .bail()
    .isLength({min: 3})
    .withMessage('O tamanho do nome deve ser de, ao menos, 3 caracteres.')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];