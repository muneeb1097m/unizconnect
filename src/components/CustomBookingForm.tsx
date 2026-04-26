'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, Upload, Loader2, Sparkles, ShieldCheck, MapPin, GraduationCap, X } from 'lucide-react'

// Steps configuration
const STEPS = [
  { id: 'personal', title: 'Identity', subtitle: 'Who are we guided?' },
  { id: 'profile', title: 'Profile', subtitle: 'Your background' },
  { id: 'payment', title: 'Verification', subtitle: 'Secure your spot' },
]

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg', lastModified: Date.now() });
            resolve(newFile);
          } else {
            reject(new Error('Canvas to Blob failed'));
          }
        }, 'image/jpeg', 0.6);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function CustomBookingForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    cgpa: '',
    practicalNotes: '',
    screenshot: null as File | null,
    cv: null as File | null,
  })

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      
      if (file.size > 1024 * 1024 && file.type.startsWith('image/')) {
        setNotification({ type: 'success', message: 'Optimizing high-resolution image...' });
        try {
          file = await compressImage(file);
        } catch (error) {
          console.error("Compression failed", error);
        }
      }

      if (file.size > 1024 * 1024) {
        setNotification({ type: 'error', message: 'Screenshot size exceeds 1MB limit even after compression. Please upload a smaller image.' });
        e.target.value = '';
        return;
      } else if (e.target.files[0].size > 1024 * 1024 && file.size <= 1024 * 1024) {
        setNotification({ type: 'success', message: 'Image successfully compressed and attached!' });
      }
      
      setFormData(prev => ({ ...prev, screenshot: file }))
    }
  }

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prevStep = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = new FormData();
      payload.append('locationId', 'B1KkpgABfPleeIPoYy8x');
      payload.append('full_name', formData.fullName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('city', formData.city);
      payload.append('cgpa', formData.cgpa);
      payload.append('practicalNotes', formData.practicalNotes);
      
      if (formData.cv) {
        payload.append('cv_filename', formData.cv.name);
        payload.append('cv_base64', await fileToBase64(formData.cv));
      }
      if (formData.screenshot) {
        payload.append('screenshot_filename', formData.screenshot.name);
        payload.append('screenshot_base64', await fileToBase64(formData.screenshot));
      }

      const response = await fetch('/api/webhook', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error('Submission failed');

      setNotification({ 
        type: 'success', 
        message: `Thank You ${formData.fullName} for submitting your details.\n\nOur team will review it and get back to you soon.` 
      })
      setStep(0);
      setFormData({ fullName: '', email: '', phone: '', city: '', cgpa: '', practicalNotes: '', screenshot: null, cv: null });
    } catch (error) {
      console.error(error);
      setNotification({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEmailValid = formData.email.includes('@');
  const isPhoneValid = /^(?:\+92|0)3\d{9}$/.test(formData.phone.replace(/\s+/g, ''));

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[32px] shadow-premium border border-primary/5 p-4 md:p-10 relative overflow-hidden">
      
      {/* Custom Notification UI */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            className={`fixed top-6 left-1/2 z-[9999] w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border flex items-start gap-4 backdrop-blur-xl ${
              notification.type === 'success' 
                ? 'bg-green-500/95 text-white border-white/20' 
                : 'bg-red-500/95 text-white border-white/20'
            }`}
          >
            <div className="bg-white/20 p-2 rounded-full flex-shrink-0 mt-1">
              {notification.type === 'success' ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">{notification.type === 'success' ? 'Success!' : 'Notice'}</h4>
              <p className="text-white/90 text-sm font-medium leading-relaxed whitespace-pre-line">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="relative mb-16 px-4">
        {/* Background Line */}
        <div className="absolute top-6 left-12 right-12 h-[2px] bg-primary/10 -z-10" />
        
        {/* Active Line */}
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          className="absolute top-6 left-12 h-[2px] bg-[#4a0e8f] -z-10 transition-all duration-500 origin-left"
          style={{ width: `calc(${(step / (STEPS.length - 1)) * 100}% - 48px)` }}
        />

        <div className="flex justify-between items-center relative">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-3">
              <motion.div 
                animate={{ 
                  scale: i === step ? 1.1 : 1,
                  backgroundColor: i <= step ? '#4a0e8f' : '#ffffff',
                }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-colors duration-500
                  ${i <= step ? 'border-[#4a0e8f] text-white shadow-lg shadow-[#4a0e8f]/20' : 'border-[#4a0e8f]/20 text-[#4a0e8f]/40'}
                `}
              >
                {i < step ? <Check className="w-6 h-6 stroke-[3]" /> : i + 1}
              </motion.div>
              <div className="text-center">
                <span className={`block text-[10px] uppercase font-black tracking-widest ${i <= step ? 'text-[#4a0e8f]' : 'text-[#4a0e8f]/30'}`}>
                  {s.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input 
        id="cv-upload"
        type="file" 
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            const file = e.target.files[0];
            if (file.size > 1024 * 1024) {
              setNotification({ type: 'error', message: 'CV document exceeds 1MB limit. Documents cannot be auto-compressed like images. Please upload a smaller file.' });
              e.target.value = '';
              return;
            }
            setFormData(p => ({ ...p, cv: file }))
          }
        }}
      />
      <input 
        id="file-upload"
        type="file" 
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Visible UI Form (Intercepts submit logic) */}
      <form onSubmit={handleSubmit} className="relative z-10 min-h-[420px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6 will-change-transform"
            >
              <div className="mb-10 text-center">
                <h3 className="font-fraunces text-4xl text-dark mb-3">Who are you?</h3>
                <p className="text-dark/50 text-sm font-medium">Let&apos;s start with your profile details.</p>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2 transition-all group-within:text-primary">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ayesha Saleem"
                    className="w-full bg-[#fcfaff] border-2 border-primary/5 focus:border-primary/30 focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-dark placeholder:text-dark/30 shadow-sm"
                  />
                </div>

                <div className="group">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2 transition-all group-within:text-primary">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    className={`w-full bg-[#fcfaff] border-2 focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-dark placeholder:text-dark/30 shadow-sm
                      ${formData.email && !isEmailValid ? 'border-red-500/50 focus:border-red-500' : 'border-primary/5 focus:border-primary/30'}`}
                  />
                  {formData.email && !isEmailValid && (
                    <span className="text-[10px] text-red-500 mt-2 block font-medium">Valid email address requires an '@' symbol.</span>
                  )}
                </div>

                <div className="group">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2 transition-all group-within:text-primary">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 03001234567 or +923001234567"
                    className={`w-full bg-[#fcfaff] border-2 focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-dark placeholder:text-dark/30 shadow-sm
                      ${formData.phone && !isPhoneValid ? 'border-red-500/50 focus:border-red-500' : 'border-primary/5 focus:border-primary/30'}`}
                  />
                  {formData.phone && !isPhoneValid && (
                    <span className="text-[10px] text-red-500 mt-2 block font-medium">Format must be +923... or 03... (exact length required).</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6 will-change-transform"
            >
              <div className="mb-10 text-center">
                <h3 className="font-fraunces text-4xl text-dark mb-3">Your Background</h3>
                <p className="text-dark/50 text-sm font-medium">Tell us about your current situation.</p>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2 transition-all group-within:text-primary flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Current City
                  </label>
                  <input 
                    required
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Lahore, Karachi"
                    className="w-full bg-[#fcfaff] border-2 border-primary/5 focus:border-primary/30 focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-dark placeholder:text-dark/30 shadow-sm"
                  />
                </div>

                <div className="group">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2 transition-all group-within:text-primary flex items-center gap-2">
                    <GraduationCap className="w-3 h-3" /> Enter Your CGPA
                  </label>
                  <input 
                    required
                    type="text" 
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    placeholder="e.g. 3.8/4.0"
                    className="w-full bg-[#fcfaff] border-2 border-primary/5 focus:border-primary/30 focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-dark placeholder:text-dark/30 shadow-sm"
                  />
                </div>

                <div className="group">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2 transition-all group-within:text-primary">Anything practical to share?</label>
                  <input 
                    type="text" 
                    name="practicalNotes"
                    value={formData.practicalNotes}
                    onChange={handleChange}
                    placeholder="Tell us more about your goals"
                    className="w-full bg-[#fcfaff] border-2 border-primary/5 focus:border-primary/30 focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-dark placeholder:text-dark/30 shadow-sm"
                  />
                </div>

                <div className="group pt-4 border-t border-primary/5">
                  <label className="block text-[11px] uppercase font-bold tracking-[2px] text-dark/60 mb-2">Upload your CV (Optional)</label>
                  <div 
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-between
                      ${formData.cv ? 'bg-primary/5 border-[#4a0e8f] text-[#4a0e8f]' : 'bg-[#fcfaff] border-[#4a0e8f]/10 text-dark/40 hover:border-[#4a0e8f]/20'}
                    `}
                  >
                    <span className="text-xs font-bold">{formData.cv ? formData.cv.name : 'Click to upload CV'}</span>
                    <Upload className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6 will-change-transform"
            >
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 mx-auto">
                  <ShieldCheck className="w-3 h-3" /> Secure Payment
                </div>
                <h3 className="font-fraunces text-4xl text-dark mb-3">Final Step</h3>
                <p className="text-dark/50 text-sm font-medium">Attach payment proof to confirm booking.</p>
              </div>

              <div 
                className={`relative border-2 border-dashed rounded-[30px] p-12 flex flex-col items-center justify-center transition-all cursor-pointer group
                  ${formData.screenshot ? 'bg-[#4a0e8f]/5 border-[#4a0e8f]' : 'bg-[#fcfaff] border-[#4a0e8f]/20 hover:border-[#4a0e8f]/40 hover:bg-white'}
                `}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 
                  ${formData.screenshot ? 'bg-[#4a0e8f] text-white' : 'bg-[#4a0e8f]/10 text-[#4a0e8f]'}
                `}>
                  {formData.screenshot ? <Check className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
                </div>
                
                <p className="font-black text-base uppercase tracking-wider text-dark mb-1">
                  {formData.screenshot ? formData.screenshot.name : 'Upload Screenshot'}
                </p>
                <p className="text-[10px] text-dark/30 font-black uppercase tracking-[2px]">
                  PNG or JPG (Max 1MB)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="mt-auto pt-12 flex items-center justify-between gap-6">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 text-primary font-black uppercase text-[11px] tracking-widest px-8 py-5 rounded-2xl hover:bg-primary/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          
          <div className="ml-auto w-full md:w-auto">
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 0 && (!formData.fullName || !isEmailValid || !isPhoneValid)) ||
                  (step === 1 && (!formData.city || !formData.cgpa))
                }
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#4a0e8f] text-white font-black uppercase text-[11px] tracking-[2px] px-12 py-5 rounded-2xl shadow-xl shadow-[#4a0e8f]/20 hover:bg-[#320a61] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !formData.screenshot}
                className="w-full md:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-[#4a0e8f] to-[#2a064f] text-white font-black uppercase text-[11px] tracking-[2px] px-14 py-5 rounded-2xl shadow-2xl shadow-[#4a0e8f]/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Finalize Booking <Sparkles className="w-5 h-5" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
