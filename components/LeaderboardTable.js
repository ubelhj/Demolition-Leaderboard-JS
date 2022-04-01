import MaterialTable from '@material-table/core';
export default function LeaderboardTable({ players }) {
    //let players = players;

    let columns = [
        {
            title: 'Name',
            field: 'Name',
        },
        {
            title: 'Demolitions',
            field: 'Demolitions',
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
        },
        {
            title: 'Last Update',
            field: 'Last Update',
        },
    ];

    const options = {
        thirdSortClick: false,
    };

    return <MaterialTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
    />
}