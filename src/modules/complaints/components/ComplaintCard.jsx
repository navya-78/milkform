export default function ComplaintCard({ complaint, onView }) {
  return (
    <article>
      <h2>{complaint.title}</h2>
      <p>{complaint.description}</p>
      <p>Status: {complaint.status ?? "Open"}</p>
      {onView && (
        <button type="button" onClick={() => onView(complaint)}>
          View details
        </button>
      )}
    </article>
  );
}