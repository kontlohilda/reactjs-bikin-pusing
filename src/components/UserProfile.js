import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../fairbes";
import { Link } from "react-router-dom";

var UserProfile = (function() {
  var full_name = "";

  var getName = function() {
    return full_name;    // Or pull this from cookie/localStorage
    
  };

  var setName = function(name) {
    full_name = String(name);     
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName
  }

})();

export default UserProfile;