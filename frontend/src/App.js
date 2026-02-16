import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TeacherProtectedRoute from "./components/TeacherProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/teacher/login" replace />} />
        <Route path="/teacher/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/teacher/dashboard"
          element={
            <TeacherProtectedRoute>
              <TeacherDashboard />
            </TeacherProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/teacher/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
