import NodeCache from 'node-cache';

import respond from './respond.js'

const shortLifeCache = new NodeCache( { stdTTL: 60 * 10,
  checkperiod: 60 * 10 } );

let blacklist = [];

function cachedResponse( res, cacheKey, method ) {
  if ( cacheKey && cacheKey.substr( -1 ) === '?' ) {
    cacheKey = cacheKey.substr( 0, cacheKey.length - 1 );
  }
  res.setHeader( 'Content-Type', 'application/json' );
  if ( !cacheKey || blacklist.indexOf( cacheKey ) > -1 ) {
    // no caching requested
    respond( res, method );
  } else {
    shortLifeCache.get( cacheKey, function ( err, responseText ) {
      if ( err || !responseText ) {
        respond( res, method ).then( function ( newResponseText ) {
          shortLifeCache.set( cacheKey, newResponseText );
        } );
      } else {
        res.status( 200 );
        res.send( responseText );
      }
    } );
  }
}

export default cachedResponse;
