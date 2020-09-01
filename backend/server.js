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
  app.get('/api/Institute', (req, res) => {
    db.collection('InstituteDetails').find({}).toArray((err, Institute) => {
      res.json({ Institute });
    });
  });
  app.get('/api/schoolArea', (req, res) => {
    db.collection('schoolAreas').find({}).toArray((err, schoolArea) => {
      res.json({ schoolArea});
    });
  });
  app.get('/api/InstituteArea', (req, res) => {
    db.collection('InstituteArea').find({}).toArray((err, InstituteArea) => {
      res.json({ InstituteArea});
    });
  });
  app.post('/api/saveschool', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      db.collection('schoolDetails').insert(req.body, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ schools: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });
  app.post('/api/updateschoolArea', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      db.collection('schoolAreas').insert(req.body, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ schoolArea: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });
  
  

  app.get('/api/school/:_id', (req, res) => {
    db.collection('schoolDetails').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
      res.json({ schools });
    })
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
  
  app.put('/api/updateschool/:_id', (req, res) => {
    console.log("server",req)

    const { errors, isValid } = validate(req.body);
    if (isValid) {
      db.collection('schoolDetails').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: req.body},
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }
          if(req.body.Title === "" || req.body.area.name === "" || req.body.NoInStock === "" || req.body.count === "") {res.status(400).json({errors:"invalid"})}
          res.json({ schools: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });




  
  app.delete('/api/schools/:_id', (req, res) => {
    db.collection('schoolDetails').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }
      res.json({});
    })
    console.log("res in sever",res)
  });

  app.post('/api/auth', (req, res) => {
    console.log("eaildId",req.body.emailId.emailId)
    db.collection('user').findOne({ emailId: req.body.emailId.emailId }, (err, user) => {
      res.json({ user });
    })
  });

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});
