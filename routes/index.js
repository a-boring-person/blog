var express = require('express');
var router = express.Router();
// crypto模块可以把密码进行md5加密
var crypto = require('crypto');
var mysql = require('../database');
var session = require("express-session");

/* GET home page. 
get()定义一个请求方法为get方法的路由
res.render()渲染一个视图模板,第一个参数是view文件夹下对应的文件名,第二个参数是传给视图的json数据
*/
// 进入首页
router.get('/', function(req, res, next) {
  let articles = '';
  let page = req.query.page||1;
  console.log(page);
  let start = (page - 1) * 7;
  let end = page * 7;
  let countsql = 'select count(*) as articleNumber from article';
  //注意limit后面有一个空格，不加空格的话就会出错。。。！！！！
  let sql = 'select * from article order by articleID DESC limit '+start+','+end;
  mysql.query(sql,function(err,rows,next){
    //将从数据库中获取的数据里面的RowDataPacket去掉
    let dataString = JSON.stringify(rows);
   articles = JSON.parse(dataString);
    articles.forEach(function(element){
      //把数据库里的日期分割
    let date =  element.time.split('T')
    element.time = date[0];
    });
    //注意传递的数据是数组，所以不能加引号
    // res.render('index',{articles:articles});
  });
  mysql.query(countsql,function(err,rows,next) {
    let articleNumber = rows[0].articleNumber;
    console.log(articleNumber);
    let pageNum = Math.ceil(articleNumber/ 8);
    console.log(pageNum);
    res.render('index',{articles:articles,pageNum:pageNum,articleNumber:articleNumber,page:page})

  })
});
// 进入具体每个博客的内容
router.get('/articles/:articleID',function(req,res,next) {
  //params可以获取到地址栏里的信息
  var articleID = req.params.articleID;
  let updatesql = 'update article set click=click+1 where articleID='+articleID;
  mysql.query(updatesql);
  let sql = 'select * from article where articleID = '+articleID;
  mysql.query(sql,function(err,rows,next) {
    let dataString = JSON.stringify(rows)
    let result = JSON.parse(dataString);
    let article = result[0];
    if (article) {
      console.log(article);
      let date = article.time.split('T');
      article.time = date[0]; 
    }else{ 
      console.log(err);
    }

    res.render('article',{article:article})
  });

})
// 进入登录页面
router.get('/login',function(req,res,next){
  res.render('login');
});
// 判断登陆是否成功
router.post('/login',function(req,res,next){
  console.log('找到login');
  let username = req.body.username;
  let password = req.body.password;
  // var hash = crypto.createHash('MD5');
  // hash.update(password);
  // password = hash.digest('hex');
  let sql = 'select * from author where username=' +mysql.escape(username)+'AND password='+mysql.escape(password);
  mysql.query(sql, function(err,rows,fields){
    if (err) {
      console.log(err)
      return ;
    }
   console.log(rows)
   let user = rows[0]
   console.log(user);
    if(!user){
      res.render('login',{message:'账号或者密码错误'})
      return ;
    }
    req.session.user = user;
    console.log(req.session.user);
    res.redirect('/');
  })
});
//进入编辑页面
router.get('/edit',function(req,res){
  res.render('edit');
});
//提交编辑的博客
// 提交博客时要能够识别登陆的用户，将这个用户的名字添加到数据库中，
// 需要用到cookie或者session。不同点在于cookie存储在客户端，session存储在服务端。使用session时，当用户访问相同的网站时，服务器首先检查这个网页请求
//是否含有session标识，有则查找相应的session数据，服务器根据结果返回响应的内容。
router.post('/edit',function(req,res) {
  console.log('开始提交')
  let title = req.body.title;
  console.log(title)
  let content = req.body.content;
  let author = req.session.user.name;
  console.log(author);
  //注意sql语句中的值都应该用’‘括起来，不能直接等于，可以用escape就可以把变量加上单引号。
  let sql = 'insert article set articleTitle='+mysql.escape(title)+',author='+mysql.escape(author)+',content='+mysql.escape(content)+',time='+mysql.escape(new Date());
  mysql.query(sql,function(err,rows){
    if(err) {
      console.log(err);
      return ;
    }
    res.redirect('/');
  })
});
//进入修改页面
router.get('/modify/:id',function(req,res) {
  let id = req.params.id;
  console.log(id);
  let sql = 'select * from article where articleID = '+mysql.escape(id);
  mysql.query(sql,function(err,rows){

    if (err) {
      console.log(err);
      return ;
    }
    let article = rows[0];
    console.log(article);
    res.render('modify',{article:article});
  })
});
//提交修改内容
router.post('/modify',function(req,res) {
  let id = req.params.id;
   let title = req.body.title;
   let content = req.body.content;
   let sql = 'update article set articleTitle='+mysql.escape(title)+',content='+mysql.escape(content)+'where articleID='+mysql.escape(id);
   mysql.query(sql,function(err,rows) {
     if (err) {
       console.log(err);
       return ;
     }
     res.redirect('/');
   });
});
//删除博客
router.get('/delete/:id',function(req,res){
  let id = req.params.id;
  console.log(id); 
  sql = 'delete from article where articleID='+mysql.escape(id);
  mysql.query(sql,function(err,rows) {
    if (err) {
      console.log(err);
      return ;
    }
    res.redirect('/');
  })
});
router.get('/about',function(req,res) {
  res.render('about');
})


module.exports = router;
