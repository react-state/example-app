const replace = require('replace-in-file');
try {
    const changes = replace.sync({
        files: 'dist/server.js',
        from: [ /.\/dist\/index.html/g, /..\/dist/g],
        to: ['.\/index.html', '.'],
    });
}
catch (error) {
    console.error('Error occurred:', error);
}