const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) errors.push(...error.details.map(d => d.message));
    }
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
};

module.exports = { validate };
