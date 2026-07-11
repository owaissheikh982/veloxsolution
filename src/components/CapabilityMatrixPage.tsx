import React, { useState, useEffect } from "react";
import { InfrastructureMetric, Lead } from "../types";
import { motion } from "motion/react";
import { 
  Cpu, 
  Database, 
  Terminal, 
  TrendingUp, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  Inbox,
  Workflow,
  CheckCircle,
  Briefcase,
  Layers
} from "lucide-react";

export default function CapabilityMatrixPage() {
  const [metric, setMetric] = useState<InfrastructureMetric | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Fetch live metrics & logged leads from Express backend
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [infraRes, leadsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/infrastructure`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/leads`)
      ]);

      if (infraRes.ok) {
        const infraData = await infraRes.json();
        setMetric(infraData);
      }
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads);
      }
    } catch (err) {
      console.error("Failed to load server metrics:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll metrics every 6 seconds to keep dashboard dynamically animated
    const timer = setInterval(() => {
      fetchData();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-24">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 pt-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">SYSTEM MONITORING</span>
            <h1 className="font-display text-4xl font-bold text-white mt-1">The Capability Matrix</h1>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Live hardware diagnostics and client inquiry logging directly served from the Velox Solutions container infrastructure.
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-lg text-xs font-mono text-gray-300 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin text-sky-400' : ''}`} />
            <span>{refreshing ? "SYNCING..." : "RE-SYNC DIAGNOSTICS"}</span>
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <RefreshCw className="h-8 w-8 text-sky-400 animate-spin" />
              <span className="font-mono text-xs text-gray-400 tracking-wider">ESTABLISHING TELEMETRY CONNECTION...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left/Middle Column - Bento Diagnostic Grid (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col space-y-8">
              
              {/* Top Row Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Active Agent Runs */}
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.7)" }}
                  className="bg-cyber-dark/40 border border-gray-800 hover:border-sky-400/40 transition-colors duration-200 p-6 rounded-xl relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-2 right-2 text-sky-500/20"><Workflow className="h-10 w-10 animate-pulse" /></div>
                  <span className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase">ACTIVE AGENT RUNS</span>
                  <span className="block font-display text-3xl font-bold text-white mt-2 font-mono">
                    {metric?.activeAgents || 0}
                  </span>
                  <span className="block font-mono text-[9px] text-emerald-400 mt-1 flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                    <span>COGNITIVE LIFECYCLE ONLINE</span>
                  </span>
                </motion.div>

                {/* API Request Latency */}
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.7)" }}
                  className="bg-cyber-dark/40 border border-gray-800 hover:border-sky-400/40 transition-colors duration-200 p-6 rounded-xl relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-2 right-2 text-sky-500/20"><Clock className="h-10 w-10" /></div>
                  <span className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase">RESPONSE LATENCY</span>
                  <span className="block font-display text-3xl font-bold text-white mt-2 font-mono">
                    {metric?.latency || 0}<span className="text-sm font-normal text-gray-400">ms</span>
                  </span>
                  <span className="block font-mono text-[9px] text-sky-400 mt-1">
                    AVG GATEWAY OVERHEAD
                  </span>
                </motion.div>

                {/* Total Tokens Processed */}
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.7)" }}
                  className="bg-cyber-dark/40 border border-gray-800 hover:border-purple-400/40 transition-colors duration-200 p-6 rounded-xl relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-2 right-2 text-sky-500/20"><TrendingUp className="h-10 w-10" /></div>
                  <span className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase">TOKENS PROCESSED</span>
                  <span className="block font-display text-2xl font-bold text-white mt-2.5 font-mono">
                    {metric?.totalTokensProcessed.toLocaleString() || "0"}
                  </span>
                  <span className="block font-mono text-[9px] text-purple-400 mt-1">
                    CUMULATIVE CONTEXT
                  </span>
                </motion.div>

              </div>

              {/* Hardware Utilization Card */}
              <motion.div 
                className="bg-cyber-dark/40 border border-gray-800 hover:border-sky-400/30 transition-colors duration-200 rounded-xl p-6 relative overflow-hidden"
              >
                <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block mb-6">CLUSTER DIAGNOSTICS</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CPU Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-gray-400 flex items-center space-x-1">
                        <Cpu className="h-4 w-4 text-sky-400 mr-1" />
                        <span>Core CPU Overhead</span>
                      </span>
                      <span className="text-white font-semibold">{metric?.cpuUsage}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric?.cpuUsage || 0}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Memory Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-gray-400 flex items-center space-x-1">
                        <Database className="h-4 w-4 text-purple-400 mr-1" />
                        <span>HBM2 Memory In Use</span>
                      </span>
                      <span className="text-white font-semibold">{metric?.memoryUsage}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric?.memoryUsage || 0}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="mt-6 pt-4 border-t border-gray-800/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-mono text-gray-500">
                  <div>
                    <span>GPU CHIP TEMPERATURE: </span>
                    <span className="text-white font-semibold">{metric?.gpuTemperature}°C</span>
                  </div>
                  <div>
                    <span>NETWORK BANDWIDTH: </span>
                    <span className="text-white font-semibold">{metric?.networkThroughput}</span>
                  </div>
                  <div>
                    <span>HOST PROTOCOL: </span>
                    <span className="text-white font-semibold">PORT 3000</span>
                  </div>
                  <div>
                    <span>CLUSTER STATE: </span>
                    <span className="text-emerald-400 font-semibold uppercase">{metric?.clusterHealth}</span>
                  </div>
                </div>
              </motion.div>

              {/* API Gateways & Micropipelines */}
              <div className="bg-cyber-dark/40 border border-gray-800 rounded-xl p-6">
                <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block mb-4">ACTIVE MICRO-PIPELINES</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {metric?.services.map((svc, sIdx) => (
                    <motion.div 
                      key={sIdx} 
                      whileHover={{ scale: 1.01 }}
                      className="bg-gray-950/40 border border-gray-800/80 hover:border-sky-400/30 p-4 rounded-lg flex items-center justify-between cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="block text-xs font-semibold text-white">{svc.name}</span>
                          <span className="block text-[9px] font-mono text-gray-500">UPTIME: {svc.uptime}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                        {svc.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Client Lead Specification Board (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              
              <div className="bg-cyber-dark/60 border border-gray-800 rounded-xl p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800/60">
                    <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">VELOX CRM STATUS</span>
                    <Inbox className="h-4 w-4 text-sky-400" />
                  </div>
                  
                  <h3 className="font-display font-bold text-white text-base">Corporate Spec Log</h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed mb-6">
                    Inbound inquiries logged securely by client representatives or conversational lead generation flows.
                  </p>

                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                    {leads.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-gray-800 rounded-lg">
                        <Inbox className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                        <span className="block font-mono text-[10px] text-gray-500">NO INQUIRIES REGISTERED</span>
                      </div>
                    ) : (
                      leads.map((lead) => (
                        <div 
                          key={lead.id} 
                          className="bg-gray-950/60 border border-gray-800/80 p-4 rounded-lg flex flex-col justify-between text-xs hover:border-gray-700 transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-semibold text-white tracking-wide">{lead.name}</span>
                            <span className="font-mono text-[8px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded border border-sky-500/20 uppercase">
                              {lead.status}
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-gray-400 text-[11px]">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="h-3 w-3 text-sky-500/60" />
                              <span className="text-gray-300">{lead.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Layers className="h-3 w-3 text-purple-500/60" />
                              <span className="text-sky-300">{lead.service}</span>
                            </div>
                          </div>

                          <p className="text-gray-500 text-[10px] italic mt-2.5 line-clamp-2 border-t border-gray-900 pt-2">
                            "{lead.message}"
                          </p>
                          
                          <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-gray-600 border-t border-gray-900 pt-2">
                            <span>BUDGET: {lead.budget}</span>
                            <span>{new Date(lead.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/40 text-[9px] font-mono text-center text-gray-600">
                  CRM DIRECTORY // ISO SECURE VAULT
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
