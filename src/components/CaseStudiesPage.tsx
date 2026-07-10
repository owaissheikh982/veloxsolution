import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Network, 
  Database, 
  Cpu, 
  Workflow, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Server, 
  Search, 
  ArrowUpRight, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Terminal
} from "lucide-react";

interface SimulationStep {
  name: string;
  status: "idle" | "running" | "completed" | "failed";
  log: string;
}

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "biotech" | "fintech" | "manufacturing">("all");
  const [selectedCase, setSelectedCase] = useState<number>(0);
  
  // Simulator State
  const [simRunning, setSimRunning] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([
    { name: "Parser Intake", status: "idle", log: "[GATEWAY] Parsing PDF payload. Extracted 42 tables, 1,204 line-items." },
    { name: "Regulatory Sync", status: "idle", log: "[COMPLIANCE] Running LlamaGuard-3 compliance alignment against FDA CFR Title 21." },
    { name: "Path Re-calculation", status: "idle", log: "[AGENT_ROUTING] Dynamic route adaptation initiated via custom BM25 lookup." },
    { name: "Consensus Dispatch", status: "idle", log: "[DISPATCH] Consensus reached across 3 validator nodes. Secure dispatch order emitted." }
  ]);

  const caseStudies = [
    {
      id: 0,
      title: "Autonomic Supply Chain Agent Network",
      client: "Vanguard Laboratories",
      category: "biotech",
      metrics: {
        improvement: "+42% Efficiency",
        accuracy: "99.8% Compliance Match",
        time: "6 Weeks Deploy"
      },
      summary: "How we replaced a manual, fragile compliance review process with a secure multi-agent consensus network managing global biotech supply chains.",
      problem: "Vanguard struggled with parsing millions of complex pharmaceutical logistics invoices and verifying FDA regulatory compliance documents across different shipping ports, leading to major customs delays.",
      solution: "We engineered a self-correcting multi-agent network. The parser agent processes incoming documents into structured schemas, a regulatory compliance agent audits against localized laws, and a dispatch agent updates shipping records autonomously.",
      technologies: ["LangGraph", "Llama-3-70B (Fine-Tuned)", "FDA Regulatory Datasets", "Docker & Kubernetes"],
      steps: [
        { name: "Parser Intake", log: "[GATEWAY] Parsing PDF payload. Extracted 42 tables, 1,204 line-items." },
        { name: "Regulatory Sync", log: "[COMPLIANCE] Running LlamaGuard-3 compliance alignment against FDA CFR Title 21." },
        { name: "Path Re-calculation", log: "[AGENT_ROUTING] Dynamic route adaptation initiated via custom BM25 lookup." },
        { name: "Consensus Dispatch", log: "[DISPATCH] Consensus reached across 3 validator nodes. Secure dispatch order emitted." }
      ]
    },
    {
      id: 1,
      title: "Enterprise Cognitive RAG Synthesis",
      client: "Apex Finance Group",
      category: "fintech",
      metrics: {
        improvement: "10x Faster Retrieval",
        accuracy: "0.00% Hallucination Rate",
        time: "4 Weeks Deploy"
      },
      summary: "Constructing a secure, private cloud dense RAG pipeline enabling analysts to synthesize multi-thousand page regulatory filings instantly.",
      problem: "Apex portfolio managers spent up to 14 hours aggregating quarterly filings, private earnings spreadsheets, and historical legal transcripts, with high risks of missing critical local regulatory requirements.",
      solution: "We deployed a dense/sparse hybrid RAG pipeline. Document splitters parse PDFs semantically, high-dimension vectors are stored securely in pgvector, and a Cohere Re-ranker filters context blocks before model inference, guarded by LlamaGuard.",
      technologies: ["pgvector", "Cohere Re-rank v3", "BM25 Hybrid Retrieval", "LlamaGuard Audit Engine"],
      steps: [
        { name: "Semantic Chunking", log: "[INGESTION] Splitting filings semantically. 12,400 pages mapped to 38,000 vector chunks." },
        { name: "pgvector Indexing", log: "[DATABASE] Indexing chunks. HNSW indexes built. Average retrieval distance: 0.14." },
        { name: "Cohere Reranking", log: "[RE-RANK] Sorting 50 retrieved chunks down to top 5 high-density context blocks." },
        { name: "LlamaGuard Validation", log: "[GUARDRAILS] Checking prompt context. Safety score: 100% SECURE. Executing synthesis." }
      ]
    },
    {
      id: 2,
      title: "LLM Distillation & GPU Quantization",
      client: "AeroSpace Engine Corp",
      category: "manufacturing",
      metrics: {
        improvement: "90% Inference Cost Cut",
        accuracy: "35 tokens/sec throughput",
        time: "5 Weeks Deploy"
      },
      summary: "Fine-tuning and distilling open-weights models to run on highly restricted edge-computing servers without losing reasoning accuracy.",
      problem: "AeroSpace Engineers needed on-site, fully disconnected offline assistants to diagnose jet-propulsion schematics, but enterprise models were too slow and computationally expensive to host locally.",
      solution: "We distilled Llama-3-70B's reasoning performance into Llama-3-8B using custom synthetic datasets, fused specific LoRA adapters, and quantised weights down to 4-bit (AWQ) for optimized local vLLM performance.",
      technologies: ["Unsloth Fine-Tuning", "vLLM Inference Server", "4-bit AWQ Quantization", "NVIDIA Triton"],
      steps: [
        { name: "Dataset Synthesis", log: "[PREPARATION] Synthesizing 120,000 high-fidelity jet-propulsion prompt pairs." },
        { name: "Unsloth LoRA Training", log: "[FINE-TUNING] Training fused adapter. Loss stabilized at 0.104 after 3 epochs." },
        { name: "AWQ Quantization", log: "[COMPRESSION] Quantizing 16-bit float weights into ultra-fast 4-bit integer weights." },
        { name: "vLLM Deployment", log: "[DEPLOYMENT] Serving model offline. Latency per token: 28ms. Throughput optimal." }
      ]
    }
  ];

  const filteredCases = activeCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(c => c.category === activeCategory);

  // Run a high-fidelity visual simulator loop for active case study
  const handleStartSimulation = () => {
    if (simRunning) return;
    
    setSimRunning(true);
    setSimProgress(0);
    setCurrentStepIdx(0);
    setSimLogs([`[SIMULATOR] Connecting to ${caseStudies[selectedCase].client} private node...`, `[SIMULATOR] Launching agent workflow...`]);

    // Reset step status
    const initialSteps = caseStudies[selectedCase].steps.map((s, idx) => ({
      name: s.name,
      status: idx === 0 ? ("running" as const) : ("idle" as const),
      log: s.log
    }));
    setSimulationSteps(initialSteps);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= 4) {
        setCurrentStepIdx(currentStep);
        setSimProgress(currentStep * 25);
        
        // Update steps statuses
        setSimulationSteps(prev => prev.map((s, idx) => {
          if (idx < currentStep) return { ...s, status: "completed" as const };
          if (idx === currentStep) return { ...s, status: "running" as const };
          return s;
        }));

        // Append log line
        const activeStepLog = caseStudies[selectedCase].steps[currentStep - 1]?.log;
        if (activeStepLog) {
          setSimLogs(prev => [...prev, activeStepLog]);
        }
      }

      if (currentStep === 4) {
        clearInterval(interval);
        setSimRunning(false);
        setSimLogs(prev => [...prev, `[SIMULATOR] Pipeline execution completed successfully. Metric thresholds met.`]);
        setSimulationSteps(prev => prev.map(s => ({ ...s, status: "completed" as const })));
      }
    }, 1800);
  };

  const handleResetSimulation = () => {
    setSimRunning(false);
    setSimProgress(0);
    setCurrentStepIdx(0);
    setSimLogs([]);
    setSimulationSteps(caseStudies[selectedCase].steps.map(s => ({
      name: s.name,
      status: "idle" as const,
      log: s.log
    })));
  };

  const selectCaseStudy = (idx: number) => {
    setSelectedCase(idx);
    handleResetSimulation();
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-24">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 pt-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">PROVED ENGAGEMENTS</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">Enterprise Case Studies</h1>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Real clients. Real architecture. Real performance metrics. Explore how we design and deploy bespoke AI layers to resolve core structural bottlenecks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: "all", label: "ALL INDUSTRIES" },
            { id: "fintech", label: "FINANCIAL TECHNOLOGY" },
            { id: "biotech", label: "BIOTECHNOLOGY" },
            { id: "manufacturing", label: "AEROSPACE & HEAVY MFG" }
          ].map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-sky-500/10 border-sky-400 text-sky-400 font-bold"
                  : "bg-gray-950/40 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of Case Studies */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {filteredCases.map((cs) => (
              <motion.div
                key={cs.id}
                onClick={() => selectCaseStudy(cs.id)}
                whileHover={{ y: -3, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.7)" }}
                className={`p-6 rounded-xl border transition-all cursor-pointer text-left ${
                  selectedCase === cs.id
                    ? "bg-sky-500/5 border-sky-500/40"
                    : "bg-cyber-dark/40 border-gray-800 hover:border-sky-400/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-sky-400 uppercase tracking-wider">{cs.client}</span>
                  <span className="font-mono text-[9px] bg-gray-900 border border-gray-800 px-2 py-0.5 rounded text-gray-400">
                    {cs.category.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{cs.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">{cs.summary}</p>
                
                {/* Metric overview */}
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>{cs.metrics.improvement}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: In-depth details and Simulator */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Case Details */}
            <div className="bg-cyber-dark/40 border border-gray-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest block mb-1">DETAILED ANALYSIS</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
                {caseStudies[selectedCase].title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 border-b border-gray-800/60 pb-6 font-mono text-xs">
                <div className="bg-gray-950/40 p-3 rounded-lg border border-gray-900">
                  <span className="block text-[10px] text-gray-500 mb-1">IMPROVEMENT</span>
                  <span className="text-sm font-bold text-emerald-400">{caseStudies[selectedCase].metrics.improvement}</span>
                </div>
                <div className="bg-gray-950/40 p-3 rounded-lg border border-gray-900">
                  <span className="block text-[10px] text-gray-500 mb-1">PRECISION RATE</span>
                  <span className="text-sm font-bold text-sky-400">{caseStudies[selectedCase].metrics.accuracy}</span>
                </div>
                <div className="bg-gray-950/40 p-3 rounded-lg border border-gray-900">
                  <span className="block text-[10px] text-gray-500 mb-1">DEPLOYMENT TIME</span>
                  <span className="text-sm font-bold text-purple-400">{caseStudies[selectedCase].metrics.time}</span>
                </div>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-display font-semibold text-white mb-2 flex items-center space-x-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    <span>The Operational Challenge</span>
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-xs">
                    {caseStudies[selectedCase].problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-white mb-2 flex items-center space-x-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Our Engineered Solution</span>
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-xs">
                    {caseStudies[selectedCase].solution}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] text-sky-500 mb-2 uppercase">CORE TECHNOLOGIES DEPLOYED</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudies[selectedCase].technologies.map((t, idx) => (
                      <span key={idx} className="bg-gray-900/60 border border-gray-800 text-gray-300 px-2.5 py-1 rounded text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Simulation sandbox */}
            <div className="bg-gray-950/40 border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden scanner-container">
              <div className="scanner-line" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800/60 pb-4 mb-6">
                <div>
                  <span className="font-mono text-[9px] text-sky-400 uppercase tracking-wider block">INTERACTIVE SIMULATION</span>
                  <h3 className="font-display font-bold text-lg text-white mt-1">Autonomous Agent Sandbox</h3>
                </div>
                
                {/* Control Panel Buttons */}
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button
                    onClick={handleStartSimulation}
                    disabled={simRunning}
                    className="btn-cyber flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono cursor-pointer disabled:opacity-40"
                  >
                    <Play className="h-3 w-3 text-emerald-400 fill-emerald-400" />
                    <span>RUN</span>
                  </button>
                  <button
                    onClick={handleResetSimulation}
                    className="bg-gray-900 hover:bg-gray-800 border border-gray-800 px-3 py-1.5 rounded text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer flex items-center space-x-1.5"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>RESET</span>
                  </button>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {simulationSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-gray-500">
                      <span>STEP 0{idx + 1}</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                      step.status === "completed" ? "bg-emerald-500/20" : "bg-gray-900"
                    }`}>
                      <div className={`h-full rounded-full transition-all duration-300 ${
                        step.status === "completed" 
                          ? "w-full bg-emerald-500" 
                          : step.status === "running"
                            ? "w-1/2 bg-sky-400 animate-pulse"
                            : "w-0 bg-transparent"
                      }`} />
                    </div>
                    <span className={`block font-display font-medium text-[10px] mt-1.5 text-center truncate ${
                      step.status === "completed" ? "text-emerald-400" : step.status === "running" ? "text-sky-400" : "text-gray-500"
                    }`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terminal Logs Window */}
              <div className="bg-cyber-dark/80 border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 min-h-[160px] max-h-[160px] overflow-y-auto space-y-1.5">
                {simLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600 py-6">
                    <Terminal className="h-6 w-6 mb-1.5" />
                    <span>AWAITING SIMULATION TRIGGER</span>
                  </div>
                ) : (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start space-x-2 animate-fadeIn">
                      <span className="text-sky-500 flex-shrink-0">&gt;</span>
                      <span className={log.startsWith("[SIMULATOR]") ? "text-gray-500" : log.includes("completed") ? "text-emerald-400" : "text-gray-300"}>
                        {log}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
