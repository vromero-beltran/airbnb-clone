import { Link } from 'react-router-dom';
export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="text-center mb-4">
          <input type="email" placeholder="Your@email.com" />
          <input type="password" placeholder="Password" />
          <button type="submit primary">
            Login
          </button>
          <div className="text-center py-2">
            Don&apos;t have an account yet? <Link className="underline text-black" to={"/register"}>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
