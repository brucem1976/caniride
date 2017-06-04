const fs = require('fs');

var fetchTrails = () => {
  try {
    return JSON.parse(fs.readFileSync('trails.json'));
  } catch(e) {
  }
  return [];
};

var saveTrails = (trails) => {
  var s = "";
  if(trails) {
    s = JSON.stringify(trails);
  }
  fs.writeFileSync('trails.json',s);
};

var deleteAllTrails = () => {
  saveTrails(null);
};

var addTrail = (name, parentID) => {
  var trails = fetchTrails();
  
  var trail = {
    ID: Date.now(),
    trailName: name,
    trailOpen: false,
    trailStatus: "",
    parentID: parentID
  };
  
  trails.push(trail);
  saveTrails(trails);
  return trail;
};

var modifyTrail = (ID, name, open, status) => {
  var trails = fetchTrails();
  
  if(!trails.length) {
    return null;
  }
  
  for (var trail of trails) {
    if(trail.ID === ID) {
      trail.trailName = name;
      trail.trailOpen = open;
      trail.trailStatus = status;
      saveTrails(trails);
      return trail;
    }
  }
  
  return null;
};

var removeTrail = (ID) => {
  var trails = fetchTrails();
  var trail = null;
  if(!trails.length) {
    return null;
  }
  
  var itemsToRemove = [];
  
  for (var i=0; i<trails.length; i++) {
    if((trails[i].ID === ID)||(trails[i].parentID === ID)) {
      itemsToRemove.push(i);
      
      if(trails[i].ID === ID) {
        trail = trails[i];
      }
      //console.log("Will remove item ",i);
    }
  }
  
  if(!itemsToRemove.length) {
    return null;
  }
  
  //console.log("Remove Array: ",itemsToRemove);
  
  var k = 0;
  for(var j=0; j<itemsToRemove.length; j++) {
    trails.splice(itemsToRemove[j]-k,1);
    //console.log("Spliced out: ",itemsToRemove[j]-k);
    k++;
  }
  
  saveTrails(trails);
  return trail;

};

// return array of all Parent trails
var getAllParents = () => {
  var t = fetchTrails();
  var trails = [];
  
  for (var trail of t) {
    if(trail.parentID === -1) {
      trails.push(trail);
    }
  }
  return trails;
};

// return array of all Child trails for a specific Parent
var getAllChildren = (parentID) => {
  var t = fetchTrails();
  var trails = [];
  
  for (var trail of t) {
    if(trail.parentID === parentID) {
      trails.push(trail);
    }
  }
  return trails;
};


module.exports = { addTrail, modifyTrail, removeTrail, getAllParents, getAllChildren };