/*

parseEFT takes an EFT text block string, and returns an ast.

For more info on the shape of the AST, just go paste in an interesting fit and
consult the debugging JSON.

*/

function parseEFT(text) {
  "use strict";
  var lines = text.split("\n");
  var firstline = /^\[([^,]+), (.+)\]$/.exec(lines[0]);
  var obj = {
    shiptype: firstline[1],
    fitname: firstline[2],
    lows: [],
    meds: [],
    highs: [],
    rigs: [],
    subsystems: [],
    drones: [],
    originaltext: text
  };
  var curLine = 1;
  var todolist = [obj.lows, obj.meds, obj.highs, obj.rigs, obj.subsystems, obj.drones];
  var todoindex = 0; // where in the above todolist we are at
  var repeated = 0; // how many times an item is repeated
  for(; curLine < lines.length; curLine += 1) {
    if(lines[curLine] === "") {
      todoindex += 1;
      // EFT likes to double the space before drones, so this is a hack to accept
      // an extra space between subsystems and drones for drone strat cruisers...
      // were normally that extra space is absorbed by subsystems
      if(todoindex === 5 && lines[curLine] === "") {
        curLine += 1; // eat an extra line! double space between subs and drones
      }
    } else {
      for(repeated = 1; lines[curLine+1] === lines[curLine]; repeated += 1) {
        curLine += 1;
      }
      todolist[todoindex].push({ repeats: repeated, type: lines[curLine] });
    }
  }
  // EFT likes to x the drones..
  for(curLine=0; curLine < obj.drones.length; curLine++) {
    var m = /^(.+) x([2345])$/.exec(obj.drones[curLine].type);
    if(m != null) {
      obj.drones[curLine] = { repeats: parseInt(m[2]) * obj.drones[curLine].repeats, type: m[1] };
    }
  }
  // Parse out any ammo in highs or meds
  var parseCharges = function(ch) {
    for(curLine=0; curLine < ch.length; curLine++) {
      var m = /^(.+), (.+)$/.exec(ch[curLine].type);
      if(m != null) {
        ch[curLine].type = m[1];
        ch[curLine].charge = m[2];
      }
    }
  };
  parseCharges(obj.highs);
  parseCharges(obj.meds);
  return obj;
}

