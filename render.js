  ////////////// MediaWiki renderer
  function makeMediaWiki(obj) {
   var str = "=== " + obj.fitname + " ===\n\n";
   var i;
   var printContents = function(wh, skipRepeats) {
    for(i = 0; i < wh.length; i+=1) {
     str += ":";
     if(skipRepeats !== true) {
      str += wh[i].repeats + "x ";
     }
     str += wh[i].type;
     if(wh[i].charge != null) {
      str += " (" + wh[i].charge + ")";
     }
     str += "\n";
    }
   };
   if(obj.subsystems.length > 0) {
    str += ";Subsystems\n"; printContents(obj.subsystems, true);
   }
   str += ";High\n"; printContents(obj.highs);
   str += ";Mid\n"; printContents(obj.meds);
   str += ";Low\n"; printContents(obj.lows);
   if(obj.rigs.length > 0) {
    str += ";Rigs\n";   printContents(obj.rigs);
   }
   if(obj.drones.length > 0) {
    str += ";Drones\n"; printContents(obj.drones);
   }
   return str;
  }
  ////////////// HTML renderer
  function makeHTML(obj) {
   var str = "<h3>" + obj.fitname + "</h3><dl>";
   var i;
   var printContents = function(wh, skipRepeats) {
    for(i = 0; i < wh.length; i+=1) {
     str += "<dd>";
     if(skipRepeats !== true) {
      str += wh[i].repeats + "x ";
     }
     str += wh[i].type;
     if(wh[i].charge != null) {
      str += " (" + wh[i].charge + ")";
     }
     str += "</dd>";
    }
   };
   if(obj.subsystems.length > 0) {
    str += "<dt>Subsystems</dt>"; printContents(obj.subsystems, true);
   }
   str += "<dt>High</dt>"; printContents(obj.highs);
   str += "<dt>Mid</dt>"; printContents(obj.meds);
   str += "<dt>Low</dt>"; printContents(obj.lows);
   if(obj.rigs.length > 0) {
    str += "<dt>Rigs</dt>";   printContents(obj.rigs);
   }
   if(obj.drones.length > 0) {
    str += "<dt>Drones</dt>"; printContents(obj.drones);
   }
   str += "</dl>";
   return str;
  }

