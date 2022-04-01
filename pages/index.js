import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import LeaderboardTable from '@components/LeaderboardTable'
const fetch = require('isomorphic-fetch');

export default function Home({players, totalDemos, totalExterms, time}) {

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
          Collectively, {players.length.toLocaleString('en-US')} members have 
          demolished {totalDemos.toLocaleString('en-US')} unsuspecting players, 
          leading to {totalExterms.toLocaleString('en-US')} exterminations
        </p>
        <p>
          Victims have waited a total of {time.days} days, {time.hours} hours, {time.minutes} minutes, 
          and {time.seconds} seconds  to respawn
        </p>
        
      </main>
      <LeaderboardTable players={players}/>
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

  let players = []
  let totalDemos = 0;
  let totalExterms = 0;
  for (let player in leaderboard) {
    let playerData = leaderboard[player];
    let date = new Date(playerData["LastUpdate"]);
    let dateString = date.toLocaleDateString();
    let playerDemos = parseInt(playerData["Demolitions"]);
    totalDemos += playerDemos;
    let playerExterms = parseInt(playerData["Exterminations"]);
    totalExterms += playerExterms;
    let newPlayer = {
      "Name": playerData["Name"],
      "Demolitions": playerDemos,
      "Exterminations": playerExterms,
      "Last Update": dateString,
    }
    players.push(newPlayer);
  }

  players.sort((a, b) => {
    return b.Demolitions - a.Demolitions;
  })

  let i = 1;
  for (let player in players) {
    players[player].DemolitionsRank = i;
    i++;
  }

  players.sort((a, b) => {
    return b.Exterminations - a.Exterminations;
  })
  i = 1;
  for (let player in players) {
    players[player].ExterminationsRank = i;
    i++;
  }

  let days = Math.floor(3 * totalDemos / 60 / 60 / 24);
  let hours = Math.floor(3 * totalDemos / 60 / 60) - (days * 24);
  let minutes = Math.floor(3 * totalDemos / 60) - (days * 24 * 60) - (hours * 60);
  let seconds = (3 * totalDemos) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  let time = {
    days, hours, minutes, seconds
  }

  return {
    props: {
      players,
      totalDemos,
      totalExterms,
      time
    },
    // Next.js re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}