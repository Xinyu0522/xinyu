import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Medal, GraduationCap, MapPin, Coffee, Utensils, Sunrise, ExternalLink, PlaySquare, Box, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const PresentationSlider = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    { title: "核心理念", text: "總預算 650 萬 TWD，主打「極致隱私、跨島飛行、米其林美饌」。" },
    { title: "雲端體驗", text: "台北松山直飛曼谷，私人噴射機專屬禮賓、快速通關、勞斯萊斯接送。" },
    { title: "傳奇下榻", text: "入住 Aman Nai Lert (城市綠洲) 與 Amanpuri (海島傳奇)。" },
    { title: "感官饗宴", text: "包場米其林二星 Sorn、Le Du，以及 Lebua 屋頂酒吧百萬夜景。" }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white border border-amber/20 relative group text-coffee shadow-inner font-sans mt-auto">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#FFFDF0_0%,#fdfbfb_100%)] z-0"></div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 md:p-12 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-12 h-1 bg-amber mb-6 rounded-full"></div>
            <h1 className="text-2xl md:text-3xl font-serif text-coffee font-bold mb-4 tracking-wide">{slides[current].title}</h1>
            <p className="text-[13px] md:text-base text-coffee/80 leading-relaxed max-w-md">
              {slides[current].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-between items-center px-6">
        <button onClick={prev} className="p-2 rounded-full hover:bg-amber/10 text-amber transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? 'w-6 bg-amber' : 'bg-amber/30 hover:bg-amber/60'}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full hover:bg-amber/10 text-amber transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-amber text-white rounded-full shadow-xl hover:bg-yellow-600 transition-colors border border-white/20"
          title="回到頂部"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: '首頁', href: '#home' },
    { name: '關於信妤', href: '#about' },
    { name: '專業策展', href: '#portfolio' },
    { name: '旅遊足跡', href: '#travel' },
    { name: '學習週誌', href: '#learning' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-serif font-bold text-coffee flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-amber text-cream flex items-center justify-center text-sm">HY</span>
          <span className="hidden sm:block">Pan Hsin-Yu</span>
        </a>
        
        <div className="hidden md:flex space-x-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-amber transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <button className="md:hidden text-coffee" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-panel flex flex-col items-center py-6 space-y-4 md:hidden shadow-lg border-t border-amber/20"
          >
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-amber transition-colors w-full text-center py-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "center" }) => (
  <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee mb-4 relative inline-block">
      {children}
      <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-amber to-transparent"></span>
    </h2>
  </div>
);

