import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route } from "react-router";
import { LoginPage, RegisterPage } from "@/features/auth";
import { NotFoundPage, PrivacyPage, TermsPage } from "@/features/static";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
