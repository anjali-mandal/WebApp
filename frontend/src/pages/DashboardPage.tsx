import React from "react";
import Layout from "../components/Layout";
import TaskList from "../components/TaskList";

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      {/* Container */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Your Tasks
            </h1>
            <p className="text-gray-500 mt-2">
              Manage and track your tasks efficiently 
            </p>
          </div>

          {/* Card for Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
            <TaskList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
