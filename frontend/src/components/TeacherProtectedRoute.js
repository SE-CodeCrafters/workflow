import { Navigate } from "react-router-dom";
import { TEACHER_TOKEN_KEY } from "../constants/storage";

export default function TeacherProtectedRoute({ children }) {
  const token = localStorage.getItem(TEACHER_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/teacher/login" replace />;
  }

  return children;
}
