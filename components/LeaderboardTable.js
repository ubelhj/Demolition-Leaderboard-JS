import MaterialTable from '@material-table/core';
export default function LeaderboardTable({ leaderboard }) {
    //let players = players;

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

    let columns = [
        {
            title: 'Name',
            field: 'Name',
        },
        {
            title: 'Demolitions',
            field: 'Demolitions',
            defaultSort: 'desc'
        },
        {
            title: 'Demolitions Rank',
            field: 'DemolitionsRank',
            defaultSort: 'asc'
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
            defaultSort: 'desc'
        },
        {
            title: 'Exterminations Rank',
            field: 'ExterminationsRank',
            defaultSort: 'asc'
        },
        {
            title: 'Last Update',
            field: 'Last Update',
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
    };

    return <MaterialTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
    />
}