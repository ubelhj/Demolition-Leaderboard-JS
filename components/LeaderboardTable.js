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

    let columns;
    if (!players[0]) {
        columns = []
    } else {
        columns = Object.keys(players[0]);
    }

    const options = {
        filterType: 'checkbox',
    };

    return <MUIDataTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
    />
}

