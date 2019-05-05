var http = require('http')
var fs = require('fs')
var formidable = require('formidable')

	http.createServer(function (req,res){
		if (req.url == '/fileupload') {
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files){
				var oldpath = files.filetoupload.path;
				var newpath = 'C:/Users/HP/Desktop/weatherServer/uploads' + files.filetoupload.name;
				fs.rename(oldpath, newpath, function(err){
					if (err) throw err;
					res.write('File Uploaded!');
					res.end();
				});
			});
		}else{
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
			res.write('<input type="file" name ="filetoupload"> <br/>')
			res.write('<input type="submit" name="submit">')
			res.write('</form>')
			return res.end();
		}

	})