import { User } from "../../models/index.js";
import { HttpError, uploadAvatar } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";
import bcrypt from "bcryptjs";

const updateUser = async (req, res) => {
  const { _id, name: oldName, email: oldEmail } = req.user;
  const { name = oldName, email, password } = req.body;

  const updatedUser = {
    name,
  };

  if (req.file) {
    updatedUser.avatar = await uploadAvatar(req, res);
  }
  if (password) {
    updatedUser.password = await bcrypt.hash(password, 10);
  }
  if (email && email !== oldEmail) {
    updatedUser.email = email;
  }

  const updateUserData = await User.findByIdAndUpdate(_id, updatedUser, {
    new: true,
    select: "name email theme avatar -_id",
  });

  if (!updateUserData) {
    throw HttpError(404);
  }

  res.json(updateUserData);
};

export default controllerWrapper(updateUser);
