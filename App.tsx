
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowRight, Github, Twitter, Linkedin, Sparkles, Code2, Cpu, Send, Mail, ExternalLink, ChevronRight, Clock, Tag, Share2, Copy, BookOpen, BarChart3, FileText, Layers, Settings } from 'lucide-react';
import { BlogPost, WorkItem, ViewState } from './types';
import { supabase } from './supabaseClient';
import AdminPanel from './AdminPanel';
import SEOHead from './SEOHead';

// --- Constants ---

const BLOG_POSTS: BlogPost[] = [
  {
    id: "geopolitics-ai",
    title: "Drawing The Geopolitical Boundaries Around AI",
    date: "November 6, 2025",
    summary: "The US-China truce on tariffs left one issue untouched: export controls on AI chips. This reveals the deeper stakes behind America's strategy for compute dominance.",
    content: `
      <p class="lead text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12">In late October 2025, Trump and Xi agreed to a one-year truce on tariffs and rare-earths, but left one issue untouched: US export controls on AI chips.</p>
      
      <p>Within days, Trump signaled he'd allow limited Nvidia sales to China before reversing course. The episode reveals the deeper stakes behind America's AI strategy: how to balance short-term technological leverage against long-term industrial strength in the race for <a href="#">compute dominance</a>.</p>
      
      <h2>The Compute Advantage</h2>
      <p>AI progress has been <a href="#">driven</a> by three inputs: data, algorithms, and compute. Unlike data or algorithms, state-of-the-art compute is virtually <a href="#">monopolized</a> by the West. It exists as a stack of hardware, software, and infrastructure concentrated in a handful of chokepoints controlled by the US and its allies. This control is crucial for America, as <a href="#">compute</a> has reliably accelerated AI performance and is increasingly vital for deployment.</p>
      
      <h3>Compute Drives Performance</h3>
      <p>In 2019, reinforcement learning co-founder <a href="#">Rich Sutton</a> articulated what he called <a href="#">the bitter lesson</a> of AI research. He argued that AI systems that learn independently through massive amounts of compute consistently outperform alternative methods.</p>
      
      <p>A 2024 <a href="#">Epoch AI</a> study confirmed Sutton's prescient observation, finding 60-95% of recent AI performance gains had come from scaling compute and data rather than algorithmic breakthroughs. Accordingly, since 2015, training compute requirements have doubled approximately every <a href="#">six months</a>, establishing a clear formula: more compute enables researchers to train larger models with more parameters, which in turn delivers better performance across all benchmarks and real-world tasks.</p>

      <h2>The Strategic Choke Point</h2>
      <p>This rapid oscillation in policy highlights a fundamental tension in Western strategy. The semiconductor supply chain is not just a market; it is the central nervous system of the 21st-century economy. Control over high-end compute is the modern equivalent of control over oil shipping lanes.</p>
      
      <blockquote>The "Compute Divide" is widening. While consumer AI models are becoming ubiquitous, the frontier models required for national security require clusters of compute that are becoming increasingly difficult to assemble.</blockquote>

      <p>As we look toward 2026, the question isn't just about who designs the best chips, but who controls the lithography, the packaging, and the raw interconnects that make massive clusters possible.</p>

      <h2>Industrial Sovereignty</h2>
      <p>The restrictions are forcing China to accelerate its domestic semiconductor capabilities. While this causes short-term pain for Chinese tech giants, it creates a long-term strategic rival that is completely decoupled from Western supply chains. The "choke point" strategy has a shelf life.</p>
    `,
    tags: ["Deep Dive", "Hardware", "Policy"]
  },
  {
    id: "singularity-self",
    title: "The Singularity of Self",
    date: "November 12, 2025",
    summary: "When 'I' becomes a network: An exploration of digital identity and the dissolution of the ego in a hyper-connected age.",
    content: `
      <p class="lead text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12">The modern concept of "self" is undergoing a radical fragmentation. We are no longer singular entities but distributed networks of data, interactions, and digital footprints.</p>
      
      <p>As we offload more of our cognition to algorithms and our memory to the cloud, the boundary between the biological individual and the digital extension blurs. This isn't just a philosophical curiosity; it's a fundamental shift in how we must design interfaces.</p>
      
      <h2>The Networked Ego</h2>
      <p>We are designing for the "Networked Self" — a user who exists in multiple states simultaneously. The user is no longer a static point of origin for action, but a node in a continuous flow of information.</p>
      
      <p>Consider the "feed." It is not content we consume; it is a reflection of our digital shadow, curated by algorithms that know our preferences better than we do. In this loop, who is the author of the experience? The user who clicks, or the algorithm that predicts the click?</p>
      
      <h2>Designing for Fluidity</h2>
      <p>When we design for the future, we must stop designing for users as static points and start designing for users as dynamic flows. Interfaces must become fluid, adapting not just to screen size, but to context, intent, and cognitive load. The "Self" is no longer a noun; it is a verb.</p>

      <h2>The End of Privacy?</h2>
      <p>If the self is a network, then privacy is not about hiding information, but about controlling the flow. The challenge for the next decade will be building tools that allow us to manage our distributed selves without losing the cohesion of our identity.</p>
    `,
    tags: ["Philosophy", "Identity", "Future"]
  },
  {
    id: "silent-interface",
    title: "The Silent Interface",
    date: "October 15, 2025",
    summary: "Why the best UI is no UI at all. Moving beyond screens into the era of ambient computing and neural inputs.",
    content: `
      <p class="lead text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12">For forty years, we have been trapped behind glass. The screen has been our primary window into the digital world. But the screen is a barrier. It demands attention, it requires focus, and it separates us from our environment.</p>
      
      <p>The next era of interface design is silent. It is ambient. It is there when you need it and invisible when you don't. With the rise of high-fidelity voice models and neural wristbands, we are approaching the end of the "Point and Click" era.</p>
      
      <h2>Ambient Computing</h2>
      <p>Imagine a workspace where the OS doesn't live on a monitor, but exists as a layer of intelligence over your physical desk. Information is projected only when relevant. Controls appear only when your hand moves to interact with them.</p>
      
      <p>This requires a shift in design thinking from "Visual Hierarchy" to "Contextual Relevance." We are not arranging pixels; we are choreographing attention.</p>
      
      <h2>Neural Inputs</h2>
      <p>The keyboard is a bandwidth bottleneck. We think faster than we can type. Neural interfaces, even non-invasive ones like EMG wristbands, promise to remove this friction, allowing us to interact with digital systems at the speed of thought.</p>
    `,
    tags: ["Design", "Future", "HCI"]
  }
];

