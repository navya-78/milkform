import AuthForm from "../components/AuthForm";
import { resetPassword } from "../authService";

export default function ResetPassword() {
  async function handleSubmit(values) {
    const token = new URLSearchParams(window.location.search).get("token");

    try {
      await resetPassword({ ...values, token });
      alert("Your password has been reset.");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <AuthForm
      title="Reset password"
      fields={[
        {
          name: "password",
          label: "New password",
          type: "password",
          autoComplete: "new-password",
        },
      ]}
      submitLabel="Reset password"
      onSubmit={handleSubmit}
    />
  );
}