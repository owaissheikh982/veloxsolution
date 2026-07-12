import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  Send,
  CheckCircle,
  AlertCircle,
  Cpu,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign,
  Briefcase
} from "lucide-react";

export default function ContactPage() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  // Interactive Project Planner state
  const [agentsCount, setAgentsCount] = useState<number>(3);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Website Development"
  ]);
  const [budgetTier, setBudgetTier] = useState<string>("$25k - $50k");

  // Dynamic estimate calculator state
  const [estCost, setEstCost] = useState<number>(8000);
  const [estTimeline, setEstTimeline] = useState<string>("2-3 weeks");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const servicesList = [
    { name: "Website Development", baseCost: 8000, timelineWeeks: 2 },
    { name: "Web Application Development", baseCost: 25000, timelineWeeks: 4 },
    { name: "Mobile Application Development", baseCost: 30000, timelineWeeks: 5 },
    { name: "Custom Software Solutions", baseCost: 20000, timelineWeeks: 3 },
    { name: "AI and Automation Solutions", baseCost: 35000, timelineWeeks: 4 },
    { name: "UI/UX Design", baseCost: 10000, timelineWeeks: 2 },
    { name: "System Integration", baseCost: 15000, timelineWeeks: 2 },
    { name: "Maintenance and Support", baseCost: 5000, timelineWeeks: 1 }
  ];

  // Dynamic cost & timeline calculator
  useEffect(() => {
    let cost = 0;
    let weeks = 0;

    servicesList.forEach(service => {
      if (selectedServices.includes(service.name)) {
        cost += service.baseCost;
        weeks += service.timelineWeeks;
      }
    });

    // Factor in number of agents
    if (selectedServices.includes("AI and Automation Solutions")) {
      const agentMultiplier = Math.max(1, 1 + (agentsCount - 3) * 0.15);
      cost = Math.round(cost * agentMultiplier);
      weeks = Math.round(weeks * Math.max(1, 1 + (agentsCount - 3) * 0.08));
    }

    setEstCost(cost);
    setEstTimeline(`${weeks}-${weeks + 2} weeks`);

    // Match budget tier recommendation
    if (cost < 40000) {
      setBudgetTier("$25k - $50k");
    } else if (cost < 95000) {
      setBudgetTier("$50k - $100k");
    } else {
      setBudgetTier("$100k+");
    }
  }, [selectedServices, agentsCount]);

  const handleServiceToggle = (serviceName: string) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length > 1) {
        setSelectedServices(prev => prev.filter(s => s !== serviceName));
      }
    } else {
      setSelectedServices(prev => [...prev, serviceName]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!name || !email || !company) {
      setFormError("Name, Corporate Email, and Company Name are required parameters.");
      return;
    }

    setSubmitting(true);

    try {
      // Create detailed system spec outline based on planner selections
      const systemSpecification = `Interactive Planner Config: Services: [${selectedServices.join(", ")}]. Estimated Node Complexity: ${agentsCount} agents. Dynamically estimated baseline cost: $${estCost.toLocaleString()} (Timeline: ${estTimeline}). User outline: ${message}`;

      const apiBase = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3002" : "https://veloxsolutionbackend-production.up.railway.app");
      const res = await fetch(`${apiBase}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          service: selectedServices[0] || "Custom Architecture",
          budget: budgetTier,
          message: systemSpecification
        })
      });

      if (res.ok) {
        setFormSuccess(true);
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        const data = await res.json();
        setFormError(data.error || "A system level failure was reported from the database.");
      }
    } catch (err) {
      setFormError("Communication grid failure. Please check your network or try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-24">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 pt-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">ESTABLISH GATEWAY LINK</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">Connect With Us</h1>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Configure your technical requirements dynamically using our project planner or submit an enterprise RFQ directly to our team.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: secure contact credentials & values */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-cyber-dark/40 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="font-mono text-[9px] text-sky-400 uppercase tracking-wider block mb-1">SYSTEMS COMMUNICATOR</span>
                <h3 className="font-display font-bold text-xl text-white">Velox Communication Node</h3>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                  We maintain a hyper-focused SLA. All corporate inquiries are triage-routed automatically to our Lead Architecture Engineers.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800/60 font-mono text-xs">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 uppercase">RESPONSE TARGET</span>
                    <span className="text-gray-200">Within 4 Business Hours</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Cpu className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 uppercase">COGNITIVE LATENCY</span>
                    <span className="text-gray-200">12ms average parser routing</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Terminal className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 uppercase">PGP SECURITY KEY</span>
                    <span className="text-gray-400 text-[10px] break-all truncate block">SHA256: 72A96B...0F9C58</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote details breakdown display */}
            <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
              <h4 className="font-mono text-[10px] text-sky-400 uppercase tracking-widest flex items-center space-x-2">
                <Sliders className="h-4 w-4" />
                <span>DYNAMIC ARCHITECTURE ESTIMATOR</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
                <div className="bg-gray-950/40 p-4 rounded-xl border border-gray-900">
                  <span className="text-[9px] text-gray-500 block mb-1 uppercase">ESTIMATED COST</span>
                  <span className="text-xl font-bold text-white flex items-center">
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                    <span>{estCost.toLocaleString()}</span>
                  </span>
                </div>

                <div className="bg-gray-950/40 p-4 rounded-xl border border-gray-900">
                  <span className="text-[9px] text-gray-500 block mb-1 uppercase">TARGET TIMELINE</span>
                  <span className="text-xs font-bold text-purple-400 block mt-1.5">{estTimeline}</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-400 leading-relaxed pt-2">
                * Estimates are calculated on baseline complexity matrices. Active adapter weights, vector indexing capacity, and model selection will affect final contract value.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form & Project Planner */}
          <div className="lg:col-span-7 bg-cyber-dark/40 border border-gray-800 rounded-2xl p-6 sm:p-8 text-left">
            <h3 className="font-display font-bold text-lg text-white mb-6">Bespoke Project Planner</h3>

            <form onSubmit={handleFormSubmit} className="space-y-6">

              {/* Service Selection */}
              <div>
                <label className="block font-mono text-[9px] text-gray-400 mb-2 uppercase">SELECT CORE ARCHITECTURE TARGETS *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesList.map((service, idx) => {
                    const isSelected = selectedServices.includes(service.name);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleServiceToggle(service.name)}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start space-x-3 text-xs ${isSelected
                            ? "bg-sky-500/5 border-sky-400 text-white"
                            : "bg-gray-950/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
                          }`}
                      >
                        <div className={`mt-0.5 h-3.5 w-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 ${isSelected ? "border-sky-400 bg-sky-400/20" : "border-gray-700"
                          }`}>
                          {isSelected && <div className="h-1.5 w-1.5 rounded-sm bg-sky-400" />}
                        </div>
                        <div>
                          <span className="font-semibold block">{service.name}</span>
                          <span className="block text-[10px] text-gray-500 mt-0.5 font-mono">
                            Base: ${service.baseCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Slider for Agent Count (Active only if agent lattice is selected) */}
              {selectedServices.includes("AI and Automation Solutions") && (
                <div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-gray-400 mb-2 uppercase">
                    <span>TARGET NODE COMPLEXITY</span>
                    <span className="text-sky-400 font-bold">{agentsCount} COORDINATED AGENTS</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    value={agentsCount}
                    onChange={(e) => setAgentsCount(Number(e.target.value))}
                    className="w-full accent-sky-400 bg-gray-900 rounded-lg cursor-pointer h-1.5"
                  />
                  <div className="flex items-center justify-between font-mono text-[8px] text-gray-600 mt-1">
                    <span>2 (MINIMAL AGENT PAIR)</span>
                    <span>12 (MAX COGNITIVE LATTICE)</span>
                  </div>
                </div>
              )}

              {/* Corporate details fields */}
              <div className="border-t border-gray-800/60 pt-6 space-y-4">
                <span className="block font-mono text-[9px] text-gray-400 uppercase mb-2">Corporate Identity Parameters</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] text-gray-400 mb-1">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Gideon Vance"
                      className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] text-gray-400 mb-1">COMPANY / ENTITY *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nexus Logistics Inc"
                      className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-gray-400 mb-1">CORPORATE EMAIL ADDR *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="g.vance@nexuslogistics.com"
                    className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-gray-400 mb-1">PROJECT DETAILS / REQUIREMENTS OUTLINE</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Explain what specific nodes, models or databases need custom optimization..."
                    className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none resize-none font-mono"
                  />
                </div>
              </div>

              {formError && (
                <div className="flex items-center space-x-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-3 rounded">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess ? (
                <div className="flex flex-col items-center justify-center text-center bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl space-y-2 font-mono">
                  <CheckCircle className="h-6 w-6 text-emerald-400 animate-bounce" />
                  <span className="font-bold text-emerald-400 text-xs">TRANSMISSION PROTOCOLS INITIATED</span>
                  <span className="text-[10px] text-gray-300 max-w-md">
                    Lead specifications parsed and logged in the secure CRM database. You can monitor active entries in real time on our **Capability Matrix** portal under Client Specifications.
                  </span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-white hover:bg-gray-100 text-black font-mono font-bold text-xs tracking-widest rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submitting ? "TRANSMITTING..." : "TRANSMIT SPECIFICATIONS"}</span>
                </button>
              )}

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
