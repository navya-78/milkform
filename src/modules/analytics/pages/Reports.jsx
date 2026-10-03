export default function Reports({ reports = [] }) {
  return (
    <main>
      <h1>Reports</h1>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              {report.name} {report.date && `— ${report.date}`}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}