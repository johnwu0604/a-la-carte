/**
 * RestaurantController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  result: function(req, res, next) {

    var yelp = require("node-yelp");

    var client = yelp.createClient({
      oauth: {
        "consumer_key": 'L6yXbSQ83qgyB0tWsxxWGA',
        "consumer_secret": '2Ic9J9Vupk4xRNArMtuyEKxOjDg',
        "token": 'DJwWQzYZgxa7qaRE45qyAvlzWVtKqaDn',
        "token_secret": 'J4y5O5xKO70JLcwmH4gMuYhJisc',
      }
    });

    client.search({
      term: req.param('term'),
      location: req.param('location')
    }).then(function (data) {
      var restaurants = data.businesses;
      res.view({
        restaurants: restaurants
      });
    });

  }

};

