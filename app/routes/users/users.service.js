import { User } from "./users.schema.js";

class UsersService {
    addUser(body) {
        return Promise(async (resolve, reject) => {
            try {
                const { fullName, email, role, password } = body;
                const user = new User({
                    fullName: fullName,
                    email: email,
                    role: role,
                    password: bcrypt.hashSync(password, 8),
                });
                await user.save();
                resolve({ isError: false, data: user });
            } catch (error) {
                reject({ isError: true, data: error });
            }
        })

    }
}

const usersService = new UsersService();
export { usersService }
