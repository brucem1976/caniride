new Vue({
  el: '#app',
  data: {
    trails: []
  },
  methods: {
    changeOpen: function (ID) {
      //console.log("CLICK!");
      //this.trails[0].trailOpen = true;
      for(var i=0; i<this.trails.length; i++) {
        if(this.trails[i].ID === ID) {
          this.trails[i].trailOpen = !this.trails[i].trailOpen;
          return;
        }
        for(var j=0; j<this.trails[i].children.length; j++) {
          if(this.trails[i].children[j].ID === ID) {
          this.trails[i].children[j].trailOpen = !this.trails[i].children[j].trailOpen;
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

