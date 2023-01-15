const bcrypt = require("bcrypt");

const hash = (value) => {
  const salt = bcrypt.genSaltSync(process.env.HASH_SALT);
  const hash = bcrypt.hashSync(value, salt);

  return hash;
};

const isValidPassword = async (check, saved) => {
  try {
    const result = await bcrypt.compare(check, saved);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { hash, isValidPassword };
