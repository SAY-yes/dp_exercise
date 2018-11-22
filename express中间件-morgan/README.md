## 第一步
安装依赖  npm install 
## 第二步
启动服务   node app.js  

打开浏览器输入 
http://localhost:1338/index2.html 
看看你的node.js控制台:
> ::1 - - [23/Aug/2017:03:40:52 +0000] “GET /index2.html HTTP/1.1” 200 
1095 “-” “Mozilla/5.0 (Wi ndows NT 6.1; WOW64) AppleWebKit/537.36 
(KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36 “

点击submit按钮后，再看看控制台:
> {“firstname”:”ss”,”lastname”:”ll”} 
::1 - - [23/Aug/2017:03:42:27 
+0000] “POST /index2.html HTTP/1.1” 200 - “http://localhost:1338 /index2.html” “Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 
(KHTML, like Gecko) Chro me/60.0.3112.101 Safari/537.36”

## 第三步
morgan提供了写入文件流来将这些信息保存在文件中：

	var express = require('express');
	var morgan = require('morgan');
	var fs = require('fs');//加了文件操作的模块
	var path = require('path');//加了解析路径的模块
	var app = express();
	var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flag: 'a' });//创建一个写文件流，并且保存在当前文件夹的access.log文件中
	app.use(morgan('combined', { stream: accessLogStream }));//设置开启文件流，并且指明文件流的对象
	app.get('/index2.html', function (req, res) {
			res.sendFile(__dirname + '/index2.html');
	});
	app.post('/index2.html', function (req, res) {
			req.on('data', function (data) {
					console.log(data.toString());
					res.end();
			});
	});
	app.listen(1338);

再次运行并且重复上面的操作，看看你的日志文件和终端。

## 第四步
如果你只想在日志文件中保存少量信息，只需修改中间件为：   

	app.use(morgan('tiny', { stream: accessLogStream }));

如果说你只能接受某种格式，不想用正则再转换了，只需修改中间件为：

	app.use(morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			tokens['response-time'](req, res) + 'ms'
		].join('\r\n') 
	}, { stream: accessLogStream }));//让每条自己设定的信息换行显示
