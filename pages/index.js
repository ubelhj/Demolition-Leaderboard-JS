import CountryLeaderboardTable from '@components/CountryLeaderboardTable';
import Header from '@components/Header'
import LeaderboardTable from '@components/LeaderboardTable'
import { getPlayerAndCountryData } from '@components/utils/leaderboardData';
import { calculateDays, calculateHours, calculateMinutes, calculateSeconds, calculateYears } from '@components/utils/timeHelper';
import { useState } from 'react';
const fetch = require('isomorphic-fetch');


export default function Home({leaderboard, totals, time}) {
  const [table, setTable] = useState('player')

  const data = getPlayerAndCountryData(leaderboard)

  return (
    <div className="container">

      <Header totals={totals} time={time} />

      <div>
        {table === 'player' ? (
          <button onClick={() => setTable('country')}>
            Country Leaderboard
          </button>
        ) : (
          <button onClick={() => setTable('player')}>
            Player Leaderboard
          </button>
        )}
      </div>

      {table === 'player' ? (
        <LeaderboardTable players={data?.playerData}/>
      ) : (
        <CountryLeaderboardTable countryData={data?.countryData}/>
      )}

    </div>
  )
}

export async function getStaticProps(context) {
  let leaderboard = 
    await fetch("https://demolition-leaderboard.netlify.app/.netlify/functions/downloadData")
      .then(function(response) {
        if (response.status >= 400) {
          console.log(response);
          return {};
        }
        return response.json();
      });

  let totalDemos = 0;
  let totalExterms = 0;
  let totalPlayers = 0;
  
  for (let player in leaderboard) {
    let playerData = leaderboard[player];

    let playerDemos = parseInt(playerData["Demolitions"]);
    totalDemos += playerDemos;

    let playerExterms = parseInt(playerData["Exterminations"]);
    totalExterms += playerExterms;

    totalPlayers ++;
  }

  let demoSeconds = totalDemos * 3

  const years = calculateYears(demoSeconds);
  const days = calculateDays(demoSeconds, years);
  const hours = calculateHours(demoSeconds, years, days);
  const minutes = calculateMinutes(demoSeconds, years, days, hours);
  const seconds = calculateSeconds(demoSeconds, years, days, hours, minutes)

  const time = {
    years, days, hours, minutes, seconds
  }

  let totals = {
    players: totalPlayers,
    demos: totalDemos,
    exterms: totalExterms,
  }

  return {
    props: {
      leaderboard,
      totals,
      time
    },
    // Next.js re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}