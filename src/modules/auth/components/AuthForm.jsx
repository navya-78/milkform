export default function AuthForm({
  title,
  fields = [],
  submitLabel = "Submit",
  onSubmit,
  children,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit?.(Object.fromEntries(formData.entries()));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>

      {fields.map((field) => (
        <label key={field.name}>
          {field.label}
          <input
            name={field.name}
            type={field.type ?? "text"}
            required={field.required ?? true}
            autoComplete={field.autoComplete}
          />
        </label>
      ))}

      {children}
      <button type="submit">{submitLabel}</button>
    </form>
  );
}