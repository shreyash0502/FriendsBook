const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename files with a timestamp
  },
});
const upload = multer({ storage });

// Set up a MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/friends-db?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a MongoDB schema and model (modify as needed)
const yourSchema = new mongoose.Schema({
  ID: String,
  friends: [String], // Array to store friend IDs
  password: String,
  photo: String,
});
const YourModel = mongoose.model('YourModel', yourSchema);

app.post('/api/submit', upload.single('photo'), async (req, res) => {
  const { ID, friendID, password } = req.body;
  const photoPath = req.file.path;

  try {
    // Find the user by ID
    let user = await YourModel.findOne({ ID });

    if (!user) {
      // If the user is not found, create a new user
      user = new YourModel({
        ID,
        friends: [friendID], // Initialize the friends array with the first friend
        password,
        photo: photoPath,
      });

      await user.save();
      console.log('New user created and friend added');
      res.status(200).json({ message: 'New user created and friend added' });
    } else {
	  // Check if friendID is not already in the user's friends array
	  if (!user.friends.includes(friendID)) {
		// Append the friendID to the user's friends array
		user.friends.push(friendID);

		// Save the updated user document
		await user.save();
		console.log('Friend added to the list');
		res.status(200).json({ message: 'Friend added to the list' });
	  } else {
		console.log('Friend is already in the list');
		res.status(200).json({ message: 'Friend is already in the list' });
	  }
	}
	
	// Find the user by ID
    user = await YourModel.findOne({ friendID });

    if (!user) {
      // If the user is not found, create a new user
      user = new YourModel({
        ID: friendID,
        friends: [ID], // Initialize the friends array with the first friend
        password,
        photo: photoPath,
      });

      await user.save();
      console.log('New user created and friend added');
    } else {
	  // Check if friendID is not already in the user's friends array
	  if (!user.friends.includes(ID)) {
		// Append the friendID to the user's friends array
		user.friends.push(ID);

		// Save the updated user document
		await user.save();
		console.log('Friend added to the list');
	  } else {
		console.log('Friend is already in the list');
	  }
	}
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/friendsnetwork', async (req, res) => {
  try {
    const users = await YourModel.find();

    const nodes = users.map(user => ({ id: user.ID }));
    const edges = [];
    users.forEach(user => {
      user.friends.forEach(friendID => {
        if (user.ID < friendID) {
          edges.push({ source: user.ID, target: friendID });
        }
      });
    });

    const networkData = { nodes, edges };
    res.status(200).json(networkData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
