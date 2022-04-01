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
    };

    return <MaterialTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
    />
}