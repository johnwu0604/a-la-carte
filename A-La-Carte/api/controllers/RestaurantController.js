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
    var polyline = require('polyline');

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

    function containsObject(obj, list) {
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }

      return false;
    }

    var points = [];

    var restaurants = [];

    google.getDirections(google_params, function (err, data) {
      if (err) return next();

      var route = data.routes[0];
      var encodedPoints = route.overview_polyline.points;
      points = polyline.decode(encodedPoints);

    });

    setTimeout(function() {
      for (i = 0; i < points.length;) {
        yelp_client.search({
          term: req.param('term'),
          ll: points[i][0] + "," + points[i][1],
          radius_filter: "10000"
        }).then(function (data) {
          var results = data.businesses;
          results.forEach(function(restaurant) {
            if (restaurant.rating > 3) {
              if (!containsObject(restaurant, restaurants)) {
                restaurants.push(restaurant);
              }
            }
          });
        });
        //only search every 10 coordinates
        i += 10;
      }

      yelp_client.search({
        term: req.param('term'),
        ll: points[points.length-1][0] + "," + points[points.length-1][1],
        radius_filter: "10000"
      }).then(function (data) {
        var results = data.businesses;
        results.forEach(function(restaurant) {
          if (restaurant.rating > 3) {
            if (!containsObject(restaurant, restaurants)) {
              restaurants.push(restaurant);
            }
          }
        });
        res.view({
          restaurants: restaurants
        });
      });

    }, 10000);

  }

};

