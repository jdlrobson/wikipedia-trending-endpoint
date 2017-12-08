# Setting up

	export TREND_EDITS_PER_MIN=0
	export TREND_MIN_ANON_EDITS=0
	export TREND_MAX_ANON_EDIT_RATIO=1 (1 anon edit / 2 named edit = 0.5 ratio)
	export TREND_BIAS=1
	export TREND_MIN_AGE=5
	export TREND_MAX_AGE=100000
	export TREND_MIN_TOTAL_EDITS=2
	export TREND_MIN_CONTRIBUTORS=1

# Collecting weekly data:
If you want to collate trending topics over the course of a week period you'll need to setup a cronjob to occur every 12hrs.

	0 */12 * * * wget <your host>/api/trending/edit-trends-week? -O /dev/null

# TODO
When something trends we need to send an event that other services can subscribe to via a websocket.
