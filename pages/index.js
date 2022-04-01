import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import LeaderboardTable from '@components/LeaderboardTable'
const fetch = require('isomorphic-fetch');

export default function Home({players, totalDemos, totalExterms}) {

  return (
    <div className="container">
      <Head>
        <title>Demolition Leaderboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to the Demolition Leaderboard!" />
        <p className="description">
          Join the leaderboard on the Discord <a href="https://discord.gg/bSNhUbQ">https://discord.gg/bSNhUbQ</a>
        </p>
        <p>
          Collectively, {players.length} members have demolished {totalDemos} unsuspecting players, 
          leading to {totalExterms} exterminations 
          and making their victims wait a total of {3 * totalDemos} seconds
        </p>
        <LeaderboardTable players={players}/>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps(context) {
  let leaderboard = await fetch("https://demolition-leaderboard.netlify.app/.netlify/functions/downloadData")
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
    if (a.Demolitions !== b.Demolitions) {
      return b.Demolitions - a.Demolitions;
    }
    if (a.Exterminations !== b.Exterminations) {
      return b.Exterminations - a.Exterminations;
    }
    return String.compare(a.Name, b.Name);
  })

  return {
      props: {
          leaderboard,
          players,
          totalDemos,
          totalExterms
      },
      // Next.js re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 60, // In seconds
  };
}