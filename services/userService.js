const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {

  getUserLogin: (res, msg, icon) => {
    res.render('user/login', { msg, icon });
  },

  getUserRegister: (res, msg, icon) => {
    res.render('user/register', { msg, icon });
  },

  getHomePage: (res, msg, icon, name) => {
    res.render('user/home', { msg, icon, name });
  },

  userLogout: (req,res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error)
      } else {
        res.redirect('/')
      }
    })
  },

  getviews:(res) => {
    res.send("Review Started")
  },

  getNotFound: (res) => {
    res.render('user/404')
  },

  registerUser: async (userData) => {
    try {
      const { name, email, password } = userData;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return { status: 'error', msg: 'User Already Exists' };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: name,
        email: email,
        password: hashPassword,
        status: 1,
      });
      await user.save();
      return { status: 'success', msg: 'User Created Successfully' };
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },

  loginUser: async (email, password) => {
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        const checkPass = await bcrypt.compare(password, checkUser.password);
        if (checkPass) {
          if (checkUser.status === 1) {
            return { status: 'success', msg: 'Successfully Login', name: checkUser.name, userId: checkUser._id };
          } else {
            return { status: 'error', msg: 'Sorry Account is Blocked' };
          }
        } else {
          return { status: 'error', msg: 'Incorrect Password' };
        }
      } else {
        return { status: 'error', msg: 'User Not Exist' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },
};
