// Modal.jsx
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <button type="button" onClick={onClose} aria-label="Close">
        ×
      </button>
      {children}
    </div>
  );
}