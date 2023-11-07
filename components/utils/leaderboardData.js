

const refactorLeaderboardData = (leaderboard) => {
    let players = []
    for (let player in leaderboard) {
        let playerData = leaderboard[player];
        let date = new Date(playerData["LastUpdate"]);
        let dateString = date.toLocaleDateString();
        let playerDemos = parseInt(playerData["Demolitions"]);
        let playerExterms = parseInt(playerData["Exterminations"]);
        let newPlayer = {
            "Name": playerData["Name"],
            "Demolitions": playerDemos,
            "Exterminations": playerExterms,
            "Last Update": dateString,
            "Country": playerData.Country?.toUpperCase(),
            "History": playerData.History
        }
        players.push(newPlayer);
    }
    return players
}

const getCountryData = (players) => {

    const countriesWithDemos = players.map((p) => {
        return {Country: p.Country, Demolitions: p.Demolitions, Exterminations: p.Exterminations }
    })

    const filteredCountriesWithDemos = countriesWithDemos.filter((c) => c.Country?.length === 3)

    const countryData = filteredCountriesWithDemos.reduce(function(acc, cur) {
        const index = acc.findIndex(c => c.Country === cur.Country);
        const obj = {
            Country: cur.Country,
            Demolitions: cur.Demolitions,
            Exterminations: cur.Exterminations,
            Contributors: 1
        }
        if(index < 0) {
            acc.push(obj)
        } else {
            acc[index].Demolitions = acc[index].Demolitions + cur.Demolitions;
            acc[index].Exterminations = acc[index].Exterminations + cur.Exterminations;
            acc[index].Contributors = acc[index].Contributors + 1;
        }
        
        return acc;
      }, [])

    countryData.sort((a, b) => {
        return b.Demolitions - a.Demolitions || b.Exterminations - a.Exterminations;
    })

    let i = 1;
    for (let country in countryData) {
        countryData[country].DemolitionsRank = i;
        i++;
    }

    countryData.sort((a, b) => {
        return b.Exterminations - a.Exterminations || b.Demolitions - a.Demolitions;
    })
    
    let j = 1;
    for (let country in countryData) {
        countryData[country].ExterminationsRank = j;
        j++;
    }

    return countryData
}


export const getPlayerAndCountryData = (leaderboard) => {
    const players = refactorLeaderboardData(leaderboard)
    const countryData = getCountryData(players)

    players.sort((a, b) => {
        return b.Demolitions - a.Demolitions || b.Exterminations - a.Exterminations;
    })

    let i = 1;
    for (let player in players) {
        players[player].DemolitionsRank = i;
        i++;
    }

    players.sort((a, b) => {
        return b.Exterminations - a.Exterminations || b.Demolitions - a.Demolitions;
    })

    let j = 1;
    for (let player in players) {
        players[player].ExterminationsRank = j;
        j++;
    }

    return {playerData: players, countryData: countryData}
}