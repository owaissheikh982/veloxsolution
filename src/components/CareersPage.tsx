import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Cpu, 
  Sparkles, 
  Send, 
  Briefcase, 
  CheckCircle, 
  X, 
  Dna, 
  Terminal, 
  Compass, 
  Activity,
  Heart
} from "lucide-react";

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<"carbon" | "silicon">("carbon");
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  // Custom interactive evaluation state
  const [applicantName, setApplicantName] = useState("");
  const [applicantRole, setApplicantRole] = useState("AI Infrastructure Architect");
  const [applicantBio, setApplicantBio] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedback: string;
    decision: string;
  } | null>(null);

  const carbonJobs = [
    {
      title: "AI Infrastructure Architect",
      team: "Core Infrastructure",
      location: "San Francisco, CA / Remote",
      salary: "$190k - $240k + Equity",
      description: "Scale vLLM inference server clusters, configure high-memory NVIDIA H100 GPU lattices, and design multi-node orchestrations using LangGraph.",
      requirements: ["Deep familiarity with Triton Inference Server, CUDA, and PyTorch.", "Proven experience hosting, quantizing, and serving open-source models.", "Hands-on experience with LangGraph, LangChain, or Autogen."]
    },
    {
      title: "Cognitive Systems Engineer",
      team: "RAG & Knowledge Systems",
      location: "Remote",
      salary: "$165k - $210k",
      description: "Engineer hyper-efficient dense/sparse hybrid RAG vector embedding architectures and semantic chunking pipelines in high-throughput environments.",
      requirements: ["Strong experience with pgvector, Pinecone, or Qdrant.", "Understanding of sparse encoders (BM25) vs dense embedding models.", "Obsession with lowering RAG hallucination rates to absolute zero."]
    },
    {
      title: "Chief Evaluator & Red Teamer",
      team: "Safety & Alignment",
      location: "Hybrid (SF/NY)",
      salary: "$150k - $185k",
      description: "Create adversarial safety testing pipelines, craft evaluation harnesses, and fine-tune guardrail models like LlamaGuard to ensure structural system compliance.",
      requirements: ["Experience in AI red-teaming, prompt injection defense, or model evaluation.", "Proficiency in fine-tuning lighter weight classifiers.", "Obsession with safety protocols and data boundaries."]
    }
  ];

  const siliconJobs = [
    {
      title: "Supply Chain Router Agent v3.1",
      team: "Client Nodes",
      status: "DEPLOYED",
      holder: "Vanguard Laboratories Cluster",
      description: "Maintains optimal multi-modal shipping paths, parses seaport delays, and updates core ERP schemas in real time with zero human latency.",
      throughput: "3,400 payloads / hr"
    },
    {
      title: "Semantic Chunking & RAG Agent v1.4",
      team: "Cognitive Stack",
      status: "DEPLOYED",
      holder: "Apex Finance Node 4",
      description: "Indexes legal filings, performs dense-retrieval reranking, and prepares unified executive outlines for portfolio managers.",
      throughput: "12,400 chunks / min"
    },
    {
      title: "Compliance Validator Agent v4.2",
      team: "Safety Mesh",
      status: "AVAILABLE",
      holder: "None - Seeking adapter weights",
      description: "Scans enterprise transactions and legal documents for compliance anomalies using customized LlamaGuard policies.",
      throughput: "Awaiting fine-tuning"
    }
  ];

  // Simulator: Run a witty "AI Evaluation" of the candidate's application
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantBio) return;

    setEvaluating(true);
    setEvaluationResult(null);

    setTimeout(() => {
      // Calculate a funny/witty alignment score based on details provided
      const length = applicantBio.length;
      const rawScore = Math.min(98, Math.max(74, 80 + (length % 19)));
      
      let decision = "";
      let feedback = "";
      
      if (rawScore >= 90) {
        decision = "CARBON_NODE_QUALIFIED";
        feedback = `Applicant ${applicantName} shows optimal cognitive latency. Resume parsing completed. Matching keywords detected (GPU, Triton, Orchestration). Your profile aligns flawlessly with Velox protocols. Proceeding to technical simulation phase.`;
      } else {
        decision = "INTERVIEW_PENDING_MANUAL_REVIEW";
        feedback = `Applicant ${applicantName} processed. Evaluated at 15.4ms cognitive latency. Core qualifications validated. The Velox recruiter agent has prioritized your files for live review.`;
      }

      setEvaluationResult({
        score: rawScore,
        feedback,
        decision
      });
      setEvaluating(false);
    }, 2200);
  };

  const handleOpenApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setApplicantRole(jobTitle);
    setApplicantName("");
    setApplicantBio("");
    setEvaluationResult(null);
    setApplyModalOpen(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-24">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 pt-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">JOIN THE PROTOCOL</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">Open Careers</h1>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            We are building the future of software. Velox is an elite crew of developers engineering stateful agent frameworks. No marketing puff, no wraps. Just pure, hardcore engineering.
          </p>
        </div>

        {/* Division Selection Tabs */}
        <div className="flex border-b border-gray-900 mb-12">
          <button
            onClick={() => setActiveTab("carbon")}
            className={`flex-1 pb-4 text-center border-b-2 text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "carbon"
                ? "border-sky-500 text-sky-400 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            CARBON OPENINGS (HUMANS)
          </button>
          <button
            onClick={() => setActiveTab("silicon")}
            className={`flex-1 pb-4 text-center border-b-2 text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "silicon"
                ? "border-sky-500 text-sky-400 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            SILICON NODES (AGENTS)
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "carbon" ? (
            <motion.div
              key="carbon"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 text-left"
            >
              {carbonJobs.map((job, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.7)" }}
                  className="bg-cyber-dark/40 border border-gray-800 rounded-xl p-6 sm:p-8 hover:border-sky-400/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[9px] bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded uppercase">
                        {job.team}
                      </span>
                      <span className="font-mono text-[9px] text-gray-500">
                        {job.location}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">{job.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{job.description}</p>
                    
                    <div className="pt-2">
                      <span className="block font-mono text-[10px] text-gray-500 mb-1 uppercase">Technical Prerequisites</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        {job.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="text-xs text-gray-300 flex items-start space-x-1.5">
                            <span className="text-sky-500 font-bold font-mono">/</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between space-y-4 md:space-y-0 flex-shrink-0 md:min-w-[160px]">
                    <span className="font-mono text-xs text-emerald-400 font-bold">{job.salary}</span>
                    <button
                      onClick={() => handleOpenApply(job.title)}
                      className="btn-cyber w-full md:w-auto px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer text-center"
                    >
                      APPLY NOW
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="silicon"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 text-left"
            >
              <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-5 text-xs text-sky-400 font-mono leading-relaxed flex items-start space-x-3">
                <Cpu className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">AUTOMATIC ALLOCATION INSTRUCTIONS</strong>
                  Silicon Roles represent autonomies deployed across Velox secure hardware grids for active corporate clients. Custom neural network configurations or weights can be uploaded directly to active pipeline adapter interfaces.
                </div>
              </div>

              {siliconJobs.map((job, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="bg-gray-950/40 border border-gray-900 rounded-xl p-6 hover:border-sky-400/35 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded border ${
                        job.status === "DEPLOYED" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      }`}>
                        {job.status}
                      </span>
                      <span className="font-mono text-[9px] text-gray-500">
                        {job.team.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-sky-400" />
                      <span>{job.title}</span>
                    </h3>
                    <p className="text-gray-400 text-xs">{job.description}</p>
                    <span className="block font-mono text-[9px] text-gray-600 uppercase">
                      Current Node Lease: <strong className="text-gray-400">{job.holder}</strong>
                    </span>
                  </div>

                  <div className="font-mono text-xs flex-shrink-0 text-left md:text-right">
                    <span className="block text-[9px] text-gray-500">ACTIVE THROUGHPUT</span>
                    <span className="font-bold text-sky-400 block mt-1">{job.throughput}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Philosophy Callout */}
        <div className="mt-16 bg-cyber-dark/30 border border-gray-900 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <Heart className="h-6 w-6 text-sky-500 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display text-xl font-bold text-white mb-2">Our Operating System</h3>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xl mx-auto">
            We don't do daily standups that drag on, we don't have endless middle-managers, and we don't code thin wrappers around basic APIs. We are a concentrated hub of technical mastery. If you love deep focus and high-performance computing, you will thrive here.
          </p>
        </div>
      </div>

      {/* Interactive Evaluation Modal */}
      <AnimatePresence>
        {applyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-cyber-dark border border-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6 flex-shrink-0">
                <div>
                  <span className="font-mono text-[9px] text-sky-400 uppercase tracking-widest block">GATEWAY EVALUATION</span>
                  <h3 className="font-display font-bold text-lg text-white mt-1">Submit Credentials</h3>
                </div>
                <button 
                  onClick={() => setApplyModalOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto pr-1 flex-1 min-h-0 custom-scrollbar">
                {evaluationResult ? (
                  /* Interactive Evaluation Results Screen */
                  <div className="space-y-5 py-2 text-left">
                    <div className="text-center bg-gray-950/40 border border-gray-900 rounded-xl p-5 font-mono">
                      <span className="text-gray-500 text-[10px] uppercase">COGNITIVE COMPATIBILITY SCORE</span>
                      <span className="block text-4xl font-bold text-sky-400 mt-2">{evaluationResult.score}%</span>
                      <span className="block text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded mt-3 inline-block">
                        {evaluationResult.decision}
                      </span>
                    </div>
                    
                    <div className="bg-gray-900/60 border border-gray-800/80 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-2">
                      <span className="text-sky-400 text-[9px] block">SYSTEM FEEDBACK LOGS:</span>
                      <p className="leading-relaxed text-gray-400">{evaluationResult.feedback}</p>
                    </div>

                    <button
                      onClick={() => setApplyModalOpen(false)}
                      className="w-full py-3 bg-white hover:bg-gray-100 text-black font-mono font-bold text-xs tracking-widest rounded-lg transition-all cursor-pointer"
                    >
                      CLOSE PORTAL
                    </button>
                  </div>
                ) : (
                  /* Application Form */
                  <form onSubmit={handleApplySubmit} className="space-y-4 text-left py-1">
                    <div>
                      <label className="block font-mono text-[9px] text-gray-400 mb-1">TARGET COGNITIVE SLOT</label>
                      <input 
                        type="text"
                        disabled
                        value={applicantRole}
                        className="w-full bg-gray-950/60 border border-gray-900 rounded px-3 py-2 text-xs text-gray-400 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-gray-400 mb-1">YOUR NAME *</label>
                      <input 
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Devon Kael"
                        className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-gray-400 mb-1">ENGINEERING PROFILE & TELEMETRY *</label>
                      <textarea 
                        required
                        rows={4}
                        value={applicantBio}
                        onChange={(e) => setApplicantBio(e.target.value)}
                        placeholder="List your favorite inference stack, model adapter methods, or github links..."
                        className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none resize-none font-mono"
                      />
                    </div>

                    {evaluating ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-2">
                        <div className="h-6 w-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                        <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest">RUNNING INFERENCE TEST...</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-white hover:bg-gray-100 text-black font-mono font-bold text-xs tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>SUBMIT FOR INFERENCE EVALUATION</span>
                      </button>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
