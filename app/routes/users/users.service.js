import { User } from "./users.model.js";

class UsersService {
  async addUser(body) {
    try {
      const { fullName, email, role, password } = body;
      const user = new User({
        fullName: fullName,
        email: email,
        role: role,
        password: bcrypt.hashSync(password, 8),
      });
      await user.save();
      return { isError: false, data: user };
    } catch (error) {
      return { isError: true, data: error };
    }
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
}

const usersService = new UsersService();
export { usersService };
