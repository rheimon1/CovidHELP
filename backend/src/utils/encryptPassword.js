const bcrypt = require('bcryptjs');

module.exports = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return { password: bcrypt.hashSync(password, salt) };
}