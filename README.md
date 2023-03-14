# Setting up server

Using Node v16.16.0:

```
npm install
# set preferred port
export PORT=4000
node index.js
```

To confirm the server is working:
* Navigate to http://localhost:4000/api/trending/debug/enwiki - you should see a list of pages that were recently edited and a trendiness score. When first enabled, nothing will be trending so it is important to use this URL to debug.
* Note: Only enwiki and svwiki are provided in the default setup.

## Running in production

The script must run continuously. One way to do this is the https://www.npmjs.com/package/forever package - however you must also add a cronjob to make sure the script runs after the server is rebooted.

```
forever index.js
```

## Debugging

* A "*" character is printed whenever an edit is being processed. Edits are separated by "/" based on the minute they occur. If consecutive "/" characters are encountered it could indicate the service needs rebooting.

## Using the API as a service

The longer the server runs, the longer the API endpoint gets populated, so when first enabled, nothing will be trending. As it populates, the API will return results with a trending score.

http://localhost:4000/api/trending/enwiki/2

Shows "trending" articles over a 2 hour halflife. The half life in this context, is the hours at which pages become non-trending. As a general rule to find topics that trended in a certain duration of time use a half life double that value. So 2 hours would be topics trending in the last hour.

http://localhost:4000/api/trending/enwiki/48


# Scoring
See https://github.com/jdlrobson/wikipedia-edits-scorer for information on the scoring algorithm.


# Collecting weekly data:
If you want to collate trending topics over the course of a week period you'll need to setup a cronjob to occur every 12hrs.

	0 */12 * * * wget <your host>/api/trending/edit-trends-week? -O /dev/null

