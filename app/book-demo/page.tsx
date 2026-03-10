'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { sendDemoRequest } from '@/app/actions/send-demo-request';
import { CheckCircle2, AlertCircle, Loader2, User, Building2, Mail, Phone, ArrowRight, Briefcase } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  schoolName: z.string().min(3, 'School name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  title: z.string().min(2, 'Job title is required'),
});

type FormData = z.infer<typeof schema>;

export default function BookDemoPage() {
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] = useState<{ success?: boolean; message?: string; error?: any } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((data) => {
    setServerState(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });

        const result = await sendDemoRequest(null, formData);
        setServerState(result);
        if (result?.success) {
          reset();
        }
      } catch (err) {
        setServerState({ success: false, message: 'An unexpected error occurred. Please try again.' });
      }
    });
  });

  const fields = [
    { id: 'firstName', label: 'First Name', type: 'text', icon: User, required: true },
    { id: 'lastName', label: 'Last Name', type: 'text', icon: User, required: true },
    { id: 'schoolName', label: 'School Name', type: 'text', icon: Building2, required: true },
    { id: 'title', label: 'Title', type: 'text', icon: Briefcase, required: true },
    { id: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
    { id: 'phone', label: 'Phone / WhatsApp', type: 'tel', icon: Phone, required: true },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#06090f] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-0">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">

        {/* Left Side: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-2">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-sm font-medium text-purple-300">Book a Live Demo</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            See <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Prepdha</span> in Action
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Discover how our AI-powered learning platform can transform student retention and provide actionable insights for your educators.
          </p>

          <div className="hidden lg:flex flex-col gap-4 mt-8">
            {[
              "100% NCERT Aligned Curriculum",
              "Zero Extra Effort for Teachers",
              "Powerful School Analytics Dashboard"
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400">
                  <CheckCircle2 size={14} />
                </div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">

            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fields.map((field) => (
                  <div key={field.id} className="relative group">
                    <label htmlFor={field.id} className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 flex items-center gap-1.5">
                      <field.icon size={14} className="text-purple-400" />
                      {field.label} {field.required && <span className="text-purple-400">*</span>}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      {...register(field.id as keyof FormData)}
                      className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-600 
                                 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300
                                 ${errors[field.id as keyof FormData] ? 'border-red-500/50' : 'border-slate-700/50 hover:border-slate-600'}`}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                    <AnimatePresence>
                      {errors[field.id as keyof FormData] && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="text-red-400 text-xs ml-1 flex items-center gap-1"
                        >
                          <AlertCircle size={12} />
                          {errors[field.id as keyof FormData]?.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full flex items-center justify-center gap-2 py-4 px-8 bg-white/10 hover:bg-white/15 
                             text-white font-semibold rounded-xl border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] overflow-hidden 
                             transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin text-purple-400" size={20} />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request Demo</span>
                    <ArrowRight size={18} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {serverState?.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-6 p-4 rounded-xl flex items-start gap-3 border ${serverState.success
                    ? 'bg-green-500/10 border-green-500/20 text-green-300'
                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                    }`}
                >
                  {serverState.success ? (
                    <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                  ) : (
                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  )}
                  <span className="text-sm leading-relaxed">{serverState.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          <p className="text-center text-slate-500 text-xs mt-6 flex items-center justify-center gap-1.5">
            <CheckCircle2 size={12} className="text-slate-600" />
            No credit card required. Free 30-minute consultation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}