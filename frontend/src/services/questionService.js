import { QUESTIONS_KEY, TEACHER_TOKEN_KEY } from "../constants/storage";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

const DEFAULT_QUESTIONS = [
  {
    id: "q-1",
    questionText: "Choose the correctly punctuated sentence.",
    choices: [
      "Lets eat, Grandma!",
      "Let's eat Grandma!",
      "Lets eat Grandma!",
      "Let's eat, Grandma!",
    ],
    correctAnswer: 3,
    order: 1,
  },
  {
    id: "q-2",
    questionText: "Select the synonym of 'rapid'.",
    choices: ["slow", "quick", "silent", "small"],
    correctAnswer: 1,
    order: 2,
  },
];

function readLocalQuestions() {
  const stored = localStorage.getItem(QUESTIONS_KEY);
  if (!stored) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
    return DEFAULT_QUESTIONS;
  }

  try {
    return JSON.parse(stored);
  } catch (_) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
    return DEFAULT_QUESTIONS;
  }
}

function writeLocalQuestions(questions) {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
}

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem(TEACHER_TOKEN_KEY);
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getAllQuestions() {
  try {
    const data = await apiRequest("/api/questions", { method: "GET" });
    return Array.isArray(data) ? data : data?.items || [];
  } catch (_) {
    return readLocalQuestions();
  }
}

export async function createQuestion(payload) {
  try {
    return await apiRequest("/api/questions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (_) {
    const questions = readLocalQuestions();
    const question = {
      id: `q-${Date.now()}`,
      ...payload,
      order: Number(payload.order) || questions.length + 1,
    };
    const updated = [...questions, question].sort((a, b) => a.order - b.order);
    writeLocalQuestions(updated);
    return question;
  }
}

export async function updateQuestion(id, payload) {
  try {
    return await apiRequest(`/api/questions/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (_) {
    const questions = readLocalQuestions();
    const updated = questions
      .map((q) => (q.id === id ? { ...q, ...payload, id } : q))
      .sort((a, b) => a.order - b.order);
    writeLocalQuestions(updated);
    return updated.find((q) => q.id === id);
  }
}

export async function deleteQuestion(id) {
  try {
    await apiRequest(`/api/questions/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (_) {
    const questions = readLocalQuestions();
    const updated = questions.filter((q) => q.id !== id);
    writeLocalQuestions(updated);
    return true;
  }
}
