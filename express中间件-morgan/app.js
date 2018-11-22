var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));//运用中间件，‘combined’是日志显示的格式，后面会看到什么样
app.get('/index2.html', function (req, res) {
	res.sendFile(__dirname + '/index2.html');
}); //将本地文件夹中的index2.html文件传到客户端
app.post('/index2.html', function (req, res) {
	req.on('data', function (data) {
		console.log(data.toString());
		res.end();
	}); //响应index2.html的post请求 
});
app.listen(1338);//监听localhost:1338端口