// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  if (!Array.isArray(numbers)) { return 0; }

  var filteredNumbers = [];
  _.each(numbers, function(number, index, collection) {
    if (number % 5 === 0) {
      filteredNumbers.push(number);
    }
  });

  return filteredNumbers.length;
};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  if (typeof tweets !== 'object') { return []; }

  var filteredTweets = [];

  _.each(tweets, function(item, index, collection) {
    if (item['user'] === user) {
      filteredTweets.push(item);
    }
  });

  return filteredTweets;

  // Impementation using built-in filter function
  // return tweets.filter(function(item) {
  //   return item['user'] === user;
  // });
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  return _.filter(fruits, function(item, index, collection) {
    return item === targetFruit;
  });
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  return _.filter(fruits, function(item, index, collection) {
    return item.startsWith(letter);
  });
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  return _.filter(desserts, function(item, index, collection) {
    return item['type'] === 'cookie';
  });
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  return _.filter(tweets, function(item, index, collection) {
    return item['user'] === user;
  });
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  _.map(fruits, function(item) {
    return item.toUpperCase();
  });
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  var filteredDesserts = _.filter(desserts, function(item) {
    return !(item['ingredients'].includes('flour'));
  });

  _.map(filteredDesserts, function(item) {
    item['glutenFree'] = true;
    return item;
  });

  return filteredDesserts;
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  var predicate = _.map(tweets, function(item) {
    return item['message'];
  });

  return predicate;
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  _.map(groceries, function(item) {
    var price = parseFloat(item['price'].slice(1));
    // round to 2 decimal places using code below or (price * (1 - coupon)).toFixed(2)
    var salePrice = Math.round(price * (1 - coupon) * 100) / 100;
    item['salePrice'] = '$' + salePrice;

    return item;
  });

  return groceries;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  return _.reduce(products, function(sum, item) {
    var price = parseFloat(item['price'].slice(1));
    sum += price;
    return sum;
  }, 0);
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  return _.reduce(desserts, function(types, item) {
    var type = item['type'];
    if (type in types) {
      types[type] += 1;
    } else {
      types[type] = 1;
    }

    return types;
  }, {});
};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  return _.reduce(tweets, function(tweetCountPerUser, item) {
    var userName = item['user'];
    if (!(userName in tweetCountPerUser)) {
      var countMessages = (_.filter(tweets, function(item) {
        return item['user'] === userName;
      })).length;
      tweetCountPerUser[userName] = countMessages;
    }

    return tweetCountPerUser;
  }, {});
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  return _.reduce(movies, function(filteredMovies, item) {
    var releaseYear = item['releaseYear'];
    if (releaseYear >= 1990 && releaseYear <= 2000) {
      filteredMovies.push(item.title);
    }

    return filteredMovies;
  }, []);
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  return _.reduce(movies, function(isMovieExist, item) {
    if (isMovieExist === false) {
      isMovieExist = (item.runtime < timeLimit);
    }
    
    return isMovieExist;
  }, false);
};
