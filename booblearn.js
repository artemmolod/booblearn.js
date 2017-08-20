"use strict";
var Error_ = (error_msg) => {
  console.error(error_msg);
}
var is_array = function (...rest) {
  var check = true; 
  for (var i = 0; i < rest.length; i++) {
    if (!(rest[i] instanceof Array)) check = false;  
  }
  return check;
}
var SingleRace = function(net, threshold) {
  if (net > threshold) return true;
  else return false;
}
var Sigmoid = function(net, a) {
  return 1 / (1 + Math.exp(-a * net));
}
var HyperbolicTangent = function(net, a) {
  return Math.tanh(net / a);
}
var NeuralNetwork = function(inputs, heights, obj) {
  var inputs_ = inputs || [];
  var heights_ = heights || [];
  if (!is_array(inputs_, heights_)) {
    throw new Error("Invalid parameter type");
  }
  if (heights_.length != inputs_.length) {
    throw new Error("Different lengths of parameters");
  }
  var net = 0;
  for (var i = 0; i < inputs_.length; i++) {
    net += inputs_[i] * heights_[i];
  }
  if (obj['out'] == "SingleRace") {
    return SingleRace(net, obj['threshold']);
  } else if (obj['out'] == "Sigmoid") {
    return Sigmoid(net, obj['steepness']);
  } else if (obj['out'] == "HyperbolicTangent") {
    return HyperbolicTangent(net, obj['steepness']);
  }
};


console.log(NeuralNetwork([5, 4, 1, 1], [1, 0, 0, 1], {"out": "SingleRace", "threshold": 5}));
console.log(NeuralNetwork([5, 4, 1, 1], [1, 0, 0, 1], {"out": "Sigmoid", "steepness": 1}));
console.log(NeuralNetwork([5, 4, 1, 1], [1, 0, 0, 1], {"out": "HyperbolicTangent", "steepness": 1}));