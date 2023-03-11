import MaterialTable from '@material-table/core';


export default function CountryLeaderboardTable({ leaderboard }) {
    //let players = players;

    let players = []
    for (let player in leaderboard) {
        let playerData = leaderboard[player];
        let playerDemos = parseInt(playerData["Demolitions"]);
        let playerExterms = parseInt(playerData["Exterminations"]);
        let newPlayer = {
            "Demolitions": playerDemos,
            "Exterminations": playerExterms,
            "Country": playerData.Country?.toUpperCase(),
        }
        players.push(newPlayer);
    }

    const countriesWithDemos = players.map((p) => {
        return {Country: p.Country, Demolitions: p.Demolitions, Exterminations: p.Exterminations }
    })
    const filteredCountriesWithDemos = countriesWithDemos.filter((c) => c.Country?.length === 3)

    const countryData = filteredCountriesWithDemos.reduce(function(acc, cur) {
        const index = acc.findIndex(c => c.Country === cur.Country);
        const obj = {
            Country: cur.Country,
            Demolitions: cur.Demolitions,
            Exterminations: cur.Exterminations
        }
        if(index < 0) {
            acc.push(obj)
        } else {
            acc[index].Demolitions = acc[index].Demolitions + cur.Demolitions;
            acc[index].Exterminations = acc[index].Exterminations + cur.Exterminations;
        }
        
        return acc;
      }, [])

    countryData.sort((a, b) => {
        return b.Demolitions - a.Demolitions;
    })

    let i = 1;
    for (let country in countryData) {
        countryData[country].DemolitionsRank = i;
        i++;
    }

    countryData.sort((a, b) => {
        return b.Exterminations - a.Exterminations;
    })
    
    let j = 1;
    for (let country in countryData) {
        countryData[country].ExterminationsRank = j;
        j++;
    }

    let columns = [
        {
            title: 'Country',
            field: 'Country'
        },
        {
            title: 'Demolitions',
            field: 'Demolitions',
            defaultSort: 'desc',
            render: (data) => {
                return data.Demolitions.toLocaleString();
            }
        },
        {
            title: 'Demolitions Rank',
            field: 'DemolitionsRank',
            defaultSort: 'asc'
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
            defaultSort: 'desc',
            render: (data) => {
                return data.Exterminations.toLocaleString();
            }
        },
        {
            title: 'Exterminations Rank',
            field: 'ExterminationsRank',
            defaultSort: 'asc'
        },
    ];

    const options = {
        thirdSortClick: false,
        idSynonym: "Name",
        pageSize: 25,
        pageSizeOptions: [10, 15, 25, 50, 100],
        showTitle: false,
        padding: "dense",
        tableLayout: "auto",
        tableWidth: "fixed",
        emptyRowsWhenPaging: false,
        
        rowStyle: (data, index, level) => {
            if (index % 2 == 0) {
                return {
                    backgroundColor: "#FFFFFF",
                }
            } else {
                return {
                    backgroundColor: "#F8F8F8",
                }
            }
        },
        headerStyle: {
            backgroundColor: '#F8F8F8',
        },
        detailPanelType: "single",
        columnsButton: true,
        draggable: false,
    };

    return <MaterialTable
        title={"Country Demolition Leaderboard"}
        data={countryData}
        columns={columns}
        options={options}
    />
}