import MaterialTable from '@material-table/core';
export default function PlayerHistoryPanel({ rowData }) {
    let columns = [
        {
            title: 'Demolitions',
            field: 'Demolitions',
            render: (data) => {
                return data.Demolitions.toLocaleString();
            }
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
            render: (data) => {
                return data.Exterminations.toLocaleString();
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
    
    };

    return <MaterialTable
        title={rowData.Name + "'s Update History"}
        data={rowData.History}
        columns={columns}
        options={options}
    />
}