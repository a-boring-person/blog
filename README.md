### README

使用ejs模板语言和node.js的express框架完成的一个个人博客项目。如果想在本地运行，只需要把blog.sql文件运行，然后在database.js中配置自己的数据库信息。输入命令npm install ,npm start。就可以在3000端口查看网站，首页如图所示：

![image-20210127194336197](C:\Users\K\Desktop\node练习\blog\图片\image-20210127194336197.png)

主要功能包括查看博客，撰写博客，登录博客，删除和修改博客等功能。注意只有在登录状态才可以打开撰写博客的页面。具体账号密码可以从数据库中查看。

所有的路由跳转都在router文件夹的index.js中配置。所有的页面都在views文件夹中。