export default function GameHistory({ history }: any) {
  return (
    <div>
      <h3>Lịch sử trận đấu</h3>

      <ul>
        {history.map((item: any) => (
          <li key={item.id}>
            Bạn: {item.player} | Máy: {item.computer} | Kết quả: {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}   