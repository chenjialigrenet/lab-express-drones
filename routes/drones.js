const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((dbRes) => {
      res.render('drones/list.hbs', {
        style: ['styleDronesList.css'],
        drones: dbRes,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs', {
    style: ['styleForm.css'],
  });
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create(req.body)
    .then((createdDrone) => {
      console.log(createdDrone);
      res.redirect('/drones');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
    .then((dbRes) => {
      res.render('drones/update-form.hbs', {
        style: ['styleForm.css'],
        drone: dbRes,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/drones');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/drones');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
