export default function ScheduleCard({ schedule, onEdit, onDelete }) {
  return (
    <article>
      <h2>{schedule.title ?? "Delivery schedule"}</h2>
      <p>Frequency: {schedule.frequency ?? "—"}</p>
      <p>Next delivery: {schedule.nextDelivery ?? "—"}</p>
      <p>Status: {schedule.status ?? "Active"}</p>
      {onEdit && (
        <button type="button" onClick={() => onEdit(schedule)}>
          Edit
        </button>
      )}
      {onDelete && (
        <button type="button" onClick={() => onDelete(schedule)}>
          Delete
        </button>
      )}
    </article>
  );
}