const SELECTED_WORKS: WorkItem[] = [
  {
    id: "coincentral",
    type: "project",
    title: "CoinCentral",
    subtext: "Crypto media company with 12m+ readers",
    description: "A leading independent publication covering the blockchain ecosystem, growing from zero to 12 million annual readers in under 18 months.",
    content: `
      <p>CoinCentral was built to cut through the noise of the 2017 crypto boom. While other publications chased hype, we focused on educational, evergreen content that helped users actually understand the technology.</p>
      <h3>Key Metrics</h3>
      <ul>
        <li>Scaled to <strong>12 Million+</strong> unique annual readers.</li>
        <li>Developed a proprietary SEO strategy that outranked major incumbents.</li>
        <li>Built a distributed team of 40+ writers, editors, and researchers.</li>
      </ul>
      <h3>The Architecture</h3>
      <p>We engineered a headless CMS solution optimized for core web vitals and rapid content delivery, ensuring our analysis reached the market faster than competitors. The platform also integrated real-time market data visualizations directly into editorial content.</p>
    `,
    tags: ["Media", "Growth Scale", "Blockchain", "React"],
    image: "https://picsum.photos/seed/coin/800/600",
    link: "https://coincentral.com"
  },
  {
    id: "singularity-self",
    type: "blog",
    title: "The Singularity of Self",
    subtext: "When 'I' Becomes a Network",
    description: "An exploration of digital identity and the dissolution of the ego in a hyper-connected age.",
    date: "2024-11-12",
    content: BLOG_POSTS.find(p => p.id === 'singularity-self')?.content, // Reuse content
    tags: ["Philosophy", "Identity", "Future"],
    image: "https://picsum.photos/seed/singularity/800/600"
  },
  {
    id: "aether-os",
    type: "project",
    title: "Aether OS",
    subtext: "Spatial Computing Operating System",
    description: "A concept web-based operating system designed for the spatial computing era, removing the constraints of 2D windows.",
    content: `
      <p>Traditional operating systems are stuck in the desktop metaphor of the 1980s. Aether OS reimagines the workspace as an infinite 3D canvas.</p>
      <h3>Core Concepts</h3>
      <ul>
        <li><strong>Spatial Context:</strong> Files are organized by proximity and relationship, not folders.</li>
        <li><strong>Gesture First:</strong> Designed primarily for hand-tracking inputs via WebXR.</li>
        <li><strong>Fluid Multitasking:</strong> Applications exist in a shared volume, interacting with each other physically.</li>
      </ul>
    `,
    tags: ["Spatial Computing", "Three.js", "WebXR", "UI/UX"],
    image: "https://picsum.photos/seed/aether/800/600"
  }
];

// --- Components ---

