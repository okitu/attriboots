import babel from 'rollup-plugin-babel';
import path from 'path';
import license from 'rollup-plugin-license';

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'attriboots',
    plugins: [
        license({
            sourceMap: true,
            banner: {
                file: path.join(__dirname, 'LICENSE'),
                encoding: 'utf-8', // Default is utf-8 
            }
        }),
        babel()
    ],
    dest: 'dist/attriboots.js' // equivalent to --output
};