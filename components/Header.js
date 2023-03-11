import Head from 'next/head'


export default function Header({ totals, time }) {

  return (
    <>
      <h1 className="title">Welcome to the Demolition Leaderboard!</h1>
      <Head>
        <title>Demolition Leaderboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
    </>
  )
}
