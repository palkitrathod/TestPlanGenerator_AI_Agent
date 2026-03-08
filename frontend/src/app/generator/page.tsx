"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function GeneratorPage() {
    const [jiraKey, setJiraKey] = useState("");
    const [jiraUrl, setJiraUrl] = useState("https://your-domain.atlassian.net");
    const [jiraEmail, setJiraEmail] = useState("user@domain.com");
    const [jiraApiKey, setJiraApiKey] = useState("");
    const [temperature, setTemperature] = useState(0.1);
    const [aiModel, setAiModel] = useState("llama-3.3-70b-versatile");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const generatePlan = async () => {
        setLoading(true);
        try {
            // Stub integration to python backend
            const response = await fetch("http://localhost:8000/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    issueKey: jiraKey,
                    jiraUrl: jiraUrl,
                    jiraEmail: jiraEmail,
                    jiraApiKey: jiraApiKey,
                    llm: "groq",
                    aiModel: aiModel,
                    temperature: temperature
                }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            setResult({ error: "Failed to connect to backend layer." });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        Intelligent QA Agent
                    </h1>
                    <nav className="flex items-center gap-6">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                        <Link href="/settings" className="text-gray-400 hover:text-white transition-colors">Settings</Link>
                    </nav>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="md:col-span-1 border border-gray-800 bg-gray-900/40 p-6 rounded-2xl h-fit">
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Input Parameters</h2>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Jira Base URL</label>
                            <input
                                type="text"
                                value={jiraUrl}
                                onChange={(e) => setJiraUrl(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Jira Email</label>
                            <input
                                type="email"
                                value={jiraEmail}
                                onChange={(e) => setJiraEmail(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Jira API Token</label>
                            <input
                                type="password"
                                value={jiraApiKey}
                                onChange={(e) => setJiraApiKey(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2">Jira Ticket ID</label>
                            <input
                                type="text"
                                placeholder="PROJ-123"
                                value={jiraKey}
                                onChange={(e) => setJiraKey(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2 flex justify-between">
                                <span>LLM Temperature</span>
                                <span className="text-emerald-400">{temperature}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={temperature}
                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Lower is deterministic, higher is creative.</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2">AI Model</label>
                            <select
                                value={aiModel}
                                onChange={(e) => setAiModel(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                            >
                                <option value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile (Recommended)</option>
                                <option value="llama3-8b-8192">Llama 3 8B (Fastest)</option>
                                <option value="mixtral-8x7b-32768">Mixtral 8x7B (Complex Logic)</option>
                                <option value="gemma2-9b-it">Gemma 2 9B (Google)</option>
                            </select>
                        </div>

                        <button
                            onClick={generatePlan}
                            disabled={loading || !jiraKey}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center py-3 rounded-lg transition-all shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Processing LLM...
                                </span>
                            ) : "Generate Artifacts"}
                        </button>
                    </div>

                    {/* Results Display */}
                    <div className="md:col-span-2 border border-gray-800 bg-gray-900/40 p-6 rounded-2xl min-h-[500px] flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Generated Output</h2>
                        {!result && !loading && (
                            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-800 rounded-xl text-gray-500">
                                Awaiting input to generate Test Plan
                            </div>
                        )}
                        {result?.error && (
                            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400">
                                {result.error}
                            </div>
                        )}
                        {result && !result.error && (
                            <div className="flex-1 overflow-y-auto space-y-6 pristine-scrollbar">
                                {result.testPlan && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-800/50 rounded-xl">
                                            <h3 className="font-bold text-lg mb-2 text-blue-400">Test Plan Overview</h3>
                                            <p className="text-gray-300 text-sm whitespace-pre-wrap">{result.testPlan.overview}</p>
                                        </div>
                                        <div className="p-4 bg-gray-800/50 rounded-xl">
                                            <h3 className="font-bold text-lg mb-2 text-emerald-400">Scope & Objectives</h3>
                                            <p className="text-gray-300 text-sm mb-2"><span className="font-semibold text-white">Scope:</span> {result.testPlan.scope}</p>
                                            <p className="text-gray-300 text-sm"><span className="font-semibold text-white">Objectives:</span> {result.testPlan.objectives}</p>
                                        </div>
                                        <div className="p-4 bg-gray-800/50 rounded-xl border border-red-900/30">
                                            <h3 className="font-bold text-lg mb-2 text-red-400">Risk Analysis & Edge Cases</h3>
                                            <p className="text-gray-300 text-sm whitespace-pre-wrap">{result.testPlan.riskAnalysis}</p>
                                        </div>
                                    </div>
                                )}

                                {result.testScenarios && (
                                    <div className="p-4 bg-gray-800/50 rounded-xl">
                                        <h3 className="font-bold text-lg mb-3 text-purple-400">Test Scenarios</h3>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {result.testScenarios.map((scenario: string, idx: number) => (
                                                <li key={idx} className="text-gray-300 text-sm">{scenario}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
