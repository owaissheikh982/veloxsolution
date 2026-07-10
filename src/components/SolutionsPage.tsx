import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Network, 
  Database, 
  Cpu, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Server, 
  GitCommit, 
  CodeXml,
  ChevronRight
} from "lucide-react";

type BlueprintType = "rag" | "multiagent" | "tuning";

export default function SolutionsPage() {
  const [activeBlueprint, setActiveBlueprint] = useState<BlueprintType>("multiagent");

  const blueprints = {
    multiagent: {
      title: "Stateful Multi-Agent Orchestration",
      description: "Parallel sub-agent division, consensus routing, and deterministic state management loops.",
      steps: [
        { name: "Agent Gateway", details: "Accepts complex unstructured prompts and executes intent vector analysis." },
        { name: "Task Decomposer", details: "Divides user requests into a hierarchical JSON schema of sub-tasks." },
        { name: "Parallel Agent Nodes", details: "Sub-agents (Research, Coding, QA) run concurrently in sandboxed nodes." },
        { name: "Consensus Aggregator", details: "Iterates through recursive self-correction until high-quality output matches requirements." }
      ],
      latency: "1.2s avg loop",
      framework: "LangGraph / CrewAI"
    },
    rag: {
      title: "Cognitive Knowledge Synthesis (RAG)",
      description: "Dense vector embeddings coupled with hybrid keyword retrieval and re-ranking layers.",
      steps: [
        { name: "Ingestion Pipeline", details: "Splits enterprise PDFs, Wikis, and tables using recursive semantic chunking." },
        { name: "Vector Embeddings Store", details: "Generates 1536-dimensional embeddings and logs vectors in pgvector." },
        { name: "Hybrid Search & Retrieve", details: "Executes BM25 keyword matching parallel to semantic distance searches." },
        { name: "Cross-Encoder Reranker", details: "Scores and filters top 5 context chunks, feeding clean grounding to LLM." }
      ],
      latency: "240ms retrieval",
      framework: "pgvector / Cohere / Qdrant"
    },
    tuning: {
      title: "Enterprise Model Distillation",
      description: "Tailoring smaller open-weights models to outperform proprietary models at 10x lower inference cost.",
      steps: [
        { name: "Dataset Distillation", details: "Extracts and cleans proprietary corporate logs and schemas." },
        { name: "QLoRA Fine-Tuning", details: "Executes 16-bit low-rank adaptation on specialized instruction datasets." },
        { name: "Quantization Processing", details: "Quantizes model weights to 4-bit (GGUF/AWQ) for high-speed local inference." },
        { name: "vLLM Inference Deployment", details: "Serves fine-tuned model via optimized high-concurrency vLLM engine." }
      ],
      latency: "35 tokens/s throughput",
      framework: "Unsloth / PyTorch / vLLM"
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-24">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 pt-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">AUTONOMOUS SYSTEMS ARCHITECTURE</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">Enterprise-Grade AI Solutions</h1>
          <p className="text-gray-400 text-base mt-3 leading-relaxed">
            We architect robust systems designed for performance, resilience, and scale. Explore our production-ready frameworks and real-world implementation case studies.
          </p>
        </div>

        {/* Blueprint Sandbox Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* Blueprint Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="bg-gray-950/40 border border-gray-800 rounded-xl p-4">
              <span className="font-mono text-[10px] text-gray-500 tracking-wider block mb-3 uppercase">ARCHITECTURAL DIAGRAMS</span>
              <div className="flex flex-col space-y-2">
                {[
                  { id: "multiagent", label: "Multi-Agent Orchestrator", icon: Network, color: "text-indigo-400" },
                  { id: "rag", label: "Cognitive RAG Engine", icon: Database, color: "text-blue-400" },
                  { id: "tuning", label: "Model Fine-Tuning", icon: Cpu, color: "text-purple-400" }
                ].map((bp) => (
                  <motion.button
                    key={bp.id}
                    onClick={() => setActiveBlueprint(bp.id as BlueprintType)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-3.5 rounded-lg text-left text-xs font-mono transition-all border cursor-pointer ${
                      activeBlueprint === bp.id
                        ? "bg-sky-500/10 border-sky-400/80 text-white"
                        : "bg-transparent border-gray-800/60 text-gray-400 hover:text-white hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <bp.icon className={`h-4 w-4 ${bp.color}`} />
                      <span>{bp.label}</span>
                    </div>
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-cyber-dark/60 border border-gray-800 p-6 rounded-xl flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-[10px] text-sky-500">SPECIFICATIONS</span>
                <h4 className="font-display font-bold text-white text-base mt-1">Deploy Options</h4>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                  All architectures are fully dockerized and ship with automated OpenTelemetry monitoring metrics ready for Kubernetes deployment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-800/40">
                <span className="font-mono text-[10px] text-gray-500">STANDARDS: ISO-27001 SOC2 READY</span>
              </div>
            </div>
          </div>

          {/* Interactive Dynamic Blueprint Chart */}
          <div className="lg:col-span-8 bg-cyber-dark/40 border border-gray-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[420px] group/blueprint">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-purple-500/5 opacity-0 group-hover/blueprint:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-gray-500 z-10">
              BUILD // VELOX_ENGINE_v4
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeBlueprint}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between relative z-10"
              >
                <div>
                  <span className="font-mono text-xs text-sky-400 tracking-wider">ACTIVE SCHEMATIC</span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {blueprints[activeBlueprint].title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-2xl">
                    {blueprints[activeBlueprint].description}
                  </p>

                  {/* Flow Steps Diagram */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {blueprints[activeBlueprint].steps.map((step, sIdx) => (
                      <motion.div 
                        key={sIdx} 
                        whileHover={{ y: -4 }}
                        className="relative bg-gray-900/60 border border-gray-800/80 hover:border-sky-400/40 hover:bg-gray-900/90 p-4 rounded-xl flex flex-col justify-between cursor-pointer transition-all duration-200"
                      >
                        <div>
                          <div className="font-mono text-[10px] text-gray-500 font-bold mb-2">NODE {sIdx + 1}</div>
                          <h5 className="font-display font-semibold text-white text-xs mb-1.5">{step.name}</h5>
                          <p className="text-[11px] text-gray-400 leading-normal">{step.details}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Micro Metrics bar */}
                <div className="mt-8 pt-6 border-t border-gray-800/60 flex flex-wrap gap-6 items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-sky-400 animate-pulse" />
                    <span className="text-gray-400">Framework:</span>
                    <span className="text-white font-semibold">{blueprints[activeBlueprint].framework}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GitCommit className="h-4 w-4 text-sky-400" />
                    <span className="text-gray-400">Performance:</span>
                    <span className="text-white font-semibold">{blueprints[activeBlueprint].latency}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Real-World Case Studies / Solutions Log */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">PROVED VALUE OUTCOMES</span>
            <h2 className="font-display text-3xl font-bold text-white mt-1">Enterprise Case Studies</h2>
            <p className="text-gray-400 text-sm mt-2">Discover how Velox Solutions engineered structural software solutions to solve core corporate operational issues.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Case Study 1 */}
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.8)" }}
              transition={{ duration: 0.3 }}
              className="bg-cyber-dark/40 border border-gray-800 rounded-2xl p-8 flex flex-col justify-between hover:border-sky-400/40 transition-all relative overflow-hidden cursor-pointer group/case1"
            >
              <div className="absolute top-0 right-0 bg-sky-500/10 text-sky-400 border-l border-b border-sky-500/20 px-3 py-1 text-[10px] font-mono tracking-widest uppercase group-hover/case1:bg-sky-500/20 group-hover/case1:text-sky-300 transition-colors">
                HEALTHCARE BIOTECH
              </div>
              <div>
                <span className="font-mono text-xs text-sky-400">CLIENT: VANGUARD LABORATORIES</span>
                <h3 className="font-display text-2xl font-bold text-white mt-2 mb-4 group-hover/case1:text-sky-400 transition-colors">Autonomic Supply Chain Agent Workforce</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Vanguard Laboratories struggled with parsing millions of pharmaceutical logistics invoices, tracking compliance delays, and coordinating shipping route rerouting manually. 
                </p>
                <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-5 mb-6">
                  <h4 className="font-mono text-xs text-sky-400 uppercase mb-3 tracking-wider">ENGINEERED WORK</h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <span>Built LangGraph invoice parsing agents running OCR with automated table schema extraction.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <span>Configured a recursive compliance check node linked with standard FDA compliance datasets.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <span>Fine-tuned a custom Llama 70B model to handle pharmaceutical compliance taxonomy.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-800/60 pt-6 font-mono text-xs">
                <div className="text-left">
                  <span className="block text-[10px] text-gray-500">OPERATIONAL EFFICIENCY</span>
                  <span className="text-lg font-bold text-white group-hover/case1:text-sky-400 transition-colors">+42% Increase</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-gray-500">IMPLEMENTED TIMELINE</span>
                  <span className="text-sm text-gray-300">6 Weeks</span>
                </div>
              </div>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.8)" }}
              transition={{ duration: 0.3 }}
              className="bg-cyber-dark/40 border border-gray-800 rounded-2xl p-8 flex flex-col justify-between hover:border-purple-400/40 transition-all relative overflow-hidden cursor-pointer group/case2"
            >
              <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-400 border-l border-b border-purple-500/20 px-3 py-1 text-[10px] font-mono tracking-widest uppercase group-hover/case2:bg-purple-500/20 group-hover/case2:text-purple-300 transition-colors">
                FINTECH RISK ANALYSIS
              </div>
              <div>
                <span className="font-mono text-xs text-purple-400">CLIENT: APEX FINANCE</span>
                <h3 className="font-display text-2xl font-bold text-white mt-2 mb-4 group-hover/case2:text-purple-400 transition-colors">Enterprise Dense Hybrid RAG Synthesis</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Apex Finance required their portfolio risk analysts to instantly synthesize unstructured quarterly filings, private spreadsheets, and complex legal transcripts securely with no hallucination risk.
                </p>
                <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-5 mb-6">
                  <h4 className="font-mono text-xs text-purple-400 uppercase mb-3 tracking-wider">ENGINEERED WORK</h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Configured hybrid sparse/dense embeddings retrieval using Cohere Re-rank.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Structured semantic guardrails using LlamaGuard to enforce SOC2 and HIPAA isolation policies.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Deployed low-latency isolated vector indexes inside private cloud virtual private networks.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-800/60 pt-6 font-mono text-xs">
                <div className="text-left">
                  <span className="block text-[10px] text-gray-500">RETRIEVAL ACCURACY</span>
                  <span className="text-lg font-bold text-white group-hover/case2:text-purple-400 transition-colors">99.4% Precision</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-gray-500">IMPLEMENTED TIMELINE</span>
                  <span className="text-sm text-gray-300">4 Weeks</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
