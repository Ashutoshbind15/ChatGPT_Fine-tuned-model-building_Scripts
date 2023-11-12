import User from "../models/User";

export const getUser = async (req, res) => {
  const { uid } = req.body;
  const user = await User.findById(uid);
  return res.status(200).json(user);
};

export const postUser = async (req, res) => {
  const { uid, username, email } = req.body;
  const user = await User.create({ uid, username, email });
  return res.status(200).json(user);
};

export const editUser = async (req, res) => {
  const { uid } = req.body;

  const updatedUser = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  });

  return res.status(200).json(updatedUser);
};
