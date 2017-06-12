const fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("../can-i-ride-170109-firebase-adminsdk-28jaz-5773b7fdda.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://can-i-ride-170109.firebaseio.com"
});
  
// As an admin, the app has access to read and write all data regardless of Security Rules
var db = admin.database();
  
var allTrails = [];

var ref = db.ref("/");

var updateFromDB = () => {
  ref.once("value", function(snapshot) {
    console.log("DB retrieved!");
    allTrails = [];
    snapshot.forEach(function(childSnapshot) {
      var newTrail = {
        key: childSnapshot.key,
        val: childSnapshot.val()
      };
      allTrails.push(newTrail);
    });
  });
};

updateFromDB();

var updateTrail = (ID,res) => {
  var key = -1;
  var trail;
  
  for(var i=0; i<allTrails.length; i++) {
    if(allTrails[i].val.ID === ID) {
      delete allTrails[i].val.children;
      allTrails[i].val.trailOpen = !allTrails[i].val.trailOpen;
      key = allTrails[i].key;
      trail = allTrails[i];
      break;
    }
  }
    //s = JSON.stringify(allTrails);

  // here we must find the key for only the ID, and update only it
  if(key != -1) {
    //console.log("Updating ", trail.val.trailName, " key ", trail.key," to ",trail.val.trailOpen);
    var ob = {
      trailOpen: trail.val.trailOpen
    };
    db.ref('/' + trail.key).update(ob).then((response) => {
      //console.log("Sending 200!", response);
      //return res.send(trail.val);
    }).then((response) => {
      ref.once("value", function(snapshot) {
        console.log("DB retrieved again!");
        allTrails = [];
        snapshot.forEach(function(childSnapshot) {
          var newTrail = {
            key: childSnapshot.key,
            val: childSnapshot.val()
          };
          allTrails.push(newTrail);
        });
        var trails = getAllParents();
        for(var i=0; i<trails.length; i++) {
          trails[i].children = getAllChildren(trails[i].ID);
        }
        console.log("Sending all trails to client");
        return res.send(trails);
      });
    }).catch(function() {
      console.log("Promise rejected!");
      console.log("Sending 404!");
      return res.send(trail.val).sendStatus(404);
    });
  }  else {
    res.sendStatus(404);
  }
}

var changeOpen = (ID, res) => {
  //var trails = fetchTrails();
  
  if(!allTrails.length) {
    res.sendStatus(404);
    return null;
  }
  
  for (var trail of allTrails) {
    if(trail.val.ID === ID) {
      //trail.trailOpen = !trail.trailOpen;
      updateTrail(ID,res); // remember to invert "trailOpen"
      return trail;
    }
  }
  
  return null;
};

// var removeTrail = (ID) => {
//   var trails = fetchTrails();
//   var trail = null;
//   if(!trails.length) {
//     return null;
//   }
  
//   var itemsToRemove = [];
  
//   for (var i=0; i<trails.length; i++) {
//     if((trails[i].ID === ID)||(trails[i].parentID === ID)) {
//       itemsToRemove.push(i);
      
//       if(trails[i].ID === ID) {
//         trail = trails[i];
//       }
//       //console.log("Will remove item ",i);
//     }
//   }
  
//   if(!itemsToRemove.length) {
//     return null;
//   }
  
//   //console.log("Remove Array: ",itemsToRemove);
  
//   var k = 0;
//   for(var j=0; j<itemsToRemove.length; j++) {
//     trails.splice(itemsToRemove[j]-k,1);
//     //console.log("Spliced out: ",itemsToRemove[j]-k);
//     k++;
//   }
  
//   saveTrails(trails);
//   return trail;

// };

// return array of all Parent trails
var getAllParents = () => {
  //var t = fetchTrails();
  let trails = [];

  for (let trail of allTrails) {
    if(trail.val.parentID === -1) {
      trails.push(trail.val);
    }
  }
  
  //updateFromDB();

  return trails;
};

// return array of all Child trails for a specific Parent
var getAllChildren = (parentID) => {
  //var t = fetchTrails();
  let trails = [];
  
    for (let trail of allTrails) {
      if(trail.val.parentID === parentID) {
        trails.push(trail.val);
      }
    }
  return trails;
};


module.exports = { getAllParents, getAllChildren, changeOpen };