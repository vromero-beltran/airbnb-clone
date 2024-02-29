export default function LoginPage() {
  return (
    <div className="login-page">
      <h1 className="login-h1 ">Login</h1>
      <form className="login-form">
        <input type="email" placeholder="Your@email.com" />
        <input type="password" placeholder="Password" />
        <button type="submit primary">Login</button>
      </form>
    </div>
  );
}
