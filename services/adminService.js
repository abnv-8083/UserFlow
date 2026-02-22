const Admin = require('../models/adminModel');
const User = require('../models/userModel');

module.exports = {

  getAdminLogin: (res, msg, icon) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('admin/admin_login', { msg, icon })
  },

  getAdminDashboard: async (res, msg, icon, search, page, limit) => {
    try {
      const result = await module.exports.getUsers(search, page, limit);

      if (result.status === 'success') {
        const { currUser, totalPages, totalUsers } = result.data;
        res.render('admin/admin_dashboard', {
          msg,
          icon,
          currUser,
          page,
          totalPages,
          limit,
          totalUsers,
          search
        });
      } else {
        res.redirect('/admin/dashboard?msg=Session Error&icon=error');
      }
    } catch (error) {
      console.log(error)
      res.redirect('/admin/dashboard?msg=Session Error&icon=error')
    }
  },

  adminLogout: (req,res) => {
    req.session.destroy((error)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/admin/login')
        }
    })
  },

  loginAdmin: async (email, password) => {
    try {
      const checkAdmin = await Admin.findOne({ email });
      if (checkAdmin) {
        if (password === checkAdmin.password) {
          return { status: 'success', msg: 'Successfully Login as Admin', adminId: checkAdmin._id };
        } else {
          return { status: 'error', msg: 'Invalid Password' };
        }
      } else {
        return { status: 'error', msg: 'No Admin Found' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },

  getUsers: async (search, page, limit) => {
    try {
      const skip = (page - 1) * limit;
      let query = {};
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        };
      }
      const totalUsers = await User.countDocuments(query);
      const totalPages = Math.ceil(totalUsers / limit);
      const currUser = await User.find(query).skip(skip).limit(limit);
      return { status: 'success', data: { currUser, totalPages, totalUsers } };
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },

  blockUser: async (userId) => {
    try {
      const userExist = await User.findById({ _id: userId });
      if (userExist && userExist.status === 1) {
        userExist.status = 0;
        await userExist.save();
        return { status: 'success', msg: 'User Successfully Blocked' };
      } else {
        return { status: 'error', msg: 'Invalid User' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },

  unblockUser: async (userId) => {
    try {
      const userExist = await User.findById({ _id: userId });
      if (userExist && userExist.status === 0) {
        userExist.status = 1;
        await userExist.save();
        return { status: 'success', msg: 'User Successfully Unblocked' };
      } else {
        return { status: 'error', msg: 'Invalid User' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },

  deleteUser: async (userId) => {
    try {
      const delUser = await User.findByIdAndDelete(userId);
      if (delUser) {
        return { status: 'success', msg: 'User Deleted Successfully' };
      } else {
        return { status: 'error', msg: 'Invalid User' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },

  editUser: async (userId, userData) => {
    try {
      const { name, email } = userData;
      const editUser = await User.findByIdAndUpdate({ _id: userId }, { $set: { name: name, email: email } });
      if (editUser) {
        await editUser.save();
        return { status: 'success', msg: 'User Edit Successfully' };
      } else {
        return { status: 'error', msg: 'Invalid User' };
      }
    } catch (error){
      console.log(error);
      return { status: 'error', msg: 'Server Error' };
    }
  },
};
