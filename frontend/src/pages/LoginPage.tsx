import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      auth?.login(res.data.token);
    } catch (err: any) {
      if (err.response) setError(err.response.data.message);
      else setError("Network error");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 border p-6 rounded shadow w-96 bg-white"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        {/* Password with CDN Eye Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* Fixed logic: show eye when hidden, eye-off when visible */}
            <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
          </span>
        </div>

        <Button type="submit">Login</Button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