const TimelineItem = ({ date, title, content }: { date: string, title: string, content: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 bento-card group hover:border-amber/60 justify-center border-amber/10 shadow-sm cursor-pointer transition-shadow" onClick={() => setExpanded(!expanded)}>
      <div className="flex justify-between items-center mb-0">
          <div className="flex items-center gap-3">
             <span className="font-bold text-amber font-sans text-sm bg-amber/10 px-2 py-1 rounded">{date}</span>
             <span className="font-bold text-coffee font-serif text-base md:text-lg">{title}</span>
          </div>
          <button 
            className="flex flex-col items-center justify-center p-2 rounded-full hover:bg-amber/10 transition-colors text-amber"
            title={expanded ? "收起記錄" : "查看記錄"}
          >
            <motion.div animate={{ rotate: expanded ? 180 : 0 }}><ChevronDown size={20} /></motion.div>
          </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="p-4 md:px-6 md:py-5 rounded-xl bg-amber/5 flex items-start justify-start border border-amber/20 font-sans border-solid shadow-inner">
              <p className="text-coffee/80 text-sm leading-relaxed flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-0.5"></span>
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-amber/30 selection:text-coffee">
      <ParticlesBackground />
      <Navbar />
      <BackToTop />

      <main className="relative z-10">
        {/* --- Hero Section --- */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 max-w-7xl mx-auto">
          <div className="text-center w-full max-w-3xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-amber to-coffee p-1 mx-auto mb-8 shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-cream border-4 border-cream flex items-center justify-center overflow-hidden">
                <span className="text-5xl font-serif text-coffee/20 select-none">HY</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-7xl font-serif font-bold text-coffee mb-6 tracking-tight"
            >
              潘信妤 <br />
              <span className="text-gradient">Portfolio Extravaganza</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-coffee/80 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              專注細節，追求卓越，將創意與執行完美落地，為每一次策展與專案賦予溫暖且奢華的質感。
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center gap-4"
            >
              <a href="#about" className="glass-panel px-8 py-3 font-medium hover:bg-amber hover:text-white transition-colors duration-300">
                深入了解
              </a>
              <a href="#portfolio" className="border-2 border-coffee text-coffee px-8 py-3 rounded-2xl font-medium hover:bg-coffee hover:text-cream transition-colors duration-300">
                探索作品
              </a>
            </motion.div>
          </div>
        </section>

        {/* --- About Section & Core Achievements --- */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading align="center">關於信妤 | About Me</SectionHeading>
          
          <div className="bento-grid mt-16 items-start">
            <div className="md:col-span-4 lg:col-span-2 md:row-span-2 bento-card bento-accent-border font-sans justify-between text-justify">
              <h3 className="text-xs font-sans uppercase tracking-widest text-amber font-bold mb-4">Senior UI/UX Designer</h3>
              <div className="text-[15px] leading-relaxed text-coffee/90 mb-4 space-y-4">
                <p>
                  我是潘信妤。在旁人眼中，我最初的模樣通常是<strong className="text-coffee font-semibold">安靜、慢熟且內斂的</strong>。我也許不會在第一時間成為人群中最耀眼、最外放的焦點，但隨著專案推進，夥伴們往往會發現我內心對目標的堅定與對專業的熱忱。
                </p>
                <p>
                  我擁有屬於自己的<strong className="text-amber mx-1 font-bold">「穩定節奏」</strong>。這種節奏讓我在面對龐大的資訊壓力與突發狀況時，依然能沉著冷靜、條理分明地解決問題。我深深堅信，在任何複雜的專案框架下，團隊間的<strong className="text-amber mx-1 font-bold">配合度</strong>與<strong className="text-amber mx-1 font-bold">責任感</strong>才是事情成功落地的關鍵。
                </p>
                <p>
                  在工作與生活中，我不輕易許下浮誇的承諾，因為我對每一個承諾背後的責任感都有著極度的看重。但只要是我應允的事，我就會默默地、踏實地將其做到極致，讓作品的細節自己說話。對我而言，將創意與技術完美結合，就是對這份志業最真誠的回應。
                </p>
              </div>
              <div className="mt-4 p-4 bg-orange-50 rounded-lg italic text-sm text-coffee border-l-2 border-amber">
                "我不輕易許下浮誇的承諾，但只要應允了，我就會默默地、踏實地將其完成。"
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2 md:row-span-1 bento-card flex-row items-center gap-6 group hover:-translate-y-1">
              <div className="stat-circle flex-shrink-0 group-hover:bg-amber group-hover:text-white transition-colors">
                900
              </div>
              <div>
                <h3 className="text-sm font-bold font-serif mb-1 text-amber">語言卓越</h3>
                <p className="text-2xl font-black text-coffee mb-1 font-sans">TOEIC</p>
                <p className="text-xs text-coffee/60 font-sans">具備優越的國際溝通與跨國專案策劃能力。</p>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2 md:row-span-1 bento-card flex-row items-center justify-center gap-4 group hover:-translate-y-1 text-center">
              <div>
                <h3 className="text-xs font-bold font-serif mb-2 text-amber">學術養成</h3>
                <p className="text-xl font-bold text-coffee mb-1 font-sans">國立高雄科技大學</p>
                <p className="text-[10px] text-coffee/60 uppercase tracking-widest font-bold font-sans">NKUST University</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Portfolio Section --- */}
        <section id="portfolio" className="py-24 bg-white/30 backdrop-blur-sm border-y border-amber/10">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading>專業策展 | Portfolio</SectionHeading>
            <p className="text-lg text-coffee/80 mb-12 max-w-3xl font-sans">奢華策劃與未來技術的結合，從頂級質感行程到數位 3D 空間建模，展現跨維度的策劃力。</p>

            <div className="bento-grid">
              {/* Core Project */}
              <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:row-span-2 bento-card bento-accent-border">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-sans uppercase tracking-widest text-amber font-bold">核心企劃 | Thailand Luxury</h3>
                  <span className="px-2 py-1 bg-amber/10 text-amber text-[10px] font-bold rounded uppercase tracking-wider font-sans">Core Project</span>
                </div>
                <h4 className="text-xl font-bold text-coffee mb-2 font-serif">泰國奢華之行</h4>
                <p className="mb-4 text-sm text-coffee/80 font-sans">結合私人飛機、以優雅極簡著稱的安縵酒店 (Aman) 與米其林星級美學的頂級私享行程。</p>
                
                <PresentationSlider />
              </div>

              {/* 3D and Videos */}
              <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 bento-card border-none bg-stone-900 text-white justify-between">
                <div>
                  <h3 className="text-xs font-sans uppercase tracking-widest text-amber mb-4 font-bold flex items-center gap-2">
                    <Box size={14} className="text-amber" /> 3D 空間建模 (Tripo AI)
                  </h3>
                  <p className="text-sm text-white/70 mb-5 font-sans leading-relaxed">
                      利用生成式 AI 技術建模過程：轉化平面素材為栩栩如生的 3D 空間模型，精細還原展示品質。
                  </p>
                </div>
                <div className="space-y-4 mt-auto">
                  {[
                    { name: '水晶茶几 (模型一)', url: 'https://studio.tripo3d.ai/3d-model/50ff8028-2902-4b81-892f-bc7eb002de59' },
                    { name: '質感沙發 (模型二)', url: 'https://studio.tripo3d.ai/3d-model/d7b32843-cf06-4fdd-8315-9c6dacdc5875' }
                  ].map((model, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-xl group border border-white/10 hover:border-amber transition-all duration-300 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-black/50 rounded-lg flex items-center justify-center relative overflow-hidden shrink-0 shadow-inner block">
                             <Box size={16} className="text-amber/60 group-hover:scale-110 transition-transform duration-500" />
                         </div>
                         <h4 className="text-[13px] font-bold font-sans tracking-wide">{model.name}</h4>
                      </div>
                      <a 
                        href={model.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 w-full py-2 bg-amber/20 hover:bg-amber text-amber hover:text-stone-900 text-[11px] font-bold rounded-lg transition-colors font-sans uppercase tracking-widest border border-amber/30 hover:border-amber"
                      >
                        進入 3D 空間 <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 bento-card overflow-hidden !p-0 border-amber/30 bg-black relative group aspect-video lg:aspect-auto">
                 <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/W_0S-r61XCI?autoplay=1&mute=1&loop=1&playlist=W_0S-r61XCI"
                    title="Bangkok Luxury Travel"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-105"
                 ></iframe>
                 
                 <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none border border-amber/20 rounded-2xl md:rounded-none"></div>

                 <div className="absolute top-4 left-4 z-20 pointer-events-none">
                     <h3 className="text-[10px] font-sans uppercase tracking-widest text-amber bg-black/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)] backdrop-blur-md px-3 py-1.5 rounded-full font-bold flex items-center gap-2">
                        <PlaySquare size={12} /> MANBOK NEON NIGHT
                     </h3>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Travel Log Section --- */}
        <section id="travel" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading align="center">旅遊足跡 | Travel Log</SectionHeading>
          
          <div className="bento-grid mt-12 bg-white/50 relative">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-[3rem] -z-10 blur-3xl"></div>
            
            <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:row-span-2 bento-card bento-accent-border p-6 md:p-8 justify-center">
                <h3 className="text-xs font-sans uppercase tracking-widest text-amber mb-4 font-bold flex items-center gap-2">
                    <MapPin size={16} /> SEOUL, 2025
                </h3>
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-snug">
                  2025 韓國記：<br />
                  <span className="text-amber">汗水與多巴胺的長征</span>
                </h4>
                
                <div className="space-y-4 text-sm text-coffee/80 leading-relaxed font-sans">
                  <p>
                    清晨，當首爾的第一縷陽光斜射過<strong className="text-coffee mx-1">北村韓屋村</strong>的青瓦，靜謐的空氣中只剩下腳步聲與鳥鳴。木造建築的紋理在光影中顯得格外深刻，這裡沒有大城市的繁華吵雜，取而代之的是沉澱百年的歷史底蘊。我們穿行在錯落有致的巷弄裡，感受到時間彷彿為了這些古老的韓屋而放慢了腳步。
                  </p>
                  <p>
                    午後的陽光開始變得熱烈，我們來到了<strong className="text-coffee mx-1">益善洞</strong>。推開一間隱秘的咖啡館木門，撲面而來的是濃郁的烘焙香氣。點上一杯招牌的冰美式，深褐色的咖啡液順著冰塊緩緩流下。喝下這口冰涼，完美搭配了精緻的韓式甜點。陽光灑在木質桌面上，那一刻的愜意，成為了旅程中最閃亮的多巴胺來源之一。
                  </p>
                  <p>
                    夕陽西下，天空被染成了漸層的橘紅色，<strong className="text-coffee mx-1">漢江公園</strong>的波光倒映著城市天際線的剪影。野餐墊鋪開，炸雞與啤酒是這裡絕對的主角。絢爛的落日餘暉與琥珀色的啤酒交相輝映，讓這座城市的夜晚有了一個溫柔的開場。
                  </p>
                  <p>
                    夜幕降臨，<strong className="text-coffee mx-1">弘大</strong>的街頭才是重頭戲。隱藏在巷弄深處的烤肉店裡，炭火將厚切的五花肉烤得滋滋作響。用生菜包著烤肉、蒜片與大醬，脂香四溢，搭配清爽的燒酒，一切旅途的疲憊都在這煙火氣中灰飛煙滅。每一段記憶都是多巴胺的狂歡，刻畫出最閃耀的2025。
                  </p>
                </div>
            </div>
              
            <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1 bento-card !p-0 aspect-square lg:aspect-auto group border-amber/30">
                <img src="https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&q=80" alt="北村韓屋村" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1 flex items-center gap-2 text-xs font-bold text-white rounded font-sans"><Sunrise size={14} className="text-amber"/> 韓屋晨光</div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1 bento-card !p-0 aspect-square lg:aspect-auto group border-amber/30">
                <img src="https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80" alt="益善洞冰美式" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1 flex items-center gap-2 text-xs font-bold text-white rounded font-sans"><Coffee size={14} className="text-amber"/> 冰美式</div>
            </div>

            <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:row-span-1 bento-card !p-0 h-48 lg:h-auto group border-amber/30 relative">
                <img src="https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&q=80" alt="弘大烤肉" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1 flex items-center gap-2 text-xs font-bold text-white rounded font-sans"><Utensils size={14} className="text-amber"/> 炭火烤肉</div>
            </div>
          </div>
        </section>

        {/* --- Learning Timeline Section --- */}
        <section id="learning" className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading align="center">學習週誌 | Timeline</SectionHeading>
          <div className="bento-grid mt-12 w-full max-w-4xl mx-auto">
            {[
              { date: "03/09", title: "專案啟動", content: "確定個人品牌定位，選定奢華感視覺基調。" },
              { date: "03/16", title: "需求分析", content: "拆解泰國奢華行程，研究私人飛機與安縵酒店服務細節。" },
              { date: "03/23", title: "空間構建", content: "利用 3D 技術模擬曼谷 Aman Nai Lert 綠洲空間。" },
              { date: "03/30", title: "腳本調整", content: "將「內斂、觀察、責任感」融入個人自傳敘事。" },
              { date: "04/13", title: "視覺優化", content: "調整配色與 RWD 佈局，優化移動端閱讀體驗。" },
              { date: "04/20", title: "連結修復", content: "捨棄不穩定的外連，改用原生代碼內建企劃內容。" },
              { date: "05/04", title: "提案整合", content: "完成泰國奢華企劃數據整理，整合預算分配比例表。" },
              { date: "05/11", title: "流程演練", content: "全面測試網頁互動邏輯，確保所有導覽與按鈕無誤。" },
              { date: "05/18", title: "成品發表", content: "發布全方位個人門戶網頁，展現多媒體策展實力。" }
            ].map((item, idx) => (
              <TimelineItem key={idx} date={item.date} title={item.title} content={item.content} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-coffee text-cream/60 py-12 px-6 border-t-[8px] border-amber relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-cream">
            Pan Hsin-Yu <span className="text-amber text-lg ml-2">Portfolio</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#home" className="hover:text-amber transition-colors">TOP 回到頂部</a>
            <span className="hidden sm:inline">•</span>
            <span>&copy; 2025 All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
