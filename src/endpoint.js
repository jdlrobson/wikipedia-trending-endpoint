import express from 'express'

import cachedResponse from './cached-response'
import trending from './trending'
import trendingDebug from './debug'
import trendingWeek from './week'

const APP_PORT = process.env.PORT || 3000
const DEFAULT_PROJECT = 'wikipedia';

// Express
const app = express()

app.set( 'port', ( APP_PORT ) )

/*
 *******************************************************
 * Begin GET routes
 *******************************************************
*/

app.get('/', ( req, res ) => {
  cachedResponse( res, req.url, () => {
    return new Promise( ( resolve ) => {
      resolve( [
        '/api/trending/edit-trends-week',
        '/api/trending/enwiki/2',
        '/api/trending/debug/enwiki',
        '/api/trending/debug/enwiki/:title',
        'https://github.com/jdlrobson/wikipedia-trending-endpoint'
      ] );
    } )
  } );
} );

app.get( '/api/trending/edit-trends-week', ( req, res ) => {
  cachedResponse( res, req.url, () => {
    const url = `${req.protocol}://${req.get( 'host' )}/api/trending/enwiki/24`;
    return trendingWeek( url );
  } );
} );

app.get( '/api/trending/debug/:wiki/:title?', ( req, res ) => {
  cachedResponse( res, req.url, () => {
    if ( req.params.title ) {
      // TODO: use trendingDebug
      return trending( req.params.wiki, 12, DEFAULT_PROJECT, req.params.title );
    } else {
      return trendingDebug( req.params.wiki );
    }
  } );
} );

app.get( '/api/trending/:wiki/:halflife', ( req, res ) => {
  var wiki = req.params.wiki;
  var halflife = parseFloat( req.params.halflife );

  cachedResponse( res, req.url, () => {
    return trending( wiki, halflife, DEFAULT_PROJECT );
  } );
} );

app.listen( app.get( 'port' ) )
console.info( '==> Go to http://localhost:%s', app.get( 'port' ) )
