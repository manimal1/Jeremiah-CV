'use strict';

// Fs extra was not being used, will be useful for when uploading documents
// const fs = require('fs-extra');
const express = require('express');
const Promise = require('bluebird-extra');

// May remove module.exports here since its not expressly needed
// Was trying an experiment where different servers could add the same setup.
const app = module.exports = express();

// Logs environment express runs in.
// console.log('app environment', app.get('env'));
// Todo : when running in dev mode may be able to set up wepback dev middleware

const settings = {
    port: 3000
}

// Todo : make static consistent between output path from webpack and route handler
const directory = {
    static: getAbsolutePath('/public'),
    images: getAbsolutePath('/assets/images'),
    view: getAbsolutePath('/view')
}

// Console for debug purposes
// console.log(directory);
app.use('/static', express.static(directory.static));
app.use('/images', express.static(directory.images));
app.use('/', express.static(directory.view));

app.listen(settings.port, () => {
    console.log(`Example app listening on port ${settings.port}`)
});

/**
 * Returns path relative to process root
 * - prefer to standardize paths through this function
 * @param {String} pathLong 
 */
function getAbsolutePath(pathLong) {
    const path = require('path');
    const absolutePaths = path.normalize(path.join(`${path.resolve()}${pathLong}`));

    return absolutePaths;
}