const Navbar = ({ setView, currentView }: { setView: (v: ViewState) => void, currentView: ViewState }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white py-6 px-6 md:px-12 flex justify-between items-center">
      <div 
        className="font-bold text-xl tracking-tighter cursor-pointer select-none"
        onClick={() => setView(ViewState.HOME)}
      >
        HOLLYFRANK
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        <button onClick={() => setView(ViewState.BLOG)} className={`hover:opacity-100 transition-opacity ${currentView === ViewState.BLOG ? 'opacity-100 underline decoration-cyan-400 decoration-2 underline-offset-4' : 'opacity-60'}`}>THOUGHTS</button>
        <button onClick={() => setView(ViewState.PORTFOLIO)} className={`hover:opacity-100 transition-opacity ${currentView === ViewState.PORTFOLIO ? 'opacity-100 underline decoration-purple-400 decoration-2 underline-offset-4' : 'opacity-60'}`}>WORKS</button>
        <button onClick={() => setView(ViewState.CONTACT)} className={`hover:opacity-100 transition-opacity ${currentView === ViewState.CONTACT ? 'opacity-100 underline decoration-emerald-400 decoration-2 underline-offset-4' : 'opacity-60'}`}>CONNECT</button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-6 md:hidden">
          <button onClick={() => { setView(ViewState.BLOG); setIsOpen(false); }} className="text-left text-lg font-light">THOUGHTS</button>
          <button onClick={() => { setView(ViewState.PORTFOLIO); setIsOpen(false); }} className="text-left text-lg font-light">WORKS</button>
          <button onClick={() => { setView(ViewState.CONTACT); setIsOpen(false); }} className="text-left text-lg font-light">CONNECT</button>
        </div>
      )}
    </nav>
  );
};

