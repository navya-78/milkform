import ScheduleCard from "../components/ScheduleCard";

export default function Schedule({ schedules = [], onEdit, onDelete }) {
  return (
    <main>
      <h1>Delivery Schedule</h1>
      {schedules.length === 0 ? (
        <p>No schedules found.</p>
      ) : (
        schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </main>
  );
}