import { useState } from "react";
import { Sparkles, Heart, Star, Zap, Crown, Smile } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const stripMarkdown = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
  };

  const getPrompt = (name, lang) => {
    const base = `Imagine you're a creative and witty storyteller. Explain the meaning of the name "${name}" in a short, fun, and meaningful way — like a magical tale or a charming legend. Make it feel special, playful, and unforgettable, as if the name itself has a secret story.`;

    const langNote = {
      english: "",
      hindi: "(respond in Hindi)",
      marathi: "(respond in Marathi)",
    };

    return `${base} ${langNote[lang]}`;
  };

  const fetchNameMeaning = async () => {
    try {
      setIsLoading(true);
      setShowResult(false);

      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = getPrompt(name, language);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const rawText = response.text();
      const cleanText = stripMarkdown(rawText);

      setMeaning(cleanText);
      setShowResult(true);
    } catch (error) {
      console.error("Error while getting name meaning:", error);
      setMeaning("Oops! Something went wrong. Try again!");
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    fetchNameMeaning();
  };

  const handleReset = () => {
    setName("");
    setMeaning("");
    setShowResult(false);
    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#155cfd] rounded-full mb-4 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 px-2">
              What's Your Name Magic? ✨
            </h1>
            <p className="text-gray-600 text-base sm:text-lg px-2">
              Discover the hilarious hidden meaning behind your name!
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6 transform transition-all duration-300 hover:scale-105">
            {!showResult ? (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your magical name..."
                    className="w-full px-6 py-4 text-lg sm:text-xl border-2 border-gray-200 rounded-2xl focus:border-[#155cfd] focus:outline-none transition-colors duration-300 bg-gray-50"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Star className="w-6 h-6 text-[#155cfd] animate-pulse" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-lg focus:border-[#155cfd] focus:outline-none"
                  >
                    <option value="english">English (default)</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || isLoading}
                  className="w-full bg-[#155cfd] hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-8 rounded-2xl text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Revealing the magic...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-6 h-6 mr-2" />
                      Discover My Name Magic!
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6 animate-fadeIn">
                <div className="flex justify-center space-x-2 mb-4">
                  <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
                  <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                  <Star className="w-8 h-8 text-[#155cfd] animate-spin" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 px-2">
                  {name.charAt(0).toUpperCase() + name.slice(1)}, you are a...
                </h2>

                <div className="bg-gradient-to-r from-[#155cfd] to-purple-500 text-white p-4 sm:p-6 rounded-2xl shadow-lg mx-2 sm:mx-0">
                  <p className="text-lg sm:text-xl leading-relaxed font-medium text-center">
                    {meaning}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 px-2 sm:px-0">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Try Another Name
                  </button>
                  <button
                    onClick={() =>
                      navigator.share
                        ? navigator
                            .share({
                              title: "My Name Magic",
                              text: `${name} is a ${meaning}`,
                              url: window.location.href,
                            })
                            .catch((err) => {
                              alert("Sharing failed 😢");
                              console.error("Share error:", err);
                            })
                        : alert("Sharing is not supported on this device.")
                    }
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <Smile className="w-5 h-5 mr-2" />
                    Share the Magic
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm absolute bottom-4 left-0 right-0">
            <p>
              ✨ Made with love and a sprinkle of randomness by{" "}
              <a
                href="https://maheshhattimare.vercel.app/"
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                Mahesh
              </a>{" "}
              ✨
            </p>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default App;