const BrainReveal = ({ progress }: { progress: number }) => {
  // Normalize progress for the brain animation start/end
  const brainProgress = Math.max(0, Math.min(1, (progress - 0.35) / 0.65));
  
  const getSegmentOpacity = (index: number, total: number) => {
    const segmentStart = index / total;
    const segmentEnd = (index + 1) / total;
    if (brainProgress > segmentEnd) return 1;
    if (brainProgress < segmentStart) return 0.05;
    return 0.05 + ((brainProgress - segmentStart) / (segmentEnd - segmentStart)) * 0.95;
  };

  return (
    <div className="mt-12 md:mt-16 w-full flex justify-center perspective-1000">
      <svg 
        width="300" 
        height="220" 
        viewBox="0 0 300 220" 
        className="w-full max-w-[280px] md:max-w-[360px] h-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]"
        style={{ transform: `rotateX(${(1 - brainProgress) * 20}deg)`, transition: 'transform 0.5s ease-out' }}
      >
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g stroke="url(#brainGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Paths for Brain Segments */}
          <path d="M80,140 C60,135 45,115 45,90 C45,55 75,30 110,25" style={{ opacity: getSegmentOpacity(0, 6), transition: 'opacity 0.1s' }} />
          <path d="M110,25 C140,20 170,25 190,40" style={{ opacity: getSegmentOpacity(1, 6), transition: 'opacity 0.1s' }} />
          <path d="M190,40 C220,60 235,90 230,120 C225,145 200,160 180,165" style={{ opacity: getSegmentOpacity(2, 6), transition: 'opacity 0.1s' }} />
          <path d="M80,140 C90,155 110,165 135,160 C150,155 160,145 155,130 C150,115 130,110 120,115" style={{ opacity: getSegmentOpacity(3, 6), transition: 'opacity 0.1s' }} />
          <path d="M120,115 C130,100 150,90 170,95 C185,100 195,120 180,165" style={{ opacity: getSegmentOpacity(4, 6), transition: 'opacity 0.1s' }} />
          <path d="M135,160 C140,180 135,200 130,215 M160,165 C170,185 190,195 210,190" style={{ opacity: getSegmentOpacity(5, 6), transition: 'opacity 0.1s' }} />
        </g>
        
        <g fill="#fff">
            <circle cx="110" cy="25" r="3" className={`transition-opacity duration-300 ${brainProgress > 0.1 ? 'opacity-100' : 'opacity-0'}`} />
            <circle cx="190" cy="40" r="3" className={`transition-opacity duration-300 ${brainProgress > 0.3 ? 'opacity-100' : 'opacity-0'}`} />
            <circle cx="230" cy="120" r="3" className={`transition-opacity duration-300 ${brainProgress > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
            <circle cx="80" cy="140" r="3" className={`transition-opacity duration-300 ${brainProgress > 0.7 ? 'opacity-100' : 'opacity-0'}`} />
            <circle cx="130" cy="215" r="2" className={`transition-opacity duration-300 ${brainProgress > 0.9 ? 'opacity-100' : 'opacity-0'}`} />
        </g>
      </svg>
    </div>
  );
};

const CityRevealBackground = ({ progress }: { progress: number }) => {
  const lighting = Math.min(1, Math.max(0, progress));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
       <svg className="w-full h-full" preserveAspectRatio="xMidYBottom slice" viewBox="0 0 1000 600">
         <defs>
           <linearGradient id="cityGradient" x1="0%" y1="100%" x2="0%" y2="0%">
             <stop offset="0%" stopColor="#020617" />
             <stop offset="100%" stopColor="#1e293b" />
           </linearGradient>
           <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="rgba(34,211,238,0)" />
             <stop offset="50%" stopColor="rgba(34,211,238,0.2)" />
             <stop offset="100%" stopColor="rgba(34,211,238,0)" />
           </linearGradient>
            <filter id="cityGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
         </defs>

         <g opacity="0.4">
            <path d="M750,600 C750,600 760,500 740,450 C730,425 745,410 760,405 C780,400 790,420 795,440 C800,435 810,400 830,380 C845,365 860,380 865,400 C870,420 880,450 900,480 C920,510 980,550 1000,580 L1000,600 L750,600 Z" fill="#0f172a" />
            <path d="M830,380 L840,350 L850,385 Z" fill="#0f172a" />
            <path d="M865,400 L880,370 L890,410 Z" fill="#0f172a" />
            <path d="M900,480 L920,440 L930,490 Z" fill="#0f172a" />
            <path d="M400,600 L420,250 L422,200 L424,250 L440,250 L460,600 Z" fill="#0f172a" />
         </g>

         <g>
            <path d="M0,600 L0,350 L40,350 L40,320 L80,320 L80,380 L120,380 L120,600 Z" fill="#0f172a" opacity="0.9" />
            <rect x="15" y="360" width="5" height="240" fill="#1e293b" opacity="0.5" />
            <rect x="55" y="330" width="5" height="270" fill="#1e293b" opacity="0.5" />
            <path d="M220,600 L220,450 L240,450 L240,300 L280,300 L280,280 L285,240 L290,280 L320,300 L320,400 L360,400 L360,600 Z" fill="#0f172a" opacity="0.95" />
            <rect x="250" y="310" width="60" height="2" fill="#1e293b" />
            <rect x="255" y="330" width="50" height="2" fill="#1e293b" />
            <path d="M500,600 L500,420 L530,420 L530,380 L580,380 L580,350 L620,350 L620,600 Z" fill="#0f172a" opacity="0.9" />
            <path d="M640,600 L640,480 L680,480 L680,600 Z" fill="#0f172a" opacity="0.85" />
            <rect x="900" y="500" width="100" height="100" fill="#0f172a" opacity="0.8" />
            <path d="M920,500 L920,450 L930,450 L930,500 Z" fill="#0f172a" />
            <path d="M960,500 L960,420 L970,420 L970,500 Z" fill="#0f172a" />
         </g>

         <g filter="url(#cityGlow)">
            <g fill="#22d3ee" style={{ opacity: lighting }}>
               {[...Array(25)].map((_, i) => (
                  <rect key={`l1-${i}`} x={10 + (i%4)*20} y={360 + Math.floor(i/4)*30} width="3" height="5" opacity={Math.random()} />
               ))}
            </g>
            <g fill="#c084fc" style={{ opacity: lighting }}>
               {[...Array(40)].map((_, i) => (
                  <rect key={`l2-${i}`} x={250 + (i%6)*12} y={310 + Math.floor(i/6)*20} width="4" height="4" opacity={Math.random()} />
               ))}
            </g>
             <g fill="#22d3ee" style={{ opacity: lighting }}>
               {[...Array(30)].map((_, i) => (
                  <rect key={`l3-${i}`} x={510 + (i%5)*15} y={390 + Math.floor(i/5)*25} width="2" height="8" opacity={Math.random()} />
               ))}
            </g>
         </g>

         <g style={{ opacity: lighting }}>
             <g transform="translate(150, 150)">
               <ellipse cx="0" cy="0" rx="40" ry="10" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
               <path d="M-20,0 A20,20 0 0,1 20,0" fill="#334155" opacity="0.8" />
               <circle cx="-25" cy="0" r="2" fill="#22d3ee" className="animate-pulse" />
               <circle cx="0" cy="5" r="3" fill="#22d3ee" className="animate-pulse" />
               <circle cx="25" cy="0" r="2" fill="#22d3ee" className="animate-pulse" />
               <animateMotion path="M0,0 Q100,50 200,0 T400,0" dur="25s" repeatCount="indefinite" />
             </g>
            <path d="M800,150 L810,155 L800,160 Z" fill="#f472b6">
               <animateMotion path="M0,0 L-50,30 L-100,0" dur="15s" repeatCount="indefinite" />
            </path>
            <path d="M0,580 Q500,560 1000,580" stroke="#22d3ee" strokeWidth="2" strokeDasharray="10,20" fill="none" opacity="0.4">
               <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
            </path>
             <path d="M0,590 Q500,570 1000,590" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,15" fill="none" opacity="0.3">
               <animate attributeName="stroke-dashoffset" from="-100" to="0" dur="5s" repeatCount="indefinite" />
            </path>
         </g>

         <path d="M285,600 L285,240" stroke="url(#beamGradient)" strokeWidth="40" style={{ opacity: lighting * 0.4 }} />
         <path d="M550,600 L550,350" stroke="url(#beamGradient)" strokeWidth="25" style={{ opacity: lighting * 0.3 }} />

       </svg>
    </div>
  );
};

const ScrollRevealHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { top, height } = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const scrolled = -top;
    const scrollableDistance = height - windowHeight;

    if (scrollableDistance > 0) {
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const phrase = "DON'T JUST MOVE TIME FORWARD. MOVE THOUGHT FORWARD.";
  const words = phrase.split(" ");
  const textProgress = Math.min(1, progress * 1.4); 

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-slate-950">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(14,165,233,0.08),transparent_70%)]" />
        <div className="z-10 flex flex-col items-center w-full max-w-5xl">
          <h1 ref={textRef} className="text-4xl md:text-6xl lg:text-8xl font-black text-center leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = (i + 1) / words.length;
              let opacity = 0.1;
              if (textProgress > end) opacity = 1;
              else if (textProgress > start) opacity = 0.1 + ((textProgress - start) / (end - start)) * 0.9;
              return (
                <span key={i} className="transition-opacity duration-75" style={{ opacity: opacity, color: opacity > 0.9 ? '#f8fafc' : '#334155' }}>
                  {word}
                </span>
              );
            })}
          </h1>
          <BrainReveal progress={progress} />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm uppercase tracking-widest transition-opacity duration-500" style={{ opacity: progress > 0.9 ? 0 : 1 }}>
          <span className="animate-bounce block">Scroll to Evolve</span>
        </div>
      </div>
    </div>
  );
};

const StudioStatement = ({ setView }: { setView: (v: ViewState) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { top, height } = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const current = top;
    const centerOffset = (windowHeight / 2) - (top + height / 2);
    const p = 1 - Math.min(1, Math.max(0, Math.abs(centerOffset) / (windowHeight / 1.5)));
    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 bg-slate-950 border-b border-slate-900 overflow-hidden">
      <CityRevealBackground progress={progress} />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-12 pt-6 pb-12 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-white/5 shadow-2xl">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8 text-slate-100 text-center drop-shadow-xl">
          A thought and design studio exploring what’s possible in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-medium filter drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">post-internet world</span>.
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10 text-center drop-shadow-md">
          Built by founders and operators. Powered by curiosity. Made for people building the next chapter.
        </p>
        <button onClick={() => setView(ViewState.BLOG)} className="group flex items-center gap-3 px-8 py-3 rounded-full border border-slate-700 hover:border-cyan-500 bg-slate-900/80 hover:bg-cyan-950/50 text-slate-300 hover:text-cyan-400 transition-all uppercase tracking-widest text-sm font-medium backdrop-blur-md shadow-lg">
          Research & Rhetoric
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

const BlogList = ({ setView, setSelectedPost, posts }: { setView: (v: ViewState) => void, setSelectedPost: (p: BlogPost) => void, posts: BlogPost[] }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="mb-16 border-b border-slate-800 pb-8">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 leading-tight">
          Research and Rhetoric
        </h2>
        <p className="text-slate-400 max-w-xl text-lg">
          Deep dives into the geopolitics of silicon, the philosophy of identity, and the architecture of the next web.
        </p>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <div 
            key={post.id} 
            onClick={() => { setSelectedPost(post); setView(ViewState.POST_DETAIL); }}
            className="group cursor-pointer rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-600 hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row"
          >
             <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <div className="flex gap-3 mb-4 text-xs font-mono items-center">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/30 px-2 py-1 rounded">{post.tags[0]}</span>
                    <span className="text-slate-500">{post.date}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-400 transition-colors leading-tight">{post.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{post.summary}</p>
                
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium group-hover:text-white transition-colors">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
             
             <div className="md:w-1/3 min-h-[200px] md:min-h-0 relative overflow-hidden bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-transparent z-10" />
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity scale-105 group-hover:scale-110 duration-700 ease-out">
                    <svg className="w-full h-full text-slate-600" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id={`grid-${post.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill={`url(#grid-${post.id})`} />
                        <circle cx="50" cy="50" r="30" fill="url(#brainGradient)" opacity="0.2" className="blur-xl" />
                    </svg>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const clientHeight = el.clientHeight || document.body.clientHeight;
    const height = scrollHeight - clientHeight;
    const percent = Math.round((scrollTop / height) * 100);
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  });

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <div className="h-full bg-cyan-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(34,211,238,0.7)]" style={{ width: `${width}%` }}></div>
    </div>
  );
};

