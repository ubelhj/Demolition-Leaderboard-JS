import MUIDataTable from "mui-datatables";
export default function LeaderboardTable({ leaderboard }) {
    let players = [];

    let lb = leaderboard.leaderboard;

    for (let player in lb) {
        let playerData = lb[player];
        let date = new Date(playerData["LastUpdate"]);
        let dateString = date.toLocaleDateString();
        let newPlayer = {
            "Name": playerData["Name"],
            "Demolitions": parseInt(playerData["Demolitions"]),
            "Exterminations": parseInt(playerData["Exterminations"]),
            "Last Update": dateString,
        }
        players.push(newPlayer);
    }

    let columns = [
        {
            name: 'Name',
            options: {
                 filter: false
            },
        },
        {
            name: 'Demolitions',
            options: {
                filter: false,
                sortDescFirst: true
            },
        },
        {
            name: 'Exterminations',
            options: {
                filter: false,
                sortDescFirst: true
            },
        },
        {
            name: 'Last Update',
            options: {
                 filter: true
            },
        },
    ];

    const options = {
    };

    return <MUIDataTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
    />
}

