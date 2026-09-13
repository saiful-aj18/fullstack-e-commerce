import User from "../models/User.js";

const getProfile = async (
  req,
  res,
  next
) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      phone,
      address,
      avatar
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (address !== undefined) {
      user.address = address;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProfile,
  updateProfile
};