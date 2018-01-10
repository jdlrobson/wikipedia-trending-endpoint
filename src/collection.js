import WikiSocketCollection from 'wikitrender'

const project = process.env.PROJECT || 'wikipedia';
const collections = {};

const ONE_DAY = ( 60 * 24 ) * 24;

collections.en = new WikiSocketCollection( {
  id: 'mysocket',
  project: 'en.' + project + '.org',
  minPurgeTime: ONE_DAY,
  maxLifespan: ONE_DAY,
  maxInactivity: ONE_DAY,
  minSpeed: 0.05
} );
collections.sv = new WikiSocketCollection( {
  id: 'sv-socket',
  project: 'sv.' + project + '.org',
  minPurgeTime: 40,
  maxLifespan: ( 60 * 24 ) * 24,
  maxInactivity: ( 60 * 24 ) * 24,
  minSpeed: 0.1
} );

export default collections;
