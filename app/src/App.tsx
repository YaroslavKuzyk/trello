import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route } from "react-router";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/features/auth";
import { NotFoundPage, PrivacyPage, TermsPage } from "@/features/static";
import { WorkboardPage } from "@/features/workboard";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<WorkboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="/workboard/:workboardId" element={<WorkboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
