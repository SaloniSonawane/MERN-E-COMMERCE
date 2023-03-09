import bcrypt from "bcrypt";
const users = [
  {
    name: "Admin user",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Saloni Sonawane",
    email: "saloni@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John Deo",
    email: "johndeo@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
