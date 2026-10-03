import AuthForm from "../components/AuthForm";
import { requestPasswordReset } from "../authService";

export default function ForgotPassword() {
  async function handleSubmit(values) {
    try {
      await requestPasswordReset(values.email);
      alert("If the email is registered, password reset instructions will be sent.");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <AuthForm
      title="Forgot password"
      fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]}
      submitLabel="Send reset link"
      onSubmit={handleSubmit}
    />
  );
}