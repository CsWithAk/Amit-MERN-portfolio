/**
 * Generate a bcrypt hash for the admin password.
 * Usage: npm run hash-password -- "YourStrongPassword"
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2] || process.env.TMP_ADMIN_PASSWORD;
if (!password) {
  console.error('Usage: npm run hash-password -- "your_password"');
  process.exit(1);
}

bcrypt.hash(password, 10).then((hash) => {
  console.log('\nADMIN_PASSWORD_HASH=' + hash.replace(/\$/g, '$$') + '\n');
  console.log('Copy the line above into server/.env');
});
