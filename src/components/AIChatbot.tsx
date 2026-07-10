import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, Lead } from "../types";
import { motion } from "motion/react";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Terminal, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  FolderDot
} from "lucide-react";

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Greetings. I am the **Velox Autonomous Concierge**, an intelligent interface engineered to guide you through our comprehensive software solutions and advanced AI services.\n\nWe provide full-lifecycle engineering for digital systems. How can I assist you today?\n* **Website Development** (Landing Pages & Business Sites)\n* **Web & Mobile Application Development**\n* **Custom Software & AI/Automation Solutions**\n* **UI/UX Design, System Integration & Support**",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Mini Form State for Lead Booking
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadService, setLeadService] = useState("Website Development");
  const [leadBudget, setLeadBudget] = useState("$50k - $100k");
  const [leadMsg, setLeadMsg] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-adjust textarea height up to a max-height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [inputValue]);

  // Auto scroll to chat bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMsgText = inputValue;
    setInputValue("");

    const newUserMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: userMsgText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      // Map current message list to server-side standard
      const serverHistory = [...messages, newUserMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: serverHistory }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: `reply-${Date.now()}`,
          role: "assistant",
          content: data.response,
          timestamp: new Date()
        }]);
      } else {
        throw new Error("API returned an error status");
      }
    } catch (err: any) {
      console.error("Chat API error:", err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I encountered an interruption in my cognitive gateway. Please check your network connection or verify that the server is active.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Log specifications form submit
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!leadName || !leadEmail || !leadCompany) {
      setFormError("Name, Corporate Email, and Company are required.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          company: leadCompany,
          service: leadService,
          budget: leadBudget,
          message: leadMsg
        })
      });

      if (res.ok) {
        setFormSuccess(true);
        // Reset states
        setLeadName("");
        setLeadEmail("");
        setLeadCompany("");
        setLeadMsg("");
        
        // Append positive confirmation as AI message in chat
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `lead-confirm-${Date.now()}`,
            role: "assistant",
            content: `**System Acknowledgment**: Secure corporate specification successfully registered for **${leadCompany}**. \n\nOur Chief Technology Architect will review your requirements for **${leadService}** (Target Budget: ${leadBudget}) and establish contact via **${leadEmail}** within 4 business hours. Thank you for choosing Velox Solutions.`,
            timestamp: new Date()
          }]);
          setShowLeadForm(false);
          setFormSuccess(false);
        }, 1200);

      } else {
        const data = await res.json();
        setFormError(data.error || "Failed to submit leads.");
      }
    } catch (err) {
      setFormError("Failed to connect to Velox CRM database.");
    }
  };

  // Simple Markdown Parser for Chat Bubble
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold rendering
      let processed = line;
      
      // Handle list elements (starting with * or -)
      const isList = line.trim().startsWith("*") || line.trim().startsWith("-");
      if (isList) {
        processed = processed.replace(/^[\s*-]+/, "").trim();
      }

      // Format bold text (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(processed)) !== null) {
        if (match.index > lastIndex) {
          parts.push(processed.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < processed.length) {
        parts.push(processed.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : processed;

      if (isList) {
        return (
          <li key={idx} className="ml-4 list-disc text-gray-300 text-xs mb-1">
            {content}
          </li>
        );
      }

      return (
        <p key={idx} className="text-gray-300 text-xs mb-2 leading-relaxed">
          {content}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-cyber-dark border-l border-gray-800 shadow-2xl flex flex-col justify-between">
      
      {/* Header bar */}
      <div className="h-20 border-b border-gray-800 px-6 flex items-center justify-between bg-cyber-dark/90">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10">
            <Bot className="h-5 w-5 text-sky-400" />
            <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white tracking-wide">VELOX AI CONCIERGE</h3>
            <span className="block font-mono text-[9px] text-sky-500/80">ONLINE // SECURE_SOCKET</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="h-8 w-8 rounded-lg hover:bg-gray-800/80 border border-transparent hover:border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main chat viewport */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {showLeadForm ? (
          /* Mini Lead Form Embedded inside Panel */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-950/60 border border-gray-800 rounded-xl p-5"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800/60">
              <span className="font-mono text-xs text-sky-400 flex items-center space-x-1">
                <FolderDot className="h-4 w-4 mr-1 text-sky-400" />
                <span>Submit Lead Specifications</span>
              </span>
              <button 
                onClick={() => setShowLeadForm(false)}
                className="text-[10px] font-mono text-gray-500 hover:text-white transition-all cursor-pointer"
              >
                CANCEL
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] text-gray-400 mb-1">FULL NAME *</label>
                <input 
                  type="text" 
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Helena Vance"
                  className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-gray-400 mb-1">COMPANY *</label>
                  <input 
                    type="text" 
                    required
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="Vanguard Labs"
                    className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-gray-400 mb-1">CORPORATE EMAIL *</label>
                  <input 
                    type="email" 
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="h.vance@vanguard.com"
                    className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-gray-400 mb-1">TARGET SERVICE</label>
                  <select 
                    value={leadService}
                    onChange={(e) => setLeadService(e.target.value)}
                    className="w-full bg-cyber-dark border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option>Website Development</option>
                    <option>Web Application Development</option>
                    <option>Mobile Application Development</option>
                    <option>Custom Software Solutions</option>
                    <option>AI and Automation Solutions</option>
                    <option>UI/UX Design</option>
                    <option>System Integration</option>
                    <option>Maintenance and Support</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-gray-400 mb-1">PROJECT BUDGET</label>
                  <select 
                    value={leadBudget}
                    onChange={(e) => setLeadBudget(e.target.value)}
                    className="w-full bg-cyber-dark border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option>$25k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] text-gray-400 mb-1">BRIEF OUTLINE</label>
                <textarea 
                  rows={3}
                  value={leadMsg}
                  onChange={(e) => setLeadMsg(e.target.value)}
                  placeholder="Tell us about your multi-agent supply chain vision..."
                  className="w-full bg-cyber-dark/80 border border-gray-800 focus:border-sky-500 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none resize-none"
                />
              </div>

              {formError && (
                <div className="flex items-center space-x-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-2.5 rounded">
                  <AlertCircle className="h-4 w-4" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded">
                  <CheckCircle className="h-4 w-4 animate-bounce" />
                  <span>SYNCHRONIZING PROTOCOLS...</span>
                </div>
              ) : (
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-white text-black hover:bg-gray-100 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer transition-all"
                >
                  INITIALIZE SYSTEM LOG
                </button>
              )}
            </form>
          </motion.div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start space-x-3 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              {/* Avatar Icon */}
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center border flex-shrink-0 ${
                msg.role === "user" 
                  ? "bg-gray-800 border-gray-700 text-gray-300" 
                  : "bg-sky-500/10 border-sky-500/20 text-sky-400"
              }`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`glow-card px-4 py-3.5 max-w-[85%] rounded-2xl ${
                msg.role === "user" 
                  ? "bg-gray-900/40 border-gray-800" 
                  : "bg-gray-950/40 border-gray-800/80"
              }`}>
                <div className="markdown-body">
                  {renderMarkdown(msg.content)}
                </div>
                <span className="block text-[8px] font-mono text-gray-600 mt-2 text-right uppercase">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-gray-950/40 border border-gray-800/80 px-4 py-3.5 rounded-2xl flex items-center space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Tray & shortcut buttons */}
      <div className="border-t border-gray-800 p-6 bg-cyber-dark/90 space-y-4">
        
        {/* Helper shortcuts */}
        {!showLeadForm && (
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => {
                setInputValue("How much do your services cost?");
              }}
              className="px-3 py-1.5 bg-gray-900/60 border border-gray-800 rounded-lg text-[10px] font-mono text-gray-400 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              PROJECT BUDGETS
            </button>
            <button 
              onClick={() => {
                setInputValue("Tell me about your Multi-Agent Orchestration.");
              }}
              className="px-3 py-1.5 bg-gray-900/60 border border-gray-800 rounded-lg text-[10px] font-mono text-gray-400 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              MULTI-AGENTS
            </button>
            <button 
              onClick={() => setShowLeadForm(true)}
              className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-lg text-[10px] font-mono hover:bg-sky-500/20 hover:border-sky-500/40 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Sparkles className="h-3 w-3" />
              <span>BOOK APPOINTMENT</span>
            </button>
          </div>
        )}

        {/* Input Text Form */}
        {!showLeadForm && (
          <form onSubmit={handleSendMessage} className="flex space-x-3 items-end">
            <textarea 
              ref={textareaRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Inquire about custom multi-agent lattices..."
              className="flex-1 bg-gray-950/60 border border-gray-800 focus:border-sky-500/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none resize-none overflow-y-auto max-h-[140px] leading-relaxed custom-scrollbar"
              style={{ minHeight: "42px" }}
            />
            <button 
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="h-10 w-10 bg-white hover:bg-gray-100 text-black rounded-xl flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer flex-shrink-0 mb-[1px]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
