import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost:27017/school';

function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {

  app.get('/api/user', (req, res) => {
    db.collection('user').find({}).toArray((err, user) => {
      res.json({ user });
    });
  });
  app.get('/api/school', (req, res) => {
    db.collection('schoolDetails').find({}).toArray((err, schools) => {
      res.json({ schools });
    });
  });
  app.get('/api/schoolArea', (req, res) => {
    db.collection('schoolAreas').find({}).toArray((err, schools) => {
      res.json({ schools });
    });
  });
  app.post('/api/user', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      console.log(req.body);
      const {firstName, lastName,admin, emailId, password, confirmPassword  } = req.body;
      db.collection('user').insert({ firstName, lastName, admin,emailId, password, confirmPassword  }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ user: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });
  app.post('/api/auth', (req, res) => {
    console.log("eaildId",req.body.emailId.emailId)
    db.collection('user').findOne({ emailId: req.body.emailId.emailId }, (err, user) => {
      res.json({ user });
    })
  });

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});
