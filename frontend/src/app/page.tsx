import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black text-white">
      <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Intelligent QA Test Plan Agent
      </h1>
      <p className="mt-4 text-xl text-gray-400 text-center max-w-2xl">
        Automatically generate Test Plans, Test Scenarios, Test Cases, and Playwright Skeletons directly from JIRA tickets using LLMs.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 hover:border-gray-600 transition-colors backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-2">Configure Integration 🔗</h2>
          <p className="text-gray-400 mb-6 font-medium">Connect your Jira Account & set AI Model keys.</p>
          <Link href="/settings" className="px-5 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all inline-block shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Go to Settings
          </Link>
        </div>

        <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 hover:border-gray-600 transition-colors backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl font-bold mb-2 relative z-10">Generate Plan ⚡</h2>
          <p className="text-gray-400 mb-6 font-medium relative z-10">Use the Groq/Ollama LLMs to build test coverage.</p>
          <Link href="/generator" className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] inline-block relative z-10">
            Start Generating
          </Link>
        </div>
      </div>
    </div>
  );
}
