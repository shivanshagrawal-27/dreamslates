"use client";

import React, { useState } from "react";
import { useToastStore } from "@/store/useToastStore";
import { Mail, MessageSquare, ShieldAlert, Sparkles, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactPage() {
  const { showToast } = useToastStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("support");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setSubmitting(true);

    // Simulate sending email
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast("Message sent successfully!", "success");
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background py-20 relative overflow-hidden grid-bg flex flex-col justify-between">
      <div className="absolute top-20 left-10 w-[300px] h-[300px] radial-glow pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contact & Support</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Get in Touch
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have questions about AI generation, Pexels attribution, API options, or want to file a copyright takedown request? Fill out the form or reach us directly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">General Support</h4>
                  <p className="text-xs text-muted-foreground">support@dreamslates.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <ShieldAlert className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">Copyright Claims Agent</h4>
                  <p className="text-xs text-muted-foreground">copyright@dreamslates.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Your Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Subject Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
                      >
                        <option value="support">General Support & Feedback</option>
                        <option value="api">API Configurations</option>
                        <option value="copyright">Copyright Takedown Claim (DMCA)</option>
                        <option value="abuse">Report AI Abuse</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Your Message</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your detailed support request, feedback, or DMCA report here..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "Sending Message..." : "Submit Form"}</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Message Received!</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Dreamslates support. Our team will review your ticket (Category: {category.toUpperCase()}) and respond within 24–48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Custom Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center space-y-3.5">
          <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-1.5">
            <span>Crafted with</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
            <span>by</span>
            <span className="font-semibold text-foreground">Shivansh Agrawal</span>
          </p>
          <div className="flex justify-center items-center gap-3">
            <a
              href="https://github.com/shivanshagrawal-27"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-border hover:border-indigo-500 hover:text-indigo-500 transition-all hover:scale-105 cursor-pointer text-muted-foreground"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/shivanshcodes/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-border hover:border-indigo-500 hover:text-indigo-500 transition-all hover:scale-105 cursor-pointer text-muted-foreground"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
