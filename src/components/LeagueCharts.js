import React, { useEffect, useState } from 'react'
import { data15, data16, data17, data18, data19, data20 } from '../data/index'

// import axios from 'axios';

// import BarTable from './BarTable';
import Histogram from './Histogram'
import './LeagueCharts.css'

const LeagueCharts = () => {
	const [datas, setData] = useState({})
	const [year, setYear] = useState('2020-21')

	useEffect(() => {
		// USE FOR PLAYERSTATS (PREFERRED TABLE) SCRAPED AND STORED IN OUTPUT.JS
		let filtered
		if (year === '2020-21')
			filtered = data20.filter((player) => player.NBA_FANTASY_PTS_RANK < 200)
		else if (year === '2019-20')
			filtered = data19.filter((player) => player.NBA_FANTASY_PTS_RANK < 200)
		else if (year === '2018-19')
			filtered = data18.filter((player) => player.NBA_FANTASY_PTS_RANK < 200)
		else if (year === '2017-18')
			filtered = data17.filter((player) => player.NBA_FANTASY_PTS_RANK < 200)
		else if (year === '2016-17')
			filtered = data16.filter((player) => player.NBA_FANTASY_PTS_RANK < 200)
		else if (year === '2015-16')
			filtered = data15.filter((player) => player.NBA_FANTASY_PTS_RANK < 200)
		setData(filtered)
	}, [year])

	return (
		<div id="histogram-body">
			<div className="histogram-header">
				<h1>Categorical Distributions.</h1>
				<select
					name="Decimal"
					className="ui fluid dropdown"
					onChange={(e) => setYear(e.target.value)}
					type="number"
					value={year}
				>
					<option key={0} value={'2020-21'}>
						2020-21
					</option>
					<option key={1} value={'2019-20'}>
						2019-20
					</option>
					<option key={2} value={'2018-19'}>
						2018-19
					</option>
					<option key={3} value={'2017-18'}>
						2017-18
					</option>
					<option key={4} value={'2016-17'}>
						2016-17
					</option>
					<option key={5} value={'2015-16'}>
						2015-16
					</option>
				</select>
			</div>
			<div id="histogram-container">
				<Histogram data={datas} stat={'FG3M'} />
				<Histogram data={datas} stat={'PTS'} />
				<Histogram data={datas} stat={'REB'} />
				<Histogram data={datas} stat={'AST'} />
				<Histogram data={datas} stat={'STL'} />
				<Histogram data={datas} stat={'BLK'} />
				<Histogram data={datas} stat={'FG_PCT'} />
				<Histogram data={datas} stat={'FT_PCT'} />
				<Histogram data={datas} stat={'TOV'} />
			</div>
		</div>
	)

	// </div>
}

export default LeagueCharts
