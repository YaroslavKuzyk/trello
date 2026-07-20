import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route } from "react-router";
import { LoginPage, RegisterPage } from "@/features/auth";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
