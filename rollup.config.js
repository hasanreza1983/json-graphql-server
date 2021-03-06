import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';

export default {
    entry: './src/index.js',
    dest: 'lib/index.js',
    format: 'umd',
    moduleName: 'JsonGraphqlServer',
    plugins: [
        resolve({
            jsnext: true,
            browser: true,
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: 'node_modules/rollup-plugin-node-builtins/**',
            namedExports: {
                'node_modules/graphql-tools/dist/index.js': [
                    'addMockFunctionsToSchema',
                    'makeExecutableSchema',
                ],
                'node_modules/apollo-test-utils/dist/src/index.js': [
                    'mockNetworkInterfaceWithSchema',
                ],
                'node_modules/graphql/index.js': [
                    'graphql',
                    'GraphQLBoolean',
                    'GraphQLFloat',
                    'GraphQLID',
                    'GraphQLInt',
                    'GraphQLList',
                    'GraphQLNonNull',
                    'GraphQLObjectType',
                    'GraphQLSchema',
                    'GraphQLString',
                ],
                'node_modules/inflection/lib/inflection.js': [
                    'camelize',
                    'pluralize',
                    'singularize',
                    'underscore',
                ],
            },
        }),
        builtins(),
        globals(),
        json(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
};
