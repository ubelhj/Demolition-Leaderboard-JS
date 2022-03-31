
export default function LeaderboardTable({ leaderboard }) {
    let players = [];

    let lb = leaderboard.leaderboard;

    for (let player in lb) {
        let playerData = lb[player];
        let date = new Date(playerData["LastUpdate"]);
        let dateString = date.toLocaleDateString();
        let newPlayer = {
            "Name": playerData["Name"],
            "Demolitions": playerData["Demolitions"],
            "Exterminations": playerData["Exterminations"],
            "Last Update": dateString,
        }
        players.push(newPlayer);
    }

    let data;
    if (!players[0]) {
        data = []
    } else {
        data = Object.keys(players[0]);
    }

    let tableHead = 
        <thead key={"lbTableHead"}>
            <tr>
                {data.map((val) => {
                    return <td key={val}>{val}</td>;
                })}
            </tr>
        </thead>;

    let tableBody = 
        <tbody key={"lbTableBody"}>
            {players.map((playerStats) => {
                return <tr key={"row" + playerStats.Name}>
                    <td>{playerStats.Name}</td>
                    <td>{playerStats.Demolitions}</td>
                    <td>{playerStats.Exterminations}</td>
                    <td>{playerStats["Last Update"]}</td>
                </tr>
            })}
        </tbody>;

    return (
        <table id='LeaderboardTable'>
            {tableHead}
            {tableBody}
        </table>
    );
}

