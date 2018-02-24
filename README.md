# Scoring
See https://github.com/jdlrobson/wikipedia-edits-scorer for information on the scoring algorithm.


# Collecting weekly data:
If you want to collate trending topics over the course of a week period you'll need to setup a cronjob to occur every 12hrs.

	0 */12 * * * wget <your host>/api/trending/edit-trends-week? -O /dev/null

# TODO
When something trends we need to send an event that other services can subscribe to via a websocket.
