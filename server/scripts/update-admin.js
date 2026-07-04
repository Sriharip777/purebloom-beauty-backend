require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function run() {
  console.log('Connecting to:', process.env.MONGODB_URI?.slice(0, 40) + '...');
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log('Connected');

  const db = mongoose.connection.db;
  const admins = db.collection('adminusers');

  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash('Srihari@777', salt);

  const existing = await admins.findOne({ email: 'srihariharipechettis@gmail.com' });
  if (existing) {
    await admins.updateOne(
      { _id: existing._id },
      { $set: { email: 'sriharipechettis@gmail.com', password: hashed } }
    );
    console.log('Updated existing admin to new credentials');
  } else {
    const existing2 = await admins.findOne({ email: 'sriharipechettis@gmail.com' });
    if (existing2) {
      await admins.updateOne(
        { _id: existing2._id },
        { $set: { password: hashed } }
      );
      console.log('Updated password for existing admin');
    } else {
      await admins.insertOne({
        name: 'PureBloom Admin',
        email: 'sriharipechettis@gmail.com',
        password: hashed,
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Created new admin');
    }
  }

  await mongoose.disconnect();
  console.log('Done');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
