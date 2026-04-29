import bcrypt from 'bcrypt';

const saltRounds = 10;  

const password = '';


// Hash the password
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});