const PostDetail = ({ post, onBack }: { post: BlogPost | null, onBack: () => void }) => {
  if (!post) return null;

  // Metadata calculations
  const wordCount = post.content.split(' ').length;
  const readingTime = Math.ceil(wordCount / 200);
  const pageCount = Math.ceil(wordCount / 350);

  // Parse Headings for TOC (Programmatic extraction)
  // We first inject IDs into the H2s to make them linkable
  const processedContent = post.content.replace(/<h2>(.*?)<\/h2>/g, (match, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h2 id="${id}">${title}</h2>`;
  });

  // Extract headings for sidebar
  const headings = [];
  const regex = /<h2 id="(.*?)">(.*?)<\/h2>/g;
  let match;
  while ((match = regex.exec(processedContent)) !== null) {
    headings.push({ id: match[1], title: match[2] });
  }

  return (
    <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.summary}
        canonical={post.canonical_url || `/blog/${post.slug || post.id}`}
        ogTitle={post.og_title || post.title}
        ogDescription={post.og_description || post.summary}
        ogImage={post.og_image}
        ogType="article"
        twitterTitle={post.twitter_title}
        twitterDescription={post.twitter_description}
        twitterImage={post.twitter_image}
        twitterCard={post.twitter_card_type as any || 'summary_large_image'}
        robots={post.robots}
        keywords={post.keywords || post.tags}
        publishedTime={post.date}
        modifiedTime={post.updated_at}
      />
      <ScrollProgress />
      
      {/* Top Nav Placeholder / Spacing */}
      <div className="h-28"></div>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 mb-20 relative">
        <button
          onClick={onBack}
          className="group text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 mb-12 text-sm font-medium tracking-wide"
        >
           <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} /> Back to all articles
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-12">
             {/* Tag */}
             {post.tags[0] && (
               <span className="inline-flex items-center gap-2 px-4 py-2 mb-10 text-sm font-bold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full uppercase">
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                 {post.tags[0]}
               </span>
             )}

             {/* Title */}
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-10 text-white max-w-5xl">
               {post.title}
             </h1>

             {/* Summary */}
             <div className="flex flex-col lg:flex-row gap-8 lg:items-end border-t border-slate-700/50 pt-10 mt-8">
                <p className="text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
                  {post.summary}
                </p>
                <div className="flex-1 flex justify-start lg:justify-end gap-6 text-sm font-mono text-slate-500">
                   <div>
                      <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-600 mb-1"><Clock size={10} /> Published</span>
                      <span className="text-slate-300">{post.date}</span>
                   </div>
                   <div>
                      <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-600 mb-1"><BarChart3 size={10} /> Read Time</span>
                      <span className="text-slate-300">{readingTime} min read</span>
                   </div>
                    <div>
                      <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-600 mb-1"><Layers size={10} /> Pages</span>
                      <span className="text-slate-300">~{pageCount}</span>
                   </div>
                    <div>
                      <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-600 mb-1"><FileText size={10} /> Words</span>
                      <span className="text-slate-300">{wordCount}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Wide Hero Image */}
      <div className="w-full max-w-[1400px] mx-auto px-4 mb-20">
         <div className="w-full aspect-[21/9] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative shadow-2xl">
            <div className="absolute inset-0 bg-slate-800 animate-pulse" />
            <img 
              src={`https://picsum.photos/seed/${post.id}/1600/800`} 
              alt={post.title} 
              className="w-full h-full object-cover relative z-10 opacity-90"
            />
            {/* Gradient Overlay for integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-20 opacity-80"></div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
        
        {/* Sticky Sidebar (Left) */}
        <aside className="lg:col-span-3 lg:col-start-1 relative">
           <div className="lg:sticky lg:top-32 space-y-10 border-t border-slate-800 pt-8 lg:border-t-0 lg:pt-0">
              
              {/* Author Widget */}
              <div>
                <p className="uppercase tracking-widest text-xs mb-4 text-slate-500 font-bold">Author</p>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden ring-2 ring-slate-800 group-hover:ring-cyan-500 transition-all">
                     <img src="https://picsum.photos/seed/holly/200" alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Holly Frank</p>
                     <p className="text-xs text-slate-500 font-mono">Editor-in-Chief</p>
                  </div>
                </div>
              </div>

               {/* Table of Contents (Generated) */}
              {headings.length > 0 && (
                <div>
                   <p className="uppercase tracking-widest text-xs mb-4 text-slate-500 font-bold">On this page</p>
                   <ul className="space-y-3">
                     {headings.map(h => (
                       <li key={h.id}>
                         <a 
                           href={`#${h.id}`} 
                           onClick={(e) => {
                             e.preventDefault();
                             document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                           }}
                           className="text-sm text-slate-400 hover:text-cyan-400 transition-colors block border-l-2 border-transparent hover:border-cyan-500 pl-3 -ml-3"
                         >
                           {h.title}
                         </a>
                       </li>
                     ))}
                   </ul>
                </div>
              )}

              {/* Related Companies / Tags */}
              <div>
                <p className="uppercase tracking-widest text-xs mb-4 text-slate-500 font-bold">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span key={t} className="text-xs font-mono text-slate-400 border border-slate-800 bg-slate-900/50 px-2 py-1 rounded hover:border-slate-600 hover:text-white transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="pt-8 border-t border-slate-800/50">
                 <p className="uppercase tracking-widest text-xs mb-4 text-slate-500 font-bold">Share</p>
                 <div className="flex gap-4 text-slate-500">
                    <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <Copy className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                 </div>
              </div>

           </div>
        </aside>

        {/* Main Content Column */}
        <div className="lg:col-span-8 lg:col-start-5">
           <div className="prose prose-invert prose-xl max-w-none
              prose-headings:scroll-mt-28 prose-headings:font-display

              prose-h2:text-4xl prose-h2:font-bold prose-h2:text-white prose-h2:mt-24 prose-h2:mb-10 prose-h2:tracking-tight prose-h2:leading-tight
              prose-h2:border-b prose-h2:border-slate-800/50 prose-h2:pb-6

              prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-slate-50 prose-h3:mt-16 prose-h3:mb-6 prose-h3:leading-snug

              prose-p:text-slate-200 prose-p:text-[1.1rem] prose-p:leading-[1.9] prose-p:font-normal prose-p:mb-8 prose-p:tracking-wide

              prose-a:text-cyan-400 prose-a:font-medium prose-a:no-underline prose-a:underline prose-a:decoration-cyan-500/30 prose-a:decoration-2 prose-a:underline-offset-4
              hover:prose-a:decoration-cyan-400 hover:prose-a:text-cyan-300 hover:prose-a:decoration-2 prose-a:transition-all

              prose-strong:text-white prose-strong:font-bold prose-strong:bg-gradient-to-r prose-strong:from-cyan-400/10 prose-strong:to-transparent prose-strong:px-1.5 prose-strong:py-0.5 prose-strong:rounded

              prose-blockquote:border-l-4 prose-blockquote:border-cyan-500/80 prose-blockquote:pl-8 prose-blockquote:pr-8 prose-blockquote:py-6
              prose-blockquote:text-[1.35rem] prose-blockquote:text-slate-100 prose-blockquote:font-normal prose-blockquote:italic prose-blockquote:leading-relaxed
              prose-blockquote:my-20 prose-blockquote:bg-gradient-to-r prose-blockquote:from-cyan-950/20 prose-blockquote:to-transparent
              prose-blockquote:rounded-r-lg prose-blockquote:shadow-xl prose-blockquote:shadow-cyan-950/20

              prose-ul:my-10 prose-ul:list-none prose-ul:space-y-4
              prose-li:relative prose-li:pl-8 prose-li:mb-3 prose-li:text-slate-200 prose-li:text-[1.1rem] prose-li:leading-relaxed
              prose-li:before:content-['→'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-0 prose-li:before:text-cyan-400 prose-li:before:font-bold
           ">
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
           </div>

           {/* In-Article Newsletter CTA */}
           <div className="mt-32 mb-16 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/20 border border-slate-700/50 rounded-2xl p-10 md:p-14 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-cyan-500/20 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-12 -ml-12 -mb-12 bg-purple-500/10 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>

              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6 text-cyan-300">
                    <BookOpen size={24} className="animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-widest">Join the Community</span>
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                   Stay ahead of the curve
                 </h3>
                 <p className="text-slate-300 text-lg mb-10 max-w-xl leading-relaxed">
                    Get weekly insights on technology, design, and the future delivered to your inbox. No spam, just thoughtful content.
                 </p>

                 <div className="flex gap-4 flex-col sm:flex-row max-w-xl">
                    <input
                      type="email"
                      placeholder="Your email address..."
                      className="flex-1 bg-slate-950/80 border border-slate-600 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-lg backdrop-blur"
                    />
                    <button className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-lg">
                       Subscribe
                    </button>
                 </div>
                 <p className="text-slate-500 text-sm mt-4">Join 10,000+ readers staying informed</p>
              </div>
           </div>
        </div>

      </div>
    </article>
  );
};

const ProjectDetail = ({ project, onBack }: { project: WorkItem | null, onBack: () => void }) => {
  if (!project) return null;

  return (
    <article className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-12 text-slate-500 hover:text-white flex items-center gap-2 transition-colors group"
      >
        <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16}/> 
        Back to Works
      </button>
      
      <header className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-400 font-mono uppercase tracking-wider">
               Case Study
            </span>
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            {project.title}
          </h1>
          <p className="text-xl text-slate-300 mb-8 font-light">
            {project.subtext}
          </p>
          
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-colors"
            >
              Visit Live Site <ExternalLink size={16} />
            </a>
          )}
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 to-transparent" />
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-slate-800/50">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">At a Glance</h3>
          <p className="text-slate-300 leading-relaxed mb-6">
             {project.description}
          </p>
        </div>
        <div className="md:col-span-2 prose prose-invert prose-lg max-w-none prose-headings:text-slate-200 prose-p:text-slate-400 prose-li:text-slate-400 prose-a:text-purple-400">
          <div dangerouslySetInnerHTML={{ __html: project.content || '' }} />
        </div>
      </div>
    </article>
  );
};

