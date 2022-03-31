import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import LeaderboardTable from '@components/LeaderboardTable'
const fetch = require('isomorphic-fetch');

export default function Home({leaderboard}) {

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <LeaderboardTable leaderboard={{leaderboard}}/>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  // TODO put downloadData content in here
  let leaderboard = await fetch("http://localhost:8888/.netlify/functions/downloadData")
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      });

  console.log(leaderboard["181981061763301377"]);


  return {
      props: {
          leaderboard,
      }
  };
}