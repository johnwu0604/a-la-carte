/**
 * RestaurantController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  result: function(req, res, next) {

    var yelp = require('node-yelp');
    var google = require('google_directions');

    var yelp_client = yelp.createClient({
      oauth: {
        "consumer_key": 'L6yXbSQ83qgyB0tWsxxWGA',
        "consumer_secret": '2Ic9J9Vupk4xRNArMtuyEKxOjDg',
        "token": 'DJwWQzYZgxa7qaRE45qyAvlzWVtKqaDn',
        "token_secret": 'J4y5O5xKO70JLcwmH4gMuYhJisc',
      }
    });

    var google_params = {
      origin: req.param('location1'),
      destination: req.param('location2'),
      mode: "driving",
      key: "AIzaSyCriPNqT-ALE6UlXUvhW8xeovlCBvXwmvE",
    };

    google.getDirections(google_params, function (err, data) {
      if (err) return next();
      var routes = data.routes[0];
      res.view({
        routes:routes
      });
    });

    // yelp_client.search({
    //   term: req.param('term'),
    //   location: req.param('location1')
    // }).then(function (data) {
    //   var restaurants = data.businesses;
    //   res.view({
    //     restaurants: restaurants
    //   });
    // });

  }

};