const PortfolioGrid = ({ onItemClick }: { onItemClick: (item: WorkItem) => void }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-light mb-16 text-slate-100 border-l-2 border-purple-500 pl-6">
        Selected Works
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {SELECTED_WORKS.map((work, idx) => (
          <div 
            key={work.id} 
            onClick={() => onItemClick(work)}
            className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3] cursor-pointer ${idx === 2 ? 'md:col-span-2 aspect-[21/9]' : ''}`}
          >
            <div className="absolute inset-0 bg-slate-800 transition-transform duration-700 group-hover:scale-105">
               <img src={work.image} alt={work.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            
            <div className="absolute top-8 left-8 z-20">
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border backdrop-blur-md ${work.type === 'project' ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' : 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'}`}>
                {work.type === 'project' ? 'Case Study' : 'Thought'}
              </span>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">{work.title}</h3>
                <p className="text-lg text-slate-300 mb-6 font-medium">
                  {work.subtext}
                </p>
                
                <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                   <div className="flex gap-2 flex-wrap">
                    {work.tags.slice(0, 3).map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/10">
                        {tech}
                        </span>
                    ))}
                    </div>
                    <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20">
                        <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const NewsletterForm = () => (
  <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-4 text-cyan-400">
      <Sparkles size={20} />
      <span className="text-sm font-mono uppercase tracking-wider">The Signal</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">Join the inner circle.</h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
      Get the weekly download on the future of tech, design, and human evolution. No fluff, just signal.
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <input 
        type="email" 
        placeholder="enter@matrix.com" 
        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
      />
      <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
        Subscribe
      </button>
    </div>
  </div>
);

