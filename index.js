var	connect = require('connect'),
	path = require('path'),
	fs = require('fs'),
	md = require('node-markdown'),
	parseUrl = require('url').parse,
	home = path.dirname(require.main.filename),
	//Get the path of the initiating file
	getTemplate = function(file) {
		try {
			return fs.readFileSync(file + '/template.html','binary');

		} catch(e) {
			file = path.resolve(file,'..');
			return getTemplate(file);
		}
	},
	//map incoming k requests to v files
	extMap = {
		'.html': '.md',
	},

	//middleware
	compile = function(req,res,next) {
		var url = decodeURIComponent(parseUrl(req.url).pathname),
			isDir = path.extname(url) === '',		
			ext = isDir ? '.html' : path.extname(url),
			filename = isDir ? 'index' : path.basename(url,path.extname(url));
			url += isDir ? 'index.html' : '';
		if(ext in extMap) {
			var src = filename + extMap[ext];
				try {
					var content = fs.readFileSync(home + path.dirname(url) + '/' + src,'binary');
					content = md.Markdown(content);	
					var template = getTemplate(home + path.dirname(url) );
					content = template.replace('<!-- content -->',content);
					fs.writeFileSync(home + url,content,'binary');
				} catch(e) {
				}
		}
		return next();
	};
module.exports = {
	start: function(port) {
		connect(
			compile,
			connect.static(home)
		).listen(port || 3000);
		console.log('stat! running!');
	}
};
