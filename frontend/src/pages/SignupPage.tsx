import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/signup", { name, email, password });
      auth?.login(res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 border p-6 rounded shadow w-96 bg-white"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
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
            <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
          </span>
        </div>

        <Button type="submit">Signup</Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
