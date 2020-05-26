import bcrypt from 'bcryptjs';
import hashPassword from '../../../src/helpers/hashPwd';

describe('Hashing the password', () => {
  it('Should hash a given password', async (done) => {
    const password = 'AnyPassword';
    const hashedPassword = await hashPassword(password);
    const comparePwd = await bcrypt.compare(password, hashedPassword);

    expect(comparePwd).toBeTruthy();
    done();
  });
});
