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

  app.post('/api/user', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      console.log(req.body);
      const {firstName, lastName, emailId, password, confirmPassword  } = req.body;
      db.collection('user').insert({ firstName, lastName, emailId, password, confirmPassword  }, (err, result) => {
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

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});