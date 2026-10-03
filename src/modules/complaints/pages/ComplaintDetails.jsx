export default function ComplaintDetails({ complaint }) {
  if (!complaint) return <p>Complaint not found.</p>;

  return (
    <main>
      <h1>{complaint.title}</h1>
      <p>{complaint.description}</p>
      <p>Status: {complaint.status ?? "Open"}</p>
      {complaint.createdAt && (
        <p>Created: {new Date(complaint.createdAt).toLocaleDateString()}</p>
      )}
    </main>
  );
}