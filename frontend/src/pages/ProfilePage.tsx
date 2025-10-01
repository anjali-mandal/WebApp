import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import apiClient from "../api/apiClient";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/auth/profile");
        setProfile(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err: any) {
        console.error("Fetch profile error:", err.response || err);
        setError("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.put("/auth/profile", formData);
      setProfile(res.data);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Save profile error:", err.response || err);
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Your Profile
            </h1>
            <p className="text-gray-500 mt-2">
              View and manage your personal information
            </p>
          </div>

          {/* Profile Card */}
          {profile ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
              <div className="flex flex-col items-center space-y-4 relative">
                {/* Avatar with camera icon */}
                <div className="relative w-32 h-32">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  {/* Camera icon only */}
                  <span className="absolute bottom-1 right-5 cursor-pointer text-gray-600 text-xl hover:text-gray-800">
                    <i className="ri-camera-line"></i>
                  </span>
                </div>

                {/* Info Section */}
                <div className="w-full text-center space-y-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                      />
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-gray-700">
                        {profile.name}
                      </p>
                      <p className="text-gray-500">{profile.email}</p>
                    </>
                  )}
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Buttons */}
                {isEditing ? (
                  <div className="flex space-x-4 mt-4">
                    <button
                      className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}{" "}
                      <i className="ri-save-line ml-2"></i>
                    </button>
                    <button
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: profile.name, email: profile.email });
                        setError(null);
                      }}
                    >
                      Cancel <i className="ri-close-line ml-2"></i>
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading profile...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
