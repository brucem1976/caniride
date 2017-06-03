const trails = require('./trails.js');


//var readTrailString = fs.readFileSync('trails.json');
//var trails = JSON.parse(readTrailString);
//console.log(trails.trailName);

trails.addTrail('Meerendal',-1);
var t1 = trails.addTrail('Bloemendal',-1);
var t2 = trails.addTrail('B-Spot',t1.ID);
trails.modifyTrail(t1.ID,"Bloom",true,"Like fully");
trails.removeTrail(t2.ID);