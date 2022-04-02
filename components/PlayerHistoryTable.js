import MaterialTable from '@material-table/core';
export default function PlayerHistoryPanel({ rowData }) {
    let columns = [
        {
            title: 'Demolitions',
            field: 'Demolitions',
            render: (data) => {
                return parseInt(data.Demolitions).toLocaleString();
            }
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
            render: (data) => {
                return parseInt(data.Exterminations).toLocaleString();
            }
        },
        {
            title: 'Update Time',
            field: 'Time',
            defaultSort: 'desc',
            render: (data) => {
                let dateTime = new Date(data.Time);
                let dateString = dateTime.toLocaleDateString();
                dateString += " " + dateTime.toLocaleTimeString();
                return dateString;
            }
        }
    ];

    const options = {
        thirdSortClick: false,
        idSynonym: "Time",
        pageSize: 10,
        pageSizeOptions: [10, 15, 25, 50, 100],
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
        draggable: false,
    };

    return <MaterialTable
        title={rowData.Name + "'s Update History"}
        data={rowData.History}
        columns={columns}
        options={options}
    />
}