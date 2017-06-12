const trails = require('./trails.js');
const express = require('express');
const bodyParser     =        require("body-parser");
const path = require('path');

// for Heroku hosting
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

// trails.deleteAllTrails();

// var t = trails.addTrail('Meerendal',-1);

// var waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Dorstberg',t.ID);

// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// t = trails.addTrail('Bloemendal',-1);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('B-Spot',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail("Lombard's Terra",t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Green Belt to Hillcrest',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Green Belt to Odendal Rd',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Bloemslang',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Bloemendaaler',t.ID);

// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// t = trails.addTrail('Hoogekraal',-1);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('The Ravine',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail("The Cobra",t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Trail Z',t.ID);

// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// t = trails.addTrail('Hillcrest',-1);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Rooikat',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail("Green Olive",t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Corridor to Contermans',t.ID);

// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// t = trails.addTrail('Contermanskloof',-1);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('Green Loop',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail("Blue Loop",t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('DH1',t.ID);
// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// trails.addTrail('DH2',t.ID);

// waitTill = new Date(new Date().getTime() + 10);
// while(waitTill > new Date()){}
// t = trails.addTrail('Majik Forest',-1);

var app = express();

app.use(express.static(publicPath));

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/change', (req, res) => {
  trails.changeOpen(req.body.ID,res);
  //res.send('POST Request');
});

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
  var parents = trails.getAllParents();
  for(var i=0;i<parents.length;i++) {
    var children = trails.getAllChildren(parents[i].ID);
    parents[i].children = children;
  }
  //var resString = JSON.stringify(parents);
  //res.send(resString);
  trails.updateAll(res);
});


app.listen(port);