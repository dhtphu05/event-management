import User from '../models/User.js';

export class UserRepository {
  async create(dto) {
    const { username, email, password } = dto;

    const result = await User.create({
      username: username,
      email,
      password,
    });

    return {
      username,
      email,
      id: String(result._id),
    };
  }

  async getOneById(id) {
    const user = await User.findOne({
      _id: id,
    });

    if (!user) {
      throw new Error('not found');
    }

    return {
      id: String(user._id),
      username: String(user.username),
      email: String(user.email),
    };
  }

  async getAll() {
    const users = await User.find();
    if (!users) throw new Error('Not found user');
    
    return users.map(user => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email
    }));
  }

  async deleteOneById(id) {
    const deletedUser = await User.findOneAndDelete({ _id: id }).lean();
    if (!deletedUser) throw new Error('not found');
    
    return {
      id: String(deletedUser._id),
      username: deletedUser.username,
      email: deletedUser.email,
    };
  }
  async findByUsername(username) {
    const user = await User.findOne({ username });
    if (!user) return null;
    
    return {
      id: String(user._id),
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role || 'user'
    };
  }
  
  async findByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) return null;
    
    return {
      id: String(user._id),
      username: user.name,
      email: user.email,
      password: user.password,
      role: user.role || 'user'
    };
  }

}