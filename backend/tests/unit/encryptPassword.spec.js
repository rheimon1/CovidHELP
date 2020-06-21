const encryptPassword = require('../../src/utils/encryptPassword');

describe('Encrypt password', () => {
  it('should encrypt a password', () => {
    const password = '123456'
    const encryptedPassword = encryptPassword(password);

    expect(password).not.toBe(encryptedPassword);
  })
})