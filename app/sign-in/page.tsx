"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-indigo-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-300/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -60, null],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="fixed top-0 left-6 right-0 z-50 m-7">
        <motion.div
          className="cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          <div className="flex items-center gap-2">
          
            <span className="text-xl text-slate-800 tracking-tight">relay</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center min-h-[calc(100vh-88px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Main card */}
          <div className="relative">
            {/* Glass card */}
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-gray-200/20 p-8 overflow-hidden">
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 rounded-3xl"></div>
              
              <div className="relative space-y-8">
                {/* Welcome section */}
                <div className="text-center space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-2xl font-light text-gray-900 lowercase tracking-wide"
                  >
                    welcome back
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-gray-600 text-base leading-relaxed font-normal"
                  >
                    Sign in to access your conversations and
                    <span className="text-blue-600 font-medium"> stay connected</span>
                  </motion.p>
                </div>

                {/* Google Sign-in Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  onClick={() => signIn("google")}
                  className="group relative w-full flex items-center justify-center gap-4 rounded-2xl bg-white border-2 border-gray-200/60 hover:border-blue-200/60 py-4 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl shadow-gray-200/20 hover:shadow-blue-200/20 transition-all duration-400 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="relative flex items-center gap-4">
                    {/* Enhanced Google Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg
                        className="h-6 w-6 drop-shadow-sm"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.1 2.73 29.92 0 24 0 14.64 0 6.49 5.52 2.69 13.5l7.96 6.19C12.43 13.43 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.5 24.5c0-1.57-.14-3.09-.39-4.56H24v9.14h12.7c-.55 2.84-2.2 5.25-4.7 6.87l7.36 5.72C43.72 37.54 46.5 31.48 46.5 24.5z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.65 28.31A14.48 14.48 0 0 1 9.5 24c0-1.48.25-2.91.7-4.31l-7.96-6.19C.78 16.68 0 20.25 0 24c0 3.75.78 7.32 2.24 10.5l8.41-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.91-2.13 15.88-5.81l-7.36-5.72c-2.05 1.38-4.66 2.2-8.52 2.2-6.26 0-11.57-3.93-13.35-9.31l-8.41 6.19C6.49 42.48 14.64 48 24 48z"
                        />
                      </svg>
                    </motion.div>
                    
                    <span className="text-base font-medium lowercase tracking-wide">
                      continue with google
                    </span>
                    
                    <motion.span 
                      className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>

                {/* Benefits section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="space-y-3"
                >
                  <p className="text-xs text-gray-400 text-center font-light tracking-wide uppercase mb-4">
                    what you&apos;ll get
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "secure conversations", 
                      "personalized experience", 
                      "seamless connectivity"
                    ].map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                        className="flex items-center justify-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-400/60 mr-3 flex-shrink-0"></div>
                        <span className="font-normal lowercase">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 text-center"
          >
            <div className="text-xs text-gray-400 font-light space-x-6">
              <motion.a 
                href="#" 
                className="hover:text-gray-600 transition-colors duration-300 lowercase tracking-wide"
                whileHover={{ y: -1 }}
              >
                terms of service
              </motion.a>
              <span className="text-gray-300">|</span>
              <motion.a 
                href="#" 
                className="hover:text-gray-600 transition-colors duration-300 lowercase tracking-wide"
                whileHover={{ y: -1 }}
              >
                privacy policy
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}