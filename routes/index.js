var express = require('express');
var router = express.Router();
var db=require('../lib/db');
var ObjectId = require('mongodb').ObjectID;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',js:'voteds' });
});
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'create',js:'create' });
});
router.get('/voted/:id',function(req, res, next) {
  var id=req.params.id;
  res.render('voted', { title:'',id:id,js:'voted'});
});
router.get('/api/voteds', function(req, res, next) {
  db.read('voteds',{},function(result){
    res.json({
      err:false,
      result:result
    });
  });
});
router.get('/api/voted/:id', function(req, res, next) {
  var id=req.params.id;
  db.read('voteds',{'_id':ObjectId(id)},function(result){
    if(result.length===1){
      res.json({
        err:false,
        result:result[0]
      });
    }
    if(result.length===0){
      res.json({
        err:false,
        result:null
      });
    }
  });
});
router.post('/api/voted', function(req, res, next) {
  var json=JSON.stringify(req.body);
  json=JSON.parse(json);
  var time=new Date();
  json.time=time;
  console.log(req);
  //obj.author=req.session.user.name;
  //check
  db.create('voteds',json,function(id){
    res.json({
      err:false,
      id:id
    });
  });
});
module.exports = router;
