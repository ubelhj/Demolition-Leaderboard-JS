import PlayerHistoryTable from '@components/PlayerHistoryTable'
export default function PlayerHistoryPanel({ rowData }) {
    return (
        <div className="playerHistoryPanel">
          {PlayerHistoryTable({ rowData })}
        </div>
    )
}