new Vue({
  el: '#app',
  data: {
    name: 'Bruce',
    trails: []
  },
  mounted: function () {
   // make sure you have vue-resource inlcued in your html head
   this.$http.get('../json').then(function (response) {
     this.trails = response.body; // depends on the strcture of your response
   });
  }
});
