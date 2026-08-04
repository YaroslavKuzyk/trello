import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route } from "react-router";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/features/auth";
import { NotFoundPage, PrivacyPage, TermsPage } from "@/features/static";
import { WorkboardPage } from "@/features/workboard";
import RequireGuest from "./features/auth/components/RequireGuest";
import RequireAuth from "./features/auth/components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {/* доступні всім */}
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />

        {/* доступні тільки зареєстрованим */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<WorkboardPage />} />
          <Route path="/workboard/:workboardId" element={<WorkboardPage />} />
        </Route>

        {/* доступні тільки не зареєстрованим */}
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
