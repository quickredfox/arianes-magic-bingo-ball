(function() {
  /*
  	magic-bingo-ball
  */
  var M, getstate, init, lastpick, onShake, pick, reset, shuffle, start, values;
  M = Math;
  values = {
    numbers: [],
    mappings: {},
    used: []
  };
  shuffle = function() {
    return values.numbers = values.numbers.sort(function() {
      return M.round(M.random()) - 0.5;
    });
  };
  reset = function() {
    var letter, range, _ref, _results;
    values = {
      numbers: [],
      mappings: {},
      used: []
    };
    _ref = {
      B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      I: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      N: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      G: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      O: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
    };
    _results = [];
    for (letter in _ref) {
      range = _ref[letter];
      _results.push(range.forEach(function(number) {
        values.numbers.push(number);
        values.mappings[number] = letter;
        return values.mappings[letter] = range;
      }));
    }
    return _results;
  };
  getstate = function() {
    if (values.used.length === 0 && values.numbers.length === 50) {
      return 'initialized';
    } else if (values.used.length > 0 && values.numbers.length > 0) {
      return 'playing';
    } else if (values.used.length === 50 && values.numbers.length === 0) {
      return 'endgame';
    } else {
      return 'unknown';
    }
  };
  start = function() {
    if (values.used.length === 0 && values.numbers.length === 0) {
      reset();
    } else if (values.numbers.length === 0) {
      return {
        num: 0
      };
    }
    return Round;
  };
  lastpick = (new Date()).getTime();
  pick = function() {
    var choice, now;
    if ((now = (new Date()).getTime()) - lastpick > 3000) {
      lastpick = now;
      if (values.numbers.length === 0) {
        return 0;
      }
      shuffle();
      choice = values.numbers.pop();
      values.used.push(choice);
      return choice;
    } else {
      return -1;
    }
  };
  onShake = function(a) {
    var value;
    value = pick();
    if (value === -1) {
      return;
    }
    if (value === 0) {
      alert("all numbers cycled, going to reset.");
      reset();
      return onShake();
    }
    $('#ball').html("" + value + "<span class='letter'>" + values.mappings[value] + "</span>");
    return $('#used').append("<div class='ball'>" + value + "<span class='letter'>" + values.mappings[value] + "</span></div>");
  };
  init = function() {
    reset();
    $.shake({
      callback: function() {
        return onShake();
      }
    });
    $('#shake-btn').bind('click', function(e) {
      e.preventDefault();
      return onShake();
    });
    return $('#reset-btn').bind('click', function(e) {
      $('#ball').empty();
      $('#used').empty();
      e.preventDefault();
      return reset();
    });
  };
  $(function() {
    return init();
  });
}).call(this);
