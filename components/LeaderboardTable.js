import MaterialTable from '@material-table/core';
import PlayerHistoryPanel from '@components/PlayerHistoryPanel'
export default function LeaderboardTable({ players }) {

    let columns = [
        {
            title: 'Name',
            field: 'Name',
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
        {
            title: 'Country',
            field: 'Country'
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
        detailPanelType: "single",
        columnsButton: true,
        draggable: false,
    };

    return <MaterialTable
        title={"Demolition Leaderboard"}
        data={players}
        columns={columns}
        options={options}
        detailPanel={({rowData}) => {
            return PlayerHistoryPanel({rowData});
        }}
        onRowClick={(event, rowData, toggleDetailPanel) => {
            toggleDetailPanel();
        }}
    />
}