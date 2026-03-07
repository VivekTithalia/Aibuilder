import { motion } from "framer-motion";

const Generatepage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 px-6 py-8 sm:px-10 sm:py-10"
        >
          <div className="mb-6 sm:mb-8 text-center sm:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              Build Websites with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl"
            >
              Describe your dream website in as much detail as you can – pages,
              sections, colors, content, and vibe. Our AI will use your
              description to generate a modern, responsive layout tailored to
              your idea.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <label
              htmlFor="website-description"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
            >
              Website description
            </label>
            <textarea
              id="website-description"
              rows={8}
              placeholder="Describe the website you want to build in detail. For example: a modern landing page for a SaaS product with pricing section, testimonials, FAQ, dark header, and call-to-action buttons..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3 sm:py-4 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-inner"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="mt-6 sm:mt-8 flex justify-center sm:justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97, y: 0 }}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
            >
              <span>Generate Website</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Generatepage;
