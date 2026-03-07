import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../api/baseapi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const features = [
    {
      icon: "⚡",
      title: "Fast Generation",
      description: "Create websites in seconds with our optimized AI engine.",
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Clean UI with Tailwind CSS integration out of the box.",
    },
    {
      icon: "🤖",
      title: "AI Powered",
      description: "Smart prompt-based builder that understands your needs.",
    },
  ];

  const handlegoogleauth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await api.post("/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      });
      dispatch(setUserData(data));

      console.log(data);
      toast.success("Logged in successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
      setIsModalOpen(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Build Stunning Websites <br className="hidden md:block" />
              <span className="text-blue-600">with AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Generate modern websites instantly using simple prompts powered by
              AI. No coding required, just your imagination.
            </p>
            {!userData && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </motion.button>
            )}

            {userData && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Link to="dashboard"> Go to Dashboard</Link>
              </motion.button>
            )}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium">
            © 2026 AI Builder. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Get Started Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  🚀
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to AI Website Builder
                </h2>
                <p className="text-gray-600 mb-8">
                  Sign in to start generating your dream website in minutes.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-300"
                  onClick={handlegoogleauth}
                >
                  <span className="text-xl"> G </span>
                  Login with Google
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
