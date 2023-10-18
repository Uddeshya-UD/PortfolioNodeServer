const User = require("../models/users");
const jwt = require("jsonwebtoken");
const express = require("express"); // You need to import 'express' to access the 'res' object.

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // Duplicate error
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // Validation error
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "uddeshya secret", {
    expiresIn: maxAge,
  });
};

const login_get = (req, res, next) => {
  res.render("login");
};

const login_post = (req, res, next) => {
  res.render("newlogin");
};

const signin_get = (req, res, next) => {
  res.render("signup");
};

const signin_post = (req, res, next) => {
  const { firstname, secondname, mobile, age, gender, email, password } =
    req.body;

  let user = new User({
    firstname: firstname,
    secondname: secondname,
    mobile: mobile,
    age: age,
    gender: gender,
    email: email,
    password: password,
  });

  console.log("User : " + user);
  user
    .save()
    .then((result) => {
      const token = createToken(result._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      console.log("Added User Successfully" + result);
      res.status(201).json({ user: result._id }); // Use 'result' instead of 'user'
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

module.exports = { login_post, login_get, signin_get, signin_post };
