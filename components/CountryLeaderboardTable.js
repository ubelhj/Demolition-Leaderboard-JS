import MaterialTable from '@material-table/core';


export default function CountryLeaderboardTable({ countryData }) {

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
        {
            title: 'Contributors',
            field: 'Contributors',
        },
    ];

    const options = {
        thirdSortClick: false,
        idSynonym: "Country",
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