import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEACHER_EMAIL_KEY } from "../../constants/storage";
import { logoutTeacher } from "../../services/authService";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
} from "../../services/questionService";
import "../../styles/teacher-dashboard.css";

const EMPTY_FORM = {
  questionText: "",
  choiceA: "",
  choiceB: "",
  choiceC: "",
  choiceD: "",
  correctAnswer: "0",
  order: "",
};

function mapQuestionToForm(question) {
  return {
    questionText: question.questionText || "",
    choiceA: question.choices?.[0] || "",
    choiceB: question.choices?.[1] || "",
    choiceC: question.choices?.[2] || "",
    choiceD: question.choices?.[3] || "",
    correctAnswer: String(question.correctAnswer ?? 0),
    order: String(question.order ?? ""),
  };
}

function mapFormToPayload(form, questionsLength) {
  return {
    questionText: form.questionText.trim(),
    choices: [form.choiceA, form.choiceB, form.choiceC, form.choiceD].map((item) => item.trim()),
    correctAnswer: Number(form.correctAnswer),
    order: Number(form.order) || questionsLength + 1,
  };
}

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const teacherEmail = localStorage.getItem(TEACHER_EMAIL_KEY) || "teacher@school.edu";

  const sortedQuestions = useMemo(
    () => [...questions].sort((a, b) => Number(a.order) - Number(b.order)),
    [questions]
  );

  async function loadQuestions() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message || "Failed to load questions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditId("");
  }

  function openCreateModal() {
    resetForm();
    setError("");
    setIsFormOpen(true);
  }

  function openEditModal(question) {
    setForm(mapQuestionToForm(question));
    setEditId(question.id);
    setError("");
    setIsFormOpen(true);
  }

  function closeModal() {
    setIsFormOpen(false);
    resetForm();
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    if (!form.questionText.trim()) return "Question text is required.";
    if (!form.choiceA.trim() || !form.choiceB.trim() || !form.choiceC.trim() || !form.choiceD.trim()) {
      return "All 4 answer choices are required.";
    }
    if (!["0", "1", "2", "3"].includes(form.correctAnswer)) {
      return "Correct answer must match one of the options.";
    }
    return "";
  }

  async function handleSave(event) {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");
    setNotice("");

    const payload = mapFormToPayload(form, questions.length);

    try {
      if (editId) {
        await updateQuestion(editId, payload);
        setNotice("Question updated.");
      } else {
        await createQuestion(payload);
        setNotice("Question created.");
      }

      await loadQuestions();
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save question.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(questionId) {
    const confirmed = window.confirm("Delete this question?");
    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await deleteQuestion(questionId);
      setQuestions((prev) => prev.filter((item) => item.id !== questionId));
      setNotice("Question deleted.");
    } catch (err) {
      setError(err.message || "Failed to delete question.");
    }
  }

  function handleLogout() {
    logoutTeacher();
    navigate("/teacher/login");
  }

  return (
    <div className="teacher-page">
      <header className="teacher-header">
        <div>
          <h1>Teacher Dashboard</h1>
          <p>{teacherEmail}</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="teacher-main">
        <section className="teacher-panel">
          <div className="panel-topbar">
            <h2>Questions</h2>
            <button className="btn" onClick={openCreateModal}>
              Add Question
            </button>
          </div>

          {notice ? <p className="notice">{notice}</p> : null}
          {error && !isFormOpen ? <p className="error">{error}</p> : null}

          {loading ? (
            <p>Loading questions...</p>
          ) : sortedQuestions.length === 0 ? (
            <p>No questions yet. Add your first question.</p>
          ) : (
            <>
              <div className="question-table-wrap">
                <table className="question-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Question</th>
                      <th>Correct</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedQuestions.map((question) => (
                      <tr key={question.id}>
                        <td>{question.order}</td>
                        <td>{question.questionText}</td>
                        <td>{question.choices?.[question.correctAnswer]}</td>
                        <td className="actions-cell">
                          <button className="btn btn-small" onClick={() => openEditModal(question)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-small btn-danger"
                            onClick={() => handleDelete(question.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="question-cards">
                {sortedQuestions.map((question) => (
                  <article className="question-card" key={`card-${question.id}`}>
                    <p className="question-order">Question {question.order}</p>
                    <p>{question.questionText}</p>
                    <p>
                      <strong>Correct:</strong> {question.choices?.[question.correctAnswer]}
                    </p>
                    <div className="actions-cell">
                      <button className="btn btn-small" onClick={() => openEditModal(question)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {isFormOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>{editId ? "Edit Question" : "Add Question"}</h3>
            <form onSubmit={handleSave} className="question-form">
              <label>
                Question Text
                <textarea
                  name="questionText"
                  value={form.questionText}
                  onChange={onFormChange}
                  rows={3}
                  required
                />
              </label>

              <label>
                Choice A
                <input name="choiceA" value={form.choiceA} onChange={onFormChange} required />
              </label>

              <label>
                Choice B
                <input name="choiceB" value={form.choiceB} onChange={onFormChange} required />
              </label>

              <label>
                Choice C
                <input name="choiceC" value={form.choiceC} onChange={onFormChange} required />
              </label>

              <label>
                Choice D
                <input name="choiceD" value={form.choiceD} onChange={onFormChange} required />
              </label>

              <div className="inline-fields">
                <label>
                  Correct Answer
                  <select name="correctAnswer" value={form.correctAnswer} onChange={onFormChange}>
                    <option value="0">A</option>
                    <option value="1">B</option>
                    <option value="2">C</option>
                    <option value="3">D</option>
                  </select>
                </label>

                <label>
                  Order
                  <input
                    type="number"
                    min="1"
                    name="order"
                    value={form.order}
                    onChange={onFormChange}
                    placeholder={String(questions.length + 1)}
                  />
                </label>
              </div>

              {error ? <p className="error">{error}</p> : null}

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn" disabled={submitting}>
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
