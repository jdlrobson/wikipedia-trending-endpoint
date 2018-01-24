import WikiSocketCollection from 'wikitrender'

const project = process.env.PROJECT || 'wikipedia';
const collections = {};

const ONE_HOUR = 60;
const ONE_DAY = ONE_HOUR * 24;

collections.en = new WikiSocketCollection( {
  id: 'mysocket',
  project: 'en.' + project + '.org',
  minPurgeTime: ONE_HOUR * 3,
  maxLifespan: ONE_DAY,
  maxInactivity: ONE_DAY,
  // if something hits 50 edits in 0.5 day we want to keep it.
  // We want to discard anything with less than 8 edits in 3 hours (0.04(3*60) = 7.2)
  // 50 edits / (6*60) = 50/360 = 0.138
  // 50 edits / (24*60) = 34 /1140 = 0.04 edits per minute
  minSpeed: 0.04
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
