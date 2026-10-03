import ComplaintCard from "../components/ComplaintCard";

export default function Complaints({ complaints = [], onView }) {
  return (
    <main>
      <h1>Complaints</h1>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            onView={onView}
          />
        ))
      )}
    </main>
  );
}