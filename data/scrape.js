const rp = require('request-promise-native')
const fs = require('fs')
async function main() {
	console.log('Making API Request...')
	// request the data from the JSON API
	const results = await rp({
		uri:
			'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=',
		headers: {
			Connection: 'keep-alive',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36',
			'x-nba-stats-origin': 'stats',
			Referer: 'https://stats.nba.com/',
		},
		json: true,
	})

	const headers = results.resultSets[0].headers
	const data = results.resultSets[0].rowSet
	const transformedData = data.map((player) => {
		return player.reduce((obj, el, idx) => {
			return {
				...obj,
				[headers[idx]]: el,
			}
		}, {})
	})
	console.log('Got results =', transformedData)
	// // save the JSON to disk
	await fs.promises.writeFile(
		'./data/dataset_2020-21.json',
		JSON.stringify(transformedData, null, 2)
	)

	// console.log('results > ', results);
	console.log('Done!')
}
// start the main script
main()
