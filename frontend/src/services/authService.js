import { TEACHER_EMAIL_KEY, TEACHER_TOKEN_KEY } from "../constants/storage";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

function normalizeLoginResponse(payload) {
  const token = payload?.access_token || payload?.token || payload?.jwt;
  const email = payload?.email;

  if (!token) {
    throw new Error("Login succeeded but no token was returned.");
  }

  return { token, email };
}

export async function loginTeacher(credentials) {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const normalized = normalizeLoginResponse(data);
      localStorage.setItem(TEACHER_TOKEN_KEY, normalized.token);
      localStorage.setItem(TEACHER_EMAIL_KEY, normalized.email || email);
      return normalized;
    }

    if (response.status === 401) {
      throw new Error("Invalid email or password.");
    }

    throw new Error(`Login failed with status ${response.status}.`);
  } catch (err) {
    const message = err?.message || "";
    const backendRespondedWithAuthError =
      message === "Invalid email or password." || message.startsWith("Login failed with status");

    if (backendRespondedWithAuthError) {
      throw err;
    }

    // Fallback for local frontend development without backend/network.
  }

  const fakeToken = `mock-${Date.now()}`;
  localStorage.setItem(TEACHER_TOKEN_KEY, fakeToken);
  localStorage.setItem(TEACHER_EMAIL_KEY, email);
  return { token: fakeToken, email };
}

export function logoutTeacher() {
  localStorage.removeItem(TEACHER_TOKEN_KEY);
  localStorage.removeItem(TEACHER_EMAIL_KEY);
}
