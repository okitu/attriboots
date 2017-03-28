import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import fs from 'fs';

// Load license and add as banner
var banner = fs.readFileSync(__dirname + '/LICENSE', 'utf-8');

// Add @license tag
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