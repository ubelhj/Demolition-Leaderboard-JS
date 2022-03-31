import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import LeaderboardTable from '@components/LeaderboardTable'
const fetch = require('isomorphic-fetch');

export default function Home({leaderboard}) {

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
        <LeaderboardTable leaderboard={{leaderboard}}/>
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

  return {
      props: {
          leaderboard,
      }
  };
}