const ContactForm = () => (
  <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-4 text-purple-400">
      <Mail size={20} />
      <span className="text-sm font-mono uppercase tracking-wider">Inquiries</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">Start a project.</h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
      Have a vision that needs building? Let's engineer the future together.
    </p>
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" 
        />
      </div>
      <textarea 
        placeholder="Tell us about your idea..." 
        rows={3} 
        className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none" 
      />
      <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
        Send Message <Send size={16} />
      </button>
    </div>
  </div>
);

const ContactSection = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">
            Let's build the <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">impossible.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            We take on a small number of projects when the vision feels aligned, ambitious, and genuinely interesting. Let's push the frontier together.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  // Fetch blog posts from Supabase
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Admin panel keyboard shortcut (Ctrl/Cmd + Shift + A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(!showAdmin);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdmin]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });

      if (data && data.length > 0) {
        setBlogPosts(data);
      } else {
        // Use hardcoded posts as fallback
        setBlogPosts(BLOG_POSTS);
      }
    } catch (error) {
      // If Supabase fails, use hardcoded posts
      console.log('Using hardcoded blog posts');
      setBlogPosts(BLOG_POSTS);
    }
  };

  const handleWorkClick = (work: WorkItem) => {
    if (work.type === 'blog') {
        const fullPost = blogPosts.find(p => p.id === work.id);
        setSelectedPost({
            id: work.id,
            title: work.title,
            date: work.date || new Date().getFullYear().toString(),
            summary: work.subtext,
            content: fullPost ? fullPost.content : (work.content || ''),
            tags: work.tags,
            published: true
        });
        setView(ViewState.POST_DETAIL);
    } else {
        setSelectedProject(work);
        setView(ViewState.PROJECT_DETAIL);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <ScrollRevealHero />
            <StudioStatement setView={setView} />
            <div className="bg-slate-950 border-t border-slate-900">
               <PortfolioGrid onItemClick={handleWorkClick} />
            </div>
            <div className="bg-slate-900/20 py-24 border-t border-slate-900">
              <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 max-w-6xl">
                 <NewsletterForm />
                 <ContactForm />
              </div>
            </div>
          </>
        );
      case ViewState.BLOG:
        return <BlogList setView={setView} setSelectedPost={setSelectedPost} posts={blogPosts} />;
      case ViewState.POST_DETAIL:
        return <PostDetail post={selectedPost} onBack={() => setView(ViewState.BLOG)} />;
      case ViewState.PROJECT_DETAIL:
        return <ProjectDetail project={selectedProject} onBack={() => setView(ViewState.HOME)} />;
      case ViewState.PORTFOLIO:
        return (
            <div className="min-h-screen pt-32">
                <PortfolioGrid onItemClick={handleWorkClick} />
            </div>
        );
      case ViewState.CONTACT:
        return <ContactSection />;
      default:
        return <ScrollRevealHero />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar setView={setView} currentView={currentView} />

      {/* Admin Button (hidden, press Ctrl+Shift+A to open) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-full text-slate-400 hover:text-cyan-400 transition-all z-50 opacity-20 hover:opacity-100"
        title="Admin Panel (Ctrl+Shift+A)"
      >
        <Settings size={20} />
      </button>

      <main className="relative">
        {renderView()}
      </main>

      <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-sm font-mono">
        <p>&copy; {new Date().getFullYear()} HOLLYFRANK // MOVING THOUGHT FORWARD</p>
      </footer>

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel
          onClose={() => {
            setShowAdmin(false);
            fetchBlogPosts(); // Refresh posts when closing admin
          }}
        />
      )}
    </div>
  );
}
