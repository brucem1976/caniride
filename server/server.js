const trails = require('./trails.js');
const express = require('express');
const path = require('path');

// for Heroku hosting
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

//var readTrailString = fs.readFileSync('trails.json');
//var trails = JSON.parse(readTrailString);
//console.log(trails.trailName);

trails.addTrail('Meerendal',-1);
var t1 = trails.addTrail('Bloemendal',-1);
var t2 = trails.addTrail('B-Spot',t1.ID);
trails.modifyTrail(t1.ID,"Bloom",true,"Like fully");
//trails.removeTrail(t2.ID);

var app = express();

app.use(express.static(publicPath));

app.get('/json', (req, res) => {
  //var parents = trails.getAllParents();
  
  // var resString = '<ul style="list-style-type:none">';
  // for(var i=0; i<parents.length; i++) {
  //   resString += "<li>" + parents[i].trailName + "</li>";
  //   var children = trails.getAllChildren(parents[i].ID);
  //   if(children.length) {
  //     resString += '<ul style="list-style-type:none">';
  //   }
  //   for(var j=0; j<children.length; j++) {
  //     resString += "<li>" + children[j].trailName + "</li>";
  //   }
  //   if(children.length) {
  //     resString += "</ul>";
  //   }
  // }
  // resString += "</ul>";
  var parents = trails.fetchTrails();
  var resString = JSON.stringify(parents);
  res.send(resString);
});


app.listen(port);