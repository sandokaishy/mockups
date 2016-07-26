var fs = require('fs');
fs.readdir('./', function(err, files) {
	if (err) {

	} else {
		var dirs = files.filter(isDir);
		var indexFiles = dirs.map(findIndexFile);
		buildHomePage(indexFiles);
	}
});

function isDir(path) {
	if (path[0] === '.') {
		return false;
	} else {
		return fs.statSync(path).isDirectory();
	}
};

function isIndexHtml(path) {
	return path === 'index.html';
}

function findIndexFile(path) {
	var files = fs.readdirSync('./' + path);
	var file = files.filter(isIndexHtml);
	if (file) {
		return './' + path + '/' + file;
	} else {
		return '';
	}
}

function buildHomePage(files) {
	var strs = ['<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Sudo Mockups</title></head><body>'];

	var items = files.map(function(file) {
		var name=file.replace('./','').replace('/index.html','');

		var item = '<a href="' + file + '">' + name + '</a><br/>';
		return item;
	});
	strs = strs.concat(items);

	strs.push('</body></html>');
	var html = strs.join('');
	fs.writeFileSync('./index.html', html);

}