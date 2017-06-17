<template>
  <div id="app">
    <ul style="list-style-type:none">
      <li v-for="trail in trails" v-bind:id="trail.ID">
        <span v-bind:class="'dot dot-' + trail.trailOpen" v-on:click="changeOpen(trail.ID)">
            <span class="dot-inner">
            </span>
          </span>
        {{trail.trailName}}
        <ul style="list-style-type:none" v-if="trail.children==[] ? false : true">
          <li v-for="child in trail.children" v-bind:id="child.ID">
            <span v-bind:class="'dot sub-dot-' + child.trailOpen" v-on:click="changeOpen(child.ID)">
              <span class="dot-inner">
              </span>
            </span>
          {{child.trailName}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      trails: []
    }
  },
  methods: {
    changeOpen: function (ID) {
      var pVal = getParameterByName('dfslkjdfs');
      if(pVal != "23jk3298ewk23") {
        return;
      }
      //this.trails[0].trailOpen = true;
      for(var i=0; i<this.trails.length; i++) {
        if(this.trails[i].ID === ID) {
          this.trails[i].trailOpen = !this.trails[i].trailOpen;
          this.$http.post('../change',this.trails[i]).then(response => {
            //console.log("Response:", response.body);
            this.trails = response.body;
          });
          return;
        }
        for(var j=0; j<this.trails[i].children.length; j++) {
          if(this.trails[i].children[j].ID === ID) {
          this.trails[i].children[j].trailOpen = !this.trails[i].children[j].trailOpen;
          this.$http.post('../change',this.trails[i].children[j]).then(response => {
              //console.log("Response: ", response);
              this.trails = response.body;
          });
          return;
          }
        }
      }
      console.log("NOT FOUND!!");
    }
  },
  mounted: function () {
   // make sure you have vue-resource inlcued in your html head
   this.$http.get('../json').then(function (response) {
     this.trails = response.body;
   });
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}



</script>

<style>
/*Red - <span class="dot dot-red"><span class="dot-inner"></span></span>*/
/*Yellow - <span class="dot dot-yellow"><span class="dot-inner"></span></span>*/
/*Green - <span class="dot dot-green"><span class="dot-inner"></span></span>*/

body {
  font-family: 'Helvetica', 'Arial', sans-serif;
}

.dot {
overflow: hidden;
border-style:solid;
border-width: 2px;
border-color: #666;
padding-top: 6px;
padding-left: 6px;
width: 20px;
height: 20px;
display: inline-block;
border-radius: 50%;
margin: 0.2em 0.4em 0.2em 0;
vertical-align:middle;
line-height: 32px;
background: #cccccc;
-webkit-box-shadow: inset 0 -6px 6px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
-moz-box-shadow: inset 0 -6px 6px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
box-shadow: inset -6px -6px 6px rgba(0, 0, 0, 0.3), inset 3px 3px 6px rgba(255, 255, 255, 0.3);
}
.dot-inner {
background: white;
opacity:0.35;
filter:alpha(opacity=35);
-webkit-box-shadow: 0px 0px 6px 3px rgba(255, 255, 255, 1);
-moz-box-shadow: 0px 0px 6px 3px rgba(255, 255, 255, 1);
box-shadow: 0px 0px 6px 3px rgba(255, 255, 255, 1);
border-radius: 50%;
overflow: hidden;
width: 6px;
height: 6px;
display: block;
line-height: 0;
}
.dot-false {
background: #990000;
}
.dot-true {
background: #009900;
}

.sub-dot-false {
background: #990000;
width: 15px;
height:15px;
  
}
.sub-dot-true {
background: #009900;
width: 15px;
height:15px;
}
.dot-yellow {
background: #999900;
}/** add more colors here if you need **/


</style>
