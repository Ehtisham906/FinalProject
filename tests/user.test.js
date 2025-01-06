const { registerUser, loginUser } = require('../src/services/userService');
const User = require('../src/models/userModel');
jest.mock('../src/models/userModel');

describe('User Service', () => {
  it('should register a new user', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: '1',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword'
    });

    const newUser = await registerUser({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(newUser.email).toBe('test@example.com');
  });

  it('should fail to register a user with existing email', async () => {
    User.findOne.mockResolvedValue(true);

    await expect(registerUser({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    })).rejects.toThrow('User already exists');
  });
});
