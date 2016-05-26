new Vue({
  el: '#App',
  data: {
    message: 'Hello Vue.js!',
    json:{}
  },
  methods:{
    upUI:function(){
      var json=this.json;
      var max=0;
      json.items.map(function(item,index,items){
        max+=parseInt(item.value);
      });
      json.items.map(function(item,index,items){
        var value=parseInt(item.value);
        item.percent=value/max*100;
      });
    }
  },
  ready:function(){
    var _self=this;
    var id=$('.id').attr('id');
    $.getJSON('/api/voted/'+id,function(x){
      console.log(x.result);
      _self.json=x.result;
    });
  }
});
