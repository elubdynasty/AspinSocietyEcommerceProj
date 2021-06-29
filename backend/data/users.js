const bcrypt = require('bcryptjs')

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },

  {
    name: "John Doe",
    email: "jd@example.com",
    password: bcrypt.hashSync("123456", 10)
  },

  {
    name: "Norah Jones",
    email: "nj@example.com",
    password: bcrypt.hashSync("123456", 10)
  },
];

module.exports = users;
