new Vue({
  el: '#app',
  data: {
    trails: []
  },
  methods: {
    changeOpen: function (ID) {
      var pVal = getParameterByName('admin');
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
});

function respFunc(d) {
              console.log("Response: ",d);
              alert("hi!");
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
