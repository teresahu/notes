var express = require('express');
var router = express.Router();
var Note = require('../models/note');

// var notes = [
//   { _id: 0, title: 'Groceries', completed: false },
//   { _id: 1, title: 'Learn Mongoose', completed: true }
// ];

// INDEX
router.get('/', function(req, res) {
  Note.find({}, function(err, notes) {
    res.render('notes/index', { notes: notes });
  });
});

// NEW
router.get('/new', function(req, res) {
  var note = {
    title: '',
    content: ''
  };
  res.render('notes/new', { note: note });
});

// SHOW
router.get('/:id', function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    res.render('notes/edit', { note: note });
  });
});


// CREATE
router.post('/', function(req, res) {
  var note = {
    title: req.body.title,
    content: req.body.content
  };
  Note.create(note).then(function(saved) {
    res.redirect('/');
  });
});

// EDIT
router.get('/:id/edit', function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    res.render('notes/edit', { note: note });
  });
});

// UPDATE
router.put('/:id', function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    if (err) console.log('ERROR:', err); //app will hang here
    else if (!note) {
      return next(new Error('Could not find note'));//generic error page back
    }
    else {
      note.title = req.body.title;
      note.content = req.body.content || false;
      note.save(function(err) {
        if (err) res.send('ERROR', err); //error string back
        else console.log('UPDATED: '+ JSON.stringify(note));
        res.redirect('/');
      });
    }
  });
});

// DESTROY
router.delete('/:id', function(req, res) {
  Note.findByIdAndRemove(req.params.id, function(err, note) {
    res.redirect('/');
  });
});

module.exports = router;
