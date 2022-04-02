import Head from 'next/head'
import Header from '@components/Header'
import LeaderboardTable from '@components/LeaderboardTable'
const fetch = require('isomorphic-fetch');

export default function Home({leaderboard, totals, time}) {
  return (
    <div className="container">
      <Head>
        <title>Demolition Leaderboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to the Demolition Leaderboard!" />
        <p className="description">
          Join the leaderboard on the Discord <a href="https://discord.gg/bSNhUbQ">
            https://discord.gg/bSNhUbQ</a>
        </p>
        <p>
          Collectively, {totals.players.toLocaleString()} members have 
          demolished {totals.demos.toLocaleString()} unsuspecting players, 
          leading to {totals.exterms.toLocaleString()} exterminations
        </p>
        <p>
          Victims have waited a total of {time.days} days, {time.hours} hours, {time.minutes} minutes, 
          and {time.seconds} seconds  to respawn
        </p>
        
      </main>
      <LeaderboardTable leaderboard={leaderboard}/>
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

  let days = Math.floor(3 * totalDemos / 60 / 60 / 24);
  let hours = Math.floor(3 * totalDemos / 60 / 60) - (days * 24);
  let minutes = Math.floor(3 * totalDemos / 60) - (days * 24 * 60) - (hours * 60);
  let seconds = (3 * totalDemos) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  let time = {
    days, hours, minutes, seconds
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