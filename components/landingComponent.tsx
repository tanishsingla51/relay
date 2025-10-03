/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { MessageSquare, Shield, Zap, Users, Check, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/rooms");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-12 flex flex-col min-h-screen">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-16 items-center flex-grow min-h-[80vh]"
        >
          {/* Left content */}
          <div className="space-y-8">
            <div className="text-xs text-gray-400 font-medium tracking-widest uppercase">
              relay chat
            </div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight"
              >
                <span className="text-gray-500 text-2xl md:text-3xl lg:text-4xl block mb-2">
                  connect beyond
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  boundaries
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-normal"
              >
                experience messaging reimagined with{" "}
                <span className="text-blue-600">lightning speed</span>,{" "}
                <span className="text-purple-600">bulletproof security</span>, and{" "}
                <span className="text-indigo-600">seamless conversations</span>
              </motion.p>
            </div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              {[
                "End-to-end encrypted conversations",
                "Real-time messaging across all devices", 
                "Smart AI-powered features",
                "Group chats up to 10,000 members"
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-normal">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <button
                onClick={handleGetStarted}
                disabled={status === "loading"}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : session ? (
                  <>
                    <span>Enter Chat Rooms</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">2M+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">50M+</div>
                <div className="text-sm text-gray-500">Messages Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-xs text-gray-400 pt-4">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-400"></div>
                private & secure
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                cross-platform sync
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                always free
              </span>
            </div>
          </div>

          {/* Right side - Chat Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
              {/* Floating notification cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -left-8 top-16 w-64 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                  <span className="font-medium text-gray-800 text-sm">Team Design</span>
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <p className="text-xs text-gray-600">Sarah: "New mockups are ready! 🎨"</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -right-8 top-32 w-64 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                  <span className="font-medium text-gray-800 text-sm">Alex Johnson</span>
                  <div className="ml-auto text-xs text-gray-400">now</div>
                </div>
                <p className="text-xs text-gray-600">Thanks for the quick response! 🚀</p>
              </motion.div>

              {/* Main chat interface */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden h-full"
              >
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">Product Team</h3>
                      <p className="text-xs text-gray-500">8 members • 5 online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-gray-600">Active</span>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-4 space-y-4 h-80 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex-shrink-0"></div>
                    <div>
                      <div className="bg-gray-50 px-3 py-2 rounded-2xl rounded-tl-lg max-w-xs">
                        <p className="text-gray-800 text-sm">Hey team! Just finished the new landing page design ✨</p>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">2:34 PM</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    className="flex gap-2 justify-end"
                  >
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-2xl rounded-tr-lg max-w-xs">
                        <p className="text-white text-sm">Looks amazing! The animations are so smooth 🔥</p>
                      </div>
                      <span className="text-xs text-gray-500 mr-1">2:35 PM</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0"></div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex-shrink-0"></div>
                    <div>
                      <div className="bg-gray-50 px-3 py-2 rounded-2xl rounded-tl-lg max-w-xs">
                        <p className="text-gray-800 text-sm">Ready to ship this? 🚀</p>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">2:36 PM</span>
                    </div>
                  </motion.div>

                  {/* Typing indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 flex-shrink-0"></div>
                    <div className="bg-gray-50 px-3 py-2 rounded-2xl rounded-tl-lg">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-gray-400"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Input area */}
                <div className="border-t border-gray-100 p-4">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm"
                      disabled
                    />
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 border-t border-gray-200/50"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              built for the way you
              <span className="text-blue-600"> communicate</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              every feature designed with your privacy, speed, and experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "lightning fast",
                description: "messages delivered instantly across all your devices with real-time synchronization",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: Shield,
                title: "military-grade security", 
                description: "end-to-end encryption ensures your conversations stay private and secure",
                gradient: "from-green-400 to-emerald-500"
              },
              {
                icon: Users,
                title: "seamless collaboration",
                description: "create groups, share files, and collaborate effortlessly with teams of any size",
                gradient: "from-purple-400 to-indigo-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-200/50 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-4 md:mb-0">
              relay
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a className="hover:text-gray-800 transition-colors">privacy</a>
              <a className="hover:text-gray-800 transition-colors">terms</a>
              <a className="hover:text-gray-800 transition-colors">support</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}