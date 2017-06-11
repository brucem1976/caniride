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
// var fetchTrails = () => {
  
//   return allTrails;
//   // try {
//   //   return JSON.parse(fs.readFileSync('trails.json'));
//   // } catch(e) {
//   // }

//   // return [];
// };

var updateTrail = (ID) => {
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
    console.log("Updating ", trail.val.trailName, " key ", trail.key," to ",trail.val.trailOpen);
    var ob = {
      trailOpen: trail.val.trailOpen
    };
    db.ref('/' + trail.key).update(ob).then(updateFromDB());
  }
  
  //allTrails = trails;
  //ref.set(allTrails);
  //fs.writeFileSync('trails.json',s);
};

// var deleteAllTrails = () => {
//   saveTrails(null);
// };

// var addTrail = (name, parentID) => {
//   var trails = fetchTrails();
  
//   var trail = {
//     ID: Date.now(),
//     trailName: name,
//     trailOpen: false,
//     trailStatus: "",
//     parentID: parentID
//   };
  
//   trails.push(trail);
//   saveTrails(trails);
//   return trail;
// };

// var modifyTrail = (ID, name, open, status) => {
//   var trails = fetchTrails();
  
//   if(!trails.length) {
//     return null;
//   }
  
//   for (var trail of trails) {
//     if(trail.ID === ID) {
//       trail.trailName = name;
//       trail.trailOpen = open;
//       trail.trailStatus = status;
//       saveTrails(trails);
//       return trail;
//     }
//   }
  
//   return null;
// };

var changeOpen = (ID) => {
  //var trails = fetchTrails();
  
  if(!allTrails.length) {
    return null;
  }
  
  for (var trail of allTrails) {
    if(trail.val.ID === ID) {
      //trail.trailOpen = !trail.trailOpen;
      updateTrail(ID); // remember to invert "trailOpen"
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
  
  updateFromDB();

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