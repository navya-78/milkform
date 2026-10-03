// ConfirmDialog.jsx
export default function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <h2 id="confirm-title">{title}</h2>
      <p>{message}</p>
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="button" onClick={onConfirm}>Confirm</button>
    </div>
  );
}