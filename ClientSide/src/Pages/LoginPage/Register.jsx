import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const RegisterUser = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const { name, email, password } = formData;

    try {
      setLoading(true);

      const res = await axios.post("/api/register", { name, email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        navigate("/auth/login");
      }

    } catch (error) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setFormErrors({ general: error.response.data.message });
      } else {
        setFormErrors({ general: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:h-screen p-4 bg-white">
      <div className="max-w-md w-full mx-auto border border-black/30 rounded-2xl p-8 shadow-md">

        {formErrors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            <p className="text-sm">{formErrors.general}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={RegisterUser}>

          <div>
            <label className="text-black/80 text-sm font-medium mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`bg-white text-black border w-full text-sm px-4 py-3 rounded-md outline-red-400 ${formErrors.name ? 'border-red-500' : 'border-black/30'
                }`}
              placeholder="Enter your name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="text-black/80 text-sm font-medium mb-2 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`bg-white text-black border w-full text-sm px-4 py-3 rounded-md outline-red-400 ${formErrors.email ? 'border-red-500' : 'border-black/30'
                }`}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="text-black/80 text-sm font-medium mb-2 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`bg-white text-black border w-full text-sm px-4 py-3 rounded-md outline-red-400 ${formErrors.password ? 'border-red-500' : 'border-black/30'
                }`}
              placeholder="Enter password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 cursor-pointer"
                } focus:outline-none transition-colors`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="text-black/60 text-sm mt-6 text-center">
          Already have an account?
          <Link to="/auth/login" className="text-red-500 font-medium hover:underline ml-1">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
