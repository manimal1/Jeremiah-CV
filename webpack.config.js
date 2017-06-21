'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );

const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );

const SETTINGS = {
  INPUT:  path.resolve( __dirname + '/assets' ),
  OUTPUT: path.resolve( __dirname ) + ( process.env.OUTPUT || '' ) + '/public'
};

console.log( SETTINGS.OUTPUT );
/**
 * Development webpack configuration
 */
module.exports = {
	context: SETTINGS.INPUT,
	resolve: {
		extensions: ['', '.scss', '.css']
	},
	entry: {
		main : './scss/styles.scss'
	},
	output: {
		path: SETTINGS.OUTPUT,
		publicPath: '',
		filename: '[name].js',
		chunkFilename: '[id].js',
		library: '[name]'
	},
	module: {
		loaders: [
  			{
  				test: /\.css$/,
  				exclude: /node_modules/,
  				loader: ExtractTextPlugin.extract( 'css' )
  			},
  			{
  				test: /\.scss$/,
  				exclude: [/node_modules/],
  				loader: ExtractTextPlugin.extract( 'css!postcss!sass?resolve url' )
  			}
			]
	},
	postcss: [
		autoprefixer( {
			browsers: ['last 12 versions']
		} )
	],

	plugins: [
	     new ExtractTextPlugin( '[name].css' ),
	     new CleanWebpackPlugin( [SETTINGS.OUTPUT] ),
    ]
};
