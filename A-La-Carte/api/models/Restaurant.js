/**
 * Restaurant.js
 *
 * @description :: This represents the entities of a restaurant object
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id:{
      type:"string",
      required:true,
      minLength: 1
    },
    name:{
      type:"string",
      required:true,
      minLength: 1
    },
    latitude:{
      type:"string",
      required:false,
      minLength: 1
    },
    longitude:{
      type:"string",
      required:false,
      minLength: 1
    },
    rating:{
      type:"string",
      required:false,
      minLength: 1
    },
    cuisine:{
      type:"array",
      required:false,
      minLength: 1
    },
    address:{
      type:"string",
      required:false,
      minLength: 1
    },
    city:{
      type:"string",
      required:false,
      minLength: 1
    },
    province:{
      type:"string",
      required:false,
      minLength: 1
    },
    image:{
      type:"string",
      required:false,
      minLength: 1
    },
    url:{
      type:"string",
      required:false,
      minLength: 1
    },
    number:{
      type:"string",
      required:false,
      minLength: 1
    }

  }
};

