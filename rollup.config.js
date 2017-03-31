import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import fs from 'fs';

var banner = '' +
    '<%= pkg.name %>@<%= pkg.version %> \n' +
    '<%= pkg.homepage %> \n\n' +
    '@license \n\n';

// Load license and add to banner
banner += fs.readFileSync(__dirname + '/LICENSE', 'utf-8');

banner = banner + '\n@license\n';

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'attriboots',
    plugins: [
        license({
            sourceMap: true,
            banner: banner
        }),
        babel()
    ],
    dest: 'dist/attriboots.js' // equivalent to --output
};