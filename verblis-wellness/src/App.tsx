/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Globe, 
  Sparkles, 
  Heart, 
  Calendar, 
  ArrowRight, 
  Menu, 
  X,
  CheckCircle2,
  Leaf,
  Moon,
  Sun,
  Bell,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/verblis/', color: 'hover:text-pink-500' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/verblis/', color: 'hover:text-blue-600' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/petrena-wood/', color: 'hover:text-blue-700' },
  { name: 'Website', icon: Globe, url: 'https://verblis.com/', color: 'hover:text-teal-500' },
];

const OFFERINGS = [
  {
    id: 'yoga',
    title: 'Yoga & Meditation',
    description: 'Personalized sessions to find your inner balance and physical strength.',
    icon: Leaf,
    tag: 'Popular'
  },
  {
    id: 'consistency',
    title: '30-Day Consistency',
    description: 'Build lasting habits with our structured wellness program.',
    icon: Sun,
    tag: 'Program'
  },
  {
    id: 'mastery',
    title: 'Advanced Mastery',
    description: 'Deep dive into wellness techniques for optimal health.',
    icon: Sparkles,
    tag: 'Advanced'
  },
  {
    id: 'discovery',
    title: 'Wellness Discovery',
    description: 'A session to identify your goals and create a roadmap to success.',
    icon: Moon,
    tag: 'New'
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Yoga Student",
    quote: "Petrena has a unique way of making you feel completely at ease. Her sessions have transformed my morning routine and my mental clarity.",
    image: "https://picsum.photos/seed/sarah/200/200"
  },
  {
    name: "Michael Chen",
    role: "Wellness Client",
    quote: "The 30-day consistency program was exactly what I needed. I've finally built habits that stick, and I feel more energized than ever.",
    image: "https://picsum.photos/seed/michael/200/200"
  },
  {
    name: "Elena Rodriguez",
    role: "Coaching Client",
    quote: "Working with Petrena helped me navigate a major career transition with grace and focus. Her holistic approach is truly life-changing.",
    image: "https://picsum.photos/seed/elena/200/200"
  }
];

const FAQS = [
  {
    question: "What should I expect in a discovery session?",
    answer: "A discovery session is a 45-minute deep dive into your current lifestyle, challenges, and goals. We'll create a preliminary roadmap and see which program fits you best."
  },
  {
    question: "Do I need previous yoga experience?",
    answer: "Not at all! We offer sessions for all levels, from complete beginners to advanced practitioners. Every movement is adapted to your body's needs."
  },
  {
    question: "How are the coaching sessions conducted?",
    answer: "All coaching is done virtually via high-quality video calls, allowing you to find balance from the comfort of your own home, regardless of where you are in the world."
  },
  {
    question: "Can I combine different programs?",
    answer: "Yes! Many clients start with a Discovery session and then move into a combination of 1-on-1 Yoga and the 30-Day Consistency program."
  }
];

const WellnessQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof OFFERINGS[0] | null>(null);

  const questions = [
    {
      text: "What is your primary wellness goal right now?",
      options: [
        { text: "Finding inner peace & flexibility", value: "yoga" },
        { text: "Building consistent healthy habits", value: "consistency" },
        { text: "Deepening my existing practice", value: "mastery" },
        { text: "I'm not sure, I need guidance", value: "discovery" }
      ]
    },
    {
      text: "How much time can you dedicate daily?",
      options: [
        { text: "15-30 minutes", value: "short" },
        { text: "30-60 minutes", value: "medium" },
        { text: "I want a deep immersion", value: "long" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const recommendation = OFFERINGS.find(o => o.id === newAnswers[0]) || OFFERINGS[0];
      setResult(recommendation);
    }
  };

  return (
    <section className="py-24 bg-teal-50/30">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-teal-100 text-center">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-teal-600 font-bold mb-4 block">Interactive Quiz</span>
                <h2 className="text-3xl font-light mb-8">{questions[step].text}</h2>
                <div className="grid gap-4">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full py-4 px-6 rounded-2xl border border-teal-100 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all text-left flex justify-between items-center group"
                    >
                      <span className="font-sans text-sm tracking-wide">{opt.text}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-center gap-2">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-teal-600' : 'bg-teal-100'}`} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <result.icon className="text-teal-600 w-8 h-8" />
                </div>
                <h3 className="text-sm font-sans uppercase tracking-widest text-teal-600 font-bold">Your Recommended Path</h3>
                <h2 className="text-4xl font-light">{result.title}</h2>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto">{result.description}</p>
                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://verblis.com/services"
                    className="px-8 py-3 bg-teal-800 text-white rounded-full font-sans text-sm uppercase tracking-widest hover:bg-teal-700 transition-all"
                  >
                    Start Program
                  </a>
                  <button 
                    onClick={() => { setStep(0); setAnswers([]); setResult(null); }}
                    className="px-8 py-3 border border-teal-800/20 text-teal-800 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-teal-50 transition-all"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-700 mb-4 block">Success Stories</span>
          <h2 className="text-5xl font-light">Voices of <span className="italic text-teal-800">Transformation</span></h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-teal-50 shadow-lg">
                <img src={TESTIMONIALS[current].image} alt={TESTIMONIALS[current].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-gray-700">
                "{TESTIMONIALS[current].quote}"
              </p>
              <div>
                <h4 className="text-lg font-bold text-teal-900">{TESTIMONIALS[current].name}</h4>
                <p className="text-sm font-sans uppercase tracking-widest text-gray-400">{TESTIMONIALS[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'w-8 bg-teal-600' : 'bg-teal-100'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[#f5f5f0]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-700 mb-4 block">Common Questions</span>
          <h2 className="text-5xl font-light">Wellness <span className="italic text-teal-800">Wisdom</span> FAQ</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[2rem] overflow-hidden border border-teal-50 shadow-sm"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-8 text-left flex justify-between items-center group"
              >
                <span className="text-xl font-light group-hover:text-teal-700 transition-colors">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}>
                  <ArrowRight className="w-4 h-4 text-teal-600 rotate-90" />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-gray-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-700 mb-6 block">Get in Touch</span>
            <h2 className="text-5xl font-light mb-8 leading-tight">Start your <span className="italic text-teal-800">wellness journey</span> today</h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Have questions about our programs or want to inquire about personalized coaching? 
              Fill out the form and Petrena will get back to you shortly.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Online Coaching</h4>
                  <p className="text-gray-500 text-sm">Available globally via Zoom or Google Meet.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Flexible Scheduling</h4>
                  <p className="text-gray-500 text-sm">Sessions tailored to your lifestyle and time zone.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#f5f5f0] p-10 rounded-[2.5rem] shadow-sm border border-teal-100/50"
          >
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="text-white w-10 h-10" />
                </div>
                <h3 className="text-3xl font-light mb-4">Message Sent!</h3>
                <p className="text-gray-600 mb-8">Thank you for reaching out. Petrena will contact you within 24-48 hours.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-teal-800 font-sans uppercase tracking-widest text-sm font-bold border-b-2 border-teal-800"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-sans uppercase tracking-widest font-bold text-gray-500 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-6 py-4 bg-white rounded-2xl border border-transparent focus:border-teal-600 focus:ring-0 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-sans uppercase tracking-widest font-bold text-gray-500 ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full px-6 py-4 bg-white rounded-2xl border border-transparent focus:border-teal-600 focus:ring-0 transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-sans uppercase tracking-widest font-bold text-gray-500 ml-1">Subject</label>
                  <select className="w-full px-6 py-4 bg-white rounded-2xl border border-transparent focus:border-teal-600 focus:ring-0 transition-all outline-none appearance-none">
                    <option>Wellness Coaching Inquiry</option>
                    <option>Yoga & Meditation Sessions</option>
                    <option>30-Day Program Question</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-sans uppercase tracking-widest font-bold text-gray-500 ml-1">Your Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell us about your wellness goals..."
                    className="w-full px-6 py-4 bg-white rounded-2xl border border-transparent focus:border-teal-600 focus:ring-0 transition-all outline-none resize-none"
                  />
                </div>
                <button 
                  disabled={formState === 'submitting'}
                  type="submit"
                  className="w-full py-5 bg-teal-800 text-white rounded-2xl font-sans uppercase tracking-[0.2em] hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/10 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {formState === 'submitting' ? 'Sending...' : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // WebSocket setup for notifications
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'notification') {
          setNotifications(prev => [payload.data, ...prev]);
        }
      } catch (err) {
        console.error('Error parsing notification:', err);
      }
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
      socket.close();
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const triggerDemoNotification = async () => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Appointment Reminder",
          message: "Your Yoga session with Petrena starts in 30 minutes!"
        })
      });
    } catch (err) {
      console.error('Failed to trigger demo notification', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-serif selection:bg-teal-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <span className="font-sans uppercase text-sm tracking-[0.2em] text-teal-800">Verblis</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['Offerings', 'About', 'Blog'].map((item) => (
              <a key={item} href={`https://verblis.com/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-sans uppercase tracking-widest hover:text-teal-600 transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="text-sm font-sans uppercase tracking-widest hover:text-teal-600 transition-colors">
              Contact
            </a>
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 text-teal-800 hover:bg-teal-50 rounded-full transition-all relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-teal-50 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-teal-50 flex justify-between items-center bg-teal-50/30">
                      <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-teal-800">Notifications</h4>
                      <button onClick={triggerDemoNotification} className="text-[10px] text-teal-600 hover:underline">Demo Trigger</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-4 border-b border-teal-50 last:border-0 transition-colors ${notif.read ? 'opacity-60' : 'bg-teal-50/10'}`}
                            onClick={() => markAsRead(notif.id)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h5 className={`text-sm font-bold ${notif.read ? 'text-gray-600' : 'text-teal-900'}`}>{notif.title}</h5>
                              <button 
                                onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mb-2">{notif.message}</p>
                            <span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest">
                              {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="https://verblis.com/shop"
              className="px-6 py-2 bg-teal-800 text-white rounded-full text-sm font-sans uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/10"
            >
              Shop
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['Offerings', 'About', 'Blog'].map((item) => (
                <a 
                  key={item} 
                  href={`https://verblis.com/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-2xl hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact"
                className="text-2xl hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="https://verblis.com/shop"
                className="text-2xl hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
              <div className="flex justify-center gap-6 mt-8">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.name} href={social.url} className={`text-gray-400 ${social.color}`}>
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/wellness/1920/1080" 
            alt="Wellness Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0]/50 via-transparent to-[#f5f5f0]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-700 mb-6 block">Petrena Wood Presents</span>
            <h1 className="text-6xl md:text-8xl font-light leading-tight mb-8">
              Optimal <span className="italic serif text-teal-800">Wellness</span> for the Modern Soul
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Find your balance through personalized yoga, meditation, and holistic coaching designed to transform your life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://verblis.com/services"
                className="w-full sm:w-auto px-10 py-4 bg-teal-800 text-white rounded-full text-lg font-sans uppercase tracking-widest hover:bg-teal-700 transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-2 group"
              >
                Explore Offerings
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-10 py-4 border border-teal-800/30 text-teal-800 rounded-full text-lg font-sans uppercase tracking-widest hover:bg-teal-50 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Social Sidebar */}
        <div className="absolute right-8 bottom-12 hidden lg:flex flex-col gap-6">
          {SOCIAL_LINKS.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.url}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`text-gray-400 transition-all duration-300 ${social.color} hover:scale-110`}
              title={social.name}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
          <div className="w-px h-24 bg-teal-800/20 mx-auto mt-2" />
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/petrena/800/1000" 
                  alt="Petrena Wood" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#f5f5f0] rounded-full flex items-center justify-center p-8 text-center shadow-xl border border-white">
                <p className="italic text-teal-900 text-lg">"Self-care is our highest priority."</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-700">Our Mission</span>
              <h2 className="text-5xl font-light leading-tight">Helping you reach your <span className="italic text-teal-800">highest potential</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Hi, I'm Petrena Wood. I'm on a mission to help you transition from overwhelm to balance. 
                Through Verblis, I provide the tools and support you need to transform your life and be happier and healthier.
              </p>
              <ul className="space-y-4">
                {[
                  'Personalized Wellness Coaching',
                  'Mindfulness & Meditation Workshops',
                  'Yoga for All Fitness Levels',
                  'Habit Building & Goal Tracking'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="text-teal-600 w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://verblis.com/about"
                className="inline-flex items-center gap-2 text-teal-800 font-sans uppercase tracking-widest text-sm hover:gap-4 transition-all"
              >
                Learn More About My Story <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Quiz */}
      <WellnessQuiz />

      {/* Offerings Grid */}
      <section className="py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-700 mb-4 block">Curated Programs</span>
            <h2 className="text-5xl font-light mb-6">Ways to <span className="italic text-teal-800">Work Together</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting your journey or looking to master your wellness, we have a program for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {OFFERINGS.map((offering, idx) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-teal-100"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors">
                  <offering.icon className="text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-teal-600 font-sans font-bold mb-2 block">{offering.tag}</span>
                <h3 className="text-xl font-bold mb-4">{offering.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {offering.description}
                </p>
                <a 
                  href="https://verblis.com/services"
                  className="text-xs font-sans uppercase tracking-widest font-bold text-teal-800 flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Social Integration Section */}
      <section className="py-32 bg-teal-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl">
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-teal-300 mb-6 block">Join the Community</span>
              <h2 className="text-5xl font-light mb-8 leading-tight">Stay connected with <span className="italic text-teal-200">Wellness Wisdom</span></h2>
              <p className="text-teal-100/70 text-lg mb-12 leading-relaxed">
                Follow us on social media for daily tips, inspiration, and updates from Petrena Wood. 
                Be part of a community dedicated to mindful living.
              </p>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-teal-900 transition-all group"
                  >
                    <social.icon size={18} />
                    <span className="font-sans text-sm uppercase tracking-widest">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-md">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5"
                  >
                    <img 
                      src={`https://picsum.photos/seed/social${i}/400/400`} 
                      alt="Social Post" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Instagram className="text-white w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <Leaf className="text-white w-5 h-5" />
                </div>
                <span className="font-sans uppercase text-sm tracking-[0.2em] text-teal-800 font-bold">Verblis Wellness</span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
                Coaching for optimal wellness. Transform your life through yoga, meditation, and personalized support.
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.name} href={social.url} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition-all">
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="https://verblis.com/about" className="hover:text-teal-600 transition-colors">About</a></li>
                <li><a href="https://verblis.com/offerings" className="hover:text-teal-600 transition-colors">Offerings</a></li>
                <li><a href="https://verblis.com/blog" className="hover:text-teal-600 transition-colors">Blog</a></li>
                <li><a href="https://verblis.com/shop" className="hover:text-teal-600 transition-colors">Shop</a></li>
                <li><a href="#contact" className="hover:text-teal-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {['Terms and Conditions', 'Privacy Policy', 'Return and Refund Policy', 'Merchant Policies'].map((item) => (
                  <li key={item}>
                    <a href={`https://verblis.com/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-teal-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-400 font-sans font-bold">
            <p>© {new Date().getFullYear()} Verblis Wellness. All rights reserved.</p>
            <p>Designed for Petrena Wood</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
