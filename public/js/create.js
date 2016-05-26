new Vue({
  el: '#App',
  data: {
    message: 'Hello Vue.js!',
    showJson:null,
    json:{
      title:'title',
      subTitle:'sub title',
      select_number:0,
      items:[
        {
          title:'title',
          value:0,
          percent:0
        },
        {
          title:'title2',
          value:10,
          percent:0
        }
      ]
    }
  },
  computed: {
    // 一个计算属性的 getter
    showJson:{
      // `this` 指向 vm 实例
      //cache: false,
      get:function () {
        var newitems=[];
        var json=this.json;
        var max=0;
        json.items.map(function(item,index,items){
          max+=parseInt(item.value);
        });
        json.items.map(function(item,index,items){
          var value=parseInt(item.value);
          //item.percent=value/max*100;
          //items[index]=item;
          var newitem=item;
          newitem.percent=value/max*100;
          newitems.push(newitem);
        });
        json.items=newitems;
        console.log(json);
        return json;
      },
      set:function(json){
        //return this.json;
        this.json=json;
      }
    }
  },
  methods:{
    addItem:function(){
      var _self=this;
      var count=_self.json.items.length;
      this.json.items.push({
        title:'title'+count,
        value:0,
        percent:0
      });
    },
    delItem:function(delItem){

      this.json.items.map(function(item,index,items){
        if(delItem===item){
          items.splice(index,1);
        }
      });

    },
    save:function(){
      this.upUI();
      var _self=this;
      var json=_self.json;
      console.log('json:',json);
      $.ajax({
           type: "POST",
           url: "/api/voted",
           data:json,
           dataType: "json",
           success: function(data){
             if(data.err){

             }else{
               //console.log(data.id);
               console.log(data);
             }
           }
       });
    },
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

  }
});
