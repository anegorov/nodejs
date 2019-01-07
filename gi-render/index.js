const express = require('express');
const app = express();
const Joi = require('joi');
const firebase = require("firebase");

var config = {
    apiKey: "AIzaSyAfa0kqX6nPekjj6pBjeX4QojPhoImWiXw",
    authDomain: "guidein-c7f6f.firebaseapp.com",
    databaseURL: "https://guidein-c7f6f.firebaseio.com",
    projectId: "guidein-c7f6f",
    storageBucket: "guidein-c7f6f.appspot.com",
    messagingSenderId: "630157524400"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]

app.get('/',(req,res) => {
   
    res.send('App developed for TD QA purpose. Feel free to use it if needed.');
});

app.get('/render/:link',(req,res) => {
    if(!req.params.link) res.status(404).send('Link parameter is empty.');

    var citiesRef = db.collection('pages');
    var query = citiesRef.where('link', '==', req.params.link).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          res.send('No matching documents.');
          return;
        }  
    
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data().link);
          res.send(doc.data().body);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
        res.send(err);
      });

});


///api/posts/2018/12?sortBy=name
// app.get('/api/posts/:year/:month',(req,res) => {
//     res.send(req.query);
// });

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));