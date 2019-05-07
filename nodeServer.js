var http = require('http')
var fs = require('fs')
var url = require('url')
var formidable = require('formidable')

http.createServer(function(req, res){
	var path = req.url
	var q = url.parse(path, true)
	var filename = '.' + q.pathname

	if (path =='/uploadFile') {
		var form = new formidable.IncomingForm()
		form.parse(req, function(err, fields, files){
			var oldpath = files.filetoupload.path;
			var newpath = "C:/Users/HP/Desktop/weatherServer/uploads/" + files.filetoupload.name

			fs.rename(oldpath, newpath, function(err){
				if (err) throw err
					res.write('File Uploaded and Moved')
					res.end()
			})

			})

	}else if (path =='/home') {

	res.write('<h1>WELCOME!!!</h1><br/>')
	res.write('<p>This is a NodeJs sever running on port 8080, It serves current weather conditions of various cities across the globe by just initiating a search.</p>')
	res.write('<p>It also serves a file upload page, i was able to upload files to a specified directory on my computer.</p>')
	res.write('<p>There is a login and home path also.</p>')
	res.write('<p>Building with NodeJs is fun and i find it exciting.</p>')
	res.end()

	}else if (path =='/login') {

	res.write('<h1>Login</h1><br/>')
	res.write('<p>Input your details to login</p>')
	res.write('<input type="text" name="username" placeholder="username" /><br/>')
	res.write('<input type="password" name="password" placeholder="password" /><br/>')
	res.write('<input type="submit" name="login" value="Login"/>')
	res.end()

	}else{
		fs.readFile(filename, function(err, data){
			if (err){
				res.writeHead(404, {'Content-Type' : 'text/html'})
				res.write('404. Bad request')
				return res.end()
			}
			res.writeHead(200, {'Content-Type' : 'text/html'})
			res.write(data)
			return res.end()
		})
	}

}).listen(8080)