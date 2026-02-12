export default function Login() {
  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" />
      <br />
      <input type="password" placeholder="Password" />
      <br />

      <select>
        <option>Student</option>
        <option>Teacher</option>
      </select>

      <br />
      <button>Login</button>
    </div>
  );
}
