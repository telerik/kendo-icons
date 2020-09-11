const path = require('path');

// Lerna executes this script with the wrong cwd
if ( process.cwd() !== path.resolve( __dirname, '../' ) ) {
    console.log( 'Fixing process.cwd()' ); // eslint-disable-line no-console
    process.chdir( path.resolve( __dirname, '../' ) );
}

require('./sass-build');
