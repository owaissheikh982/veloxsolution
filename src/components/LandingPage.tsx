import React from "react";
import { Page } from "../types";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Layers, 
  Network, 
  Workflow, 
  Database, 
  ShieldAlert, 
  Activity,
  Globe
} from "lucide-react";
import botHeroImage from "../assets/images/female_ai_robot_1783722421096.jpg";

interface LandingPageProps {
  setCurrentPage: (page: Page) => void;
  toggleChat: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function LandingPage({ setCurrentPage, toggleChat }: LandingPageProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-24">
      {/* Background Grid and Radial Glow */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* Cybernetic Robot Portrait Background Overlay */}
      <div className="absolute top-0 left-0 right-0 h-[680px] overflow-hidden pointer-events-none z-0">
        <img 
          src={botHeroImage} 
          alt="Velox AI Background" 
          decoding="async"
          className="w-full h-full object-cover opacity-20 object-center lg:object-[center_15%] filter contrast-125 brightness-90 saturate-50"
        />
        {/* Soft mask gradients for premium styling and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/10 via-cyber-dark/60 to-cyber-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030307_90%)] opacity-90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 sm:pt-24 z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center flex flex-col items-center justify-center"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 rounded-full border border-sky-500/30 bg-sky-950/40 px-4 py-1.5 text-xs text-sky-400 font-mono mb-6 hover:border-sky-400/50 transition-colors"
          >
            <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="tracking-wide">NOW SECURING CONTRACTS FOR Q3-Q4 2026</span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
          >
            Bespoke <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">Software &amp; AI</span> Engineering
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl text-gray-400 font-sans leading-relaxed max-w-3xl mx-auto"
          >
            Velox Solutions is a premier full-service software house. We design and build high-performance websites, premium web &amp; mobile applications, bespoke custom software, and advanced AI automation systems.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => setCurrentPage(Page.SOLUTIONS)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-medium text-sm text-black bg-white hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-white/10 group cursor-pointer active:scale-95"
            >
              <span>Explore AI Solutions</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={toggleChat}
              className="w-full sm:w-auto btn-cyber px-8 py-4 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <Terminal className="h-4 w-4 text-sky-400" />
              <span>Consult AI Concierge</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Dynamic Interactive Agentic Lifecycle (Visual Section) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24 glow-card p-8 border border-gray-800/80 rounded-2xl bg-cyber-dark/40 overflow-hidden scanner-container relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="scanner-line" />
          
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-800/60 pb-6 mb-8 relative z-10">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">LIVE ACTIVE PIPELINE</span>
              <h3 className="font-display text-xl font-bold text-white mt-1">Multi-Agent Autonomic Lifecycle</h3>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 bg-gray-900/60 border border-gray-800 px-3 py-1.5 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-[11px] text-gray-300">TELEMETRY STREAM: RUNNING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              {
                step: "01",
                name: "Semantic Intake & Parse",
                desc: "User requests are parsed through multi-modal embeddings, matching intent vectors with sub-agent systems.",
                icon: Database,
                color: "text-blue-400",
              },
              {
                step: "02",
                name: "Agent Decomposition",
                desc: "Main agent decomposes complex inputs into nested tasks, assigning sub-nodes for parallel execution.",
                icon: Network,
                color: "text-indigo-400",
              },
              {
                step: "03",
                name: "Cognitive Retrieval & RAG",
                desc: "Dense vectors retrieve enterprise knowledge base files, executing contextual synthesis & safety grounding.",
                icon: Workflow,
                color: "text-purple-400",
              },
              {
                step: "04",
                name: "Action Execution Loop",
                desc: "Code compilers run, tool functions execute, and self-correcting validation loops verify quality.",
                icon: Cpu,
                color: "text-sky-400",
              },
            ].map((node, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -6, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.7)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative bg-cyber-dark/80 p-6 border border-gray-800/50 rounded-xl hover:border-sky-400/40 transition-all flex flex-col justify-between cursor-pointer group/node"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-gray-600 font-bold group-hover/node:text-sky-400 transition-colors">{node.step}</span>
                    <node.icon className={`h-5 w-5 ${node.color} group-hover/node:scale-110 transition-transform duration-300`} />
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-2 group-hover/node:text-sky-400 transition-colors">{node.name}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{node.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800/40 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-500">STATE: OPTIMAL</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agency Capabilities / Competencies Grid */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">SYSTEM COMPETENCIES</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">Core Technical Capabilities</h2>
            <p className="text-gray-400 text-sm mt-3">We engineer elite AI systems directly tied to hardware acceleration and structured API integration models.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bespoke Multi-Agent Workforces",
                desc: "We replace manual sequential work with stateful multi-agent systems. Using LangGraph and custom orchestration nodes, agents communicate, review, self-correct, and compile outputs autonomously.",
                icon: Network,
                tech: "LangGraph // Autogen // CrewAI"
              },
              {
                title: "Dense Hybrid RAG Engines",
                desc: "Enterprise search must be contextually infallible. We implement dense hybrid search matching vectors, metadata filtering, and re-ranking pipelines to connect your databases to reasoning agents.",
                icon: Database,
                tech: "pgvector // Qdrant // Cohere Rerank"
              },
              {
                title: "Model Fine-Tuning & Distillation",
                desc: "Shrink latency and server costs. We fine-tune custom open-weights models (Llama, Mistral) on specialized proprietary corpora, performing quantization and structured schema tuning.",
                icon: Cpu,
                tech: "QLoRA // Unsloth // vLLM"
              },
              {
                title: "Scalable Cognitive Infrastructure",
                desc: "We construct reliable Kubernetes and serverless frameworks for running continuous workflows. Complete with automated rate-limiting, system fallback, and request logs.",
                icon: Layers,
                tech: "FastAPI // Docker // Ray Cluster"
              },
              {
                title: "Strict System Security & Guardrails",
                desc: "Enterprise deployment requires bulletproof boundaries. We integrate semantic guardrails and validation nodes to block output leaks, hallucinations, and prompt-injection risks.",
                icon: ShieldAlert,
                tech: "LlamaGuard // NeMo Guardrails"
              },
              {
                title: "Bespoke Web & App Engineering",
                desc: "We design and develop premium responsive websites, corporate landing pages, complex web systems, and custom cross-platform mobile apps using high-speed modern frameworks with absolute pixel-precision.",
                icon: Globe,
                tech: "React // Tailwind // iOS & Android"
              }
            ].map((cap, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -6, boxShadow: "0 15px 35px -15px rgba(0,0,0,0.8)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-cyber-dark/40 border border-gray-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-sky-400/40 transition-all group cursor-pointer"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg border border-gray-800 bg-gray-900/60 flex items-center justify-center mb-6 group-hover:border-sky-500/30 group-hover:bg-sky-500/5 transition-all">
                    <cap.icon className="h-5 w-5 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:text-sky-400 transition-colors">{cap.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{cap.desc}</p>
                </div>
                <div className="font-mono text-[10px] text-sky-500/80 tracking-widest border-t border-gray-800/50 pt-4 group-hover:text-sky-400 transition-colors">
                  {cap.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editorial Editorial Statement */}
        <div className="mt-28 border-t border-b border-gray-800 py-16 px-8 bg-cyber-dark/20 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-40" />
          <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">VELOX METHODOLOGY</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">No wraps. Pure engineering.</h3>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                We believe the era of generic API-wrapper tools is over. True business value comes from building deep cognitive layers, robust workflow state-machines, and custom fine-tuned pipelines integrated securely with your existing proprietary databases.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setCurrentPage(Page.MATRIX)}
                className="btn-cyber px-6 py-3 rounded-lg text-xs font-mono tracking-wider cursor-pointer"
              >
                VIEW CAPABILITY MATRIX
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
