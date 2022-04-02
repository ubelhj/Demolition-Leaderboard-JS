import PlayerHistoryTable from '@components/PlayerHistoryTable'
export default function PlayerHistoryPanel({ rowData }) {
    return (
        <div class="playerHistoryPanel">
          {PlayerHistoryTable({ rowData })}
        </div>
    )
}