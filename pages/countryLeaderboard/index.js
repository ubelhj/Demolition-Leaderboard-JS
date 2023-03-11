import Head from 'next/head'
import Header from '@components/Header'
import { calculateDays, calculateHours, calculateMinutes, calculateSeconds, calculateYears } from '@components/utils/timeHelper';
import CountryLeaderboardTable from '@components/CountryLeaderboardTable';
const fetch = require('isomorphic-fetch');

export default function CountryLeaderboard({leaderboard, totals, time}) {
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
            Victims have waited a total of {time.years} year, {time.days} days, {time.hours} hours, {time.minutes} minutes, 
            and {time.seconds} seconds  to respawn
          </p>
          
        </main>
        <div>
        <a href="/">
          <button>
            Player Leaderboard
          </button>
        </a>
      </div>
        <CountryLeaderboardTable leaderboard={leaderboard}/>
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