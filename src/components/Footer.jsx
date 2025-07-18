import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

const Footer = ({
  authorName = "Mahesh",
  authorUrl = "https://maheshhattimare.vercel.app/",
  position = "sticky", // relative, fixed, sticky
  theme = "light", // auto, light, dark
  className = "bg-transparent",
}) => {
  // Auto-detect current year
  const currentYear = new Date().getFullYear();

  // Determine footer position classes
  const getPositionClasses = () => {
    switch (position) {
      case "fixed":
        return "fixed bottom-0 left-0 right-0 z-50";
      case "sticky":
        return "sticky bottom-0 z-40";
      default:
        return "relative";
    }
  };

  // Theme-aware classes
  const getThemeClasses = () => {
    if (theme === "light") {
      return "bg-white/90 text-gray-600 border-gray-200";
    } else if (theme === "dark") {
      return "bg-gray-900/90 text-gray-400 border-gray-700";
    }
    // Auto theme - adapts to system/context
    return "bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  };

  return (
    <footer
      className={`
        ${getPositionClasses()}
        ${getThemeClasses()}
        backdrop-blur-md border-t transition-all duration-300
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-2 sm:space-y-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Content */}
          <div className="flex items-center space-x-2 text-sm">
            <span>© {currentYear} Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current anima" />
            </motion.div>
            <span>by</span>
            <motion.a
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 flex items-center space-x-1 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{authorName}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.a>
          </div>

          {/* Optional: All Rights Reserved (only on larger screens) */}
          <div className="hidden sm:block text-xs text-gray-500 dark:text-gray-500">
            All Rights Reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
