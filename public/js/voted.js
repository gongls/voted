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
        var percent=Math.floor(value/max*100);
        item.percent=percent;
      });
    },
    post:function(newitem){
       console.log(newitem);
       newitem.value=parseInt(newitem.value)+1;
       this.json.items.map(function(item){
          if(newitem.title===item.title){
		item=newitem;
          }
       });
       this.upUI();
       //
       var id=$('.id').attr('id');
       var json=this.json;
       json=JSON.stringify(json);
       $.ajax({
         url:'/api/voted/'+id,
         type:'PUT',
         data:{json:json},
         success:function(x){
          console.log(x);
          alert('已投票');
         }
       });
       //
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
