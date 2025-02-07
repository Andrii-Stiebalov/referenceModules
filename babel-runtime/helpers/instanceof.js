var _Symbol$hasInstance = require("../core-js/symbol/has-instance");

var _Symbol = require("../core-js/symbol");

function _instanceof2(left, right) { if (right != null && typeof _Symbol !== "undefined" && right[_Symbol$hasInstance]) { return right[_Symbol$hasInstance](left); } else { return left instanceof right; } }

function _instanceof(left, right) {
  if (right != null && typeof _Symbol !== "undefined" && right[_Symbol$hasInstance]) {
    return right[_Symbol$hasInstance](left);
  } else {
    return _instanceof2(left, right);
  }
}

module.exports = _instanceof;