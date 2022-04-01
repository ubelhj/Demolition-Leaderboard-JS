import MaterialTable from '@material-table/core';
export default function LeaderboardTable({ players }) {
    //let players = players;

    let columns = [
        {
            title: 'Name',
            field: 'Name',
            cellStyle: {
                'overflow-wrap': 'break-word',
            },
        },
        {
            title: 'Demolitions',
            field: 'Demolitions',
            defaultSort: 'desc'
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
            defaultSort: 'desc'
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
        tableLayout: "fixed",
        tableWidth: "full",
        
    };

    return <MaterialTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
    />
}