import { useState, useEffect } from 'react';
import { ChevronRight, Play, RotateCw, Shield, Zap, Gauge, ArrowRight, Check, Activity, Search, RefreshCcw } from 'lucide-react';

export default function App() {
  const [phase, setPhase] = useState('landing'); // landing | quiz | results | vdp
  const [inventory, setInventory] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    budget: 60000,
    min_seats: 5,
    priorities: []
  });

  useEffect(() => {
    fetch('http://localhost:8000/inventory')
      .then(res => res.json())
      .then(data => setInventory(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const Navbar = () => (
    <nav className={`fixed w-full z-50 top-0 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${phase !== 'landing' ? 'glass border-b border-white/5' : ''}`}>
      <div 
        className="text-2xl font-black tracking-tighter text-white cursor-pointer flex items-center gap-3 group" 
        onClick={() => setPhase('landing')}
      >
        <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(255,31,31,0.3)]">
           <span className="text-white text-sm font-bold tracking-tighter">LR</span>
        </div>
        <span className="font-outfit text-xl tracking-tight">LUTE RILEY <span className="text-white/40 font-light">AI</span></span>
      </div>
      
      <div className="hidden md:flex gap-12 text-[11px] font-bold tracking-[0.2em] text-white/50">
        <span className="hover:text-white cursor-pointer transition-colors relative group py-2">
          INVENTORY
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
        </span>
        <span className="hover:text-white cursor-pointer transition-colors relative group py-2">
          TECHNOLOGY
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
        </span>
        <button onClick={() => setPhase('quiz')} className="text-white relative group py-2">
          MATCHMAKER
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
        </button>
      </div>
      
      <button 
        onClick={() => setPhase('quiz')}
        className="hidden md:flex group relative px-8 py-3.5 font-bold tracking-widest text-[11px] uppercase text-white overflow-hidden rounded-full border border-white/10 glass hover:border-white/30 transition-all duration-300"
      >
        <div className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
        <span className="relative flex items-center gap-2">Configurator <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
      </button>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex space-y-1.5 flex-col cursor-pointer p-2">
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-4 h-0.5 bg-white"></div>
      </div>
    </nav>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-[#030303] text-white relative overflow-hidden">
      {/* Cinematic Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-red-600/10 blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none animate-pulse-slow" style={{animationDelay: '4s'}}></div>

      <section className="relative h-screen w-full flex items-center px-6 md:px-20 lg:px-32 pt-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-lg backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Neural Network Online
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-[-0.04em] mb-6 leading-[0.9] text-gradient font-outfit">
              PURE<br/>PRECISION.
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 mb-12 max-w-lg font-light leading-relaxed">
              Bypass the showroom. Our proprietary AI analyzes millions of data points to seamlessly construct the optimal automotive match for your lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => setPhase('quiz')} 
                className="bg-white text-black px-10 py-4 rounded-full font-bold tracking-widest text-[12px] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500 flex items-center gap-3 group"
              >
                INITIALIZE AI <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <button className="glass border border-white/10 text-white px-10 py-4 rounded-full font-bold tracking-widest text-[12px] hover:bg-white/5 transition-all duration-300 flex items-center gap-3 group">
                <Play size={16} className="fill-white group-hover:scale-110 transition-transform" /> THE SYSTEM
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-end relative h-full w-full animate-float">
             <div className="relative w-full max-w-lg h-[600px] mt-20">
               {/* Decorative structural elements underlying image */}
               <div className="absolute inset-0 border border-white/5 rounded-3xl transform rotate-3 scale-105 transition-transform duration-700"></div>
               <div className="absolute inset-0 border border-red-500/10 rounded-3xl transform -rotate-2 scale-100 transition-transform duration-700"></div>
               
               {/* Premium Hero Image */}
               <div className="absolute inset-0 rounded-3xl overflow-hidden glass-card p-2 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop" alt="Hero Concept" className="w-full h-full object-cover rounded-2xl opacity-90 grayscale-[20%] contrast-125" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 rounded-2xl mt-2"></div>
               </div>
               
               {/* Glass UI Overlays */}
               <div className="absolute top-12 -left-16 glass-card px-6 py-4 rounded-2xl z-20 animate-fade-in-up delay-200">
                  <div className="text-[10px] text-white/50 tracking-widest mb-1 font-bold">MATCH ACCURACY</div>
                  <div className="text-3xl font-black text-white flex items-center gap-3 font-outfit">
                    99.8% <Check size={20} className="text-green-400" />
                  </div>
               </div>
               <div className="absolute bottom-16 -right-12 glass-card px-6 py-4 rounded-2xl z-20 animate-fade-in-up delay-400">
                  <div className="text-[10px] text-white/50 tracking-widest mb-1 font-bold">ANALYZING</div>
                  <div className="flex items-center gap-3">
                    <Activity size={20} className="text-red-500 animate-pulse" />
                    <span className="text-2xl font-black text-white font-outfit">LIVE DATA</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );

  const QuizPage = () => {
    const [step, setStep] = useState(1);

    const togglePriority = (tag) => {
      setPreferences(prev => {
        const current = prev.priorities || [];
        const updated = current.includes(tag)
          ? current.filter(t => t !== tag)
          : [...current, tag];
        return { ...prev, priorities: updated };
      });
    };

    const finishQuiz = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8000/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preferences)
        });
        const data = await res.json();
        setInventory(data);
        setTimeout(() => setPhase('results'), 1500); // Artificial delay to show sick loading screen
      } catch (error) {
        console.error("Backend error:", error);
        alert("System offline. Please check connection.");
      } finally {
        if(inventory.length === 0) setLoading(false); // only stop if failed, else results page resets
      }
    };

    if (loading) return (
      <div className="h-screen bg-[#030303] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full glass border border-white/10 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border-t border-red-500 animate-spin" style={{ animationDuration: '1s' }}></div>
            <div className="absolute inset-2 rounded-full border-r border-white/30 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
            <Search size={32} className="text-white/80" />
          </div>
          <h2 className="text-3xl font-outfit font-black tracking-widest mb-2 text-gradient">QUANTUM MATCHING</h2>
          <p className="text-white/40 tracking-[0.2em] text-xs font-bold uppercase animate-pulse">Cross-referencing global inventory...</p>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Abstract glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          
          {/* Minimalist Progress Indicator */}
          <div className="flex justify-between items-center mb-16">
            <div className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Configuration Protocol</div>
            <div className="flex items-center gap-3">
               {[1,2,3].map(i => (
                 <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step === i ? 'w-12 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : step > i ? 'w-4 bg-white/40' : 'w-4 bg-white/10'}`}></div>
               ))}
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{step} / 3</div>
          </div>

          <div className="glass-card p-10 md:p-14 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-outfit font-black mb-4 tracking-tight">Define Your Drive.</h2>
                <p className="text-white/50 mb-10 text-lg font-light">Select the attributes defining your perfect machine.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { tag: 'speed', label: 'Performance', desc: 'Raw power & handling', icon: <Gauge className="text-red-400 group-hover:text-red-500 transition-colors"/> },
                    { tag: 'safety', label: 'Safety', desc: 'Advanced protection', icon: <Shield className="text-blue-400 group-hover:text-blue-500 transition-colors"/> },
                    { tag: 'tech', label: 'Technology', desc: 'Digital integration', icon: <Zap className="text-yellow-400 group-hover:text-yellow-500 transition-colors"/> },
                    { tag: 'winter', label: 'All-Weather', desc: 'Traction systems', icon: <Activity className="text-white/80 group-hover:text-white transition-colors"/> }
                  ].map(opt => (
                    <button 
                      key={opt.tag}
                      onClick={() => togglePriority(opt.tag)}
                      className={`group p-6 text-left rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        preferences.priorities.includes(opt.tag)
                          ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                          : 'glass border-white/5 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      {preferences.priorities.includes(opt.tag) && <div className="absolute top-4 right-4"><Check size={16} className="text-red-500" /></div>}
                      <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {opt.icon}
                      </div>
                      <h3 className="text-xl font-outfit font-bold mb-1">{opt.label}</h3>
                      <p className="text-sm text-white/40">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-end mt-12">
                  <button onClick={() => setStep(2)} className="bg-white text-black px-10 py-4 font-bold tracking-widest text-xs uppercase rounded-full hover:scale-105 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Next Phase <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-outfit font-black mb-4 tracking-tight">Spatial Requirements.</h2>
                <p className="text-white/50 mb-10 text-lg font-light">Determine the structural capacity needed.</p>
                
                <div className="space-y-4">
                  {[
                    { val: 5, label: 'Standard Configuration', desc: 'Up to 5 Passengers • Sedans & Crossovers' },
                    { val: 7, label: 'Extended Capacity', desc: '7+ Passengers • Full-Size SUVs & Minivans' }
                  ].map(opt => (
                    <button 
                      key={opt.val}
                      onClick={() => setPreferences({...preferences, min_seats: opt.val})} 
                      className={`w-full p-8 text-left rounded-2xl border transition-all duration-300 flex justify-between items-center group ${
                        preferences.min_seats === opt.val 
                        ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' 
                        : 'glass border-white/5 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <h3 className="text-2xl font-outfit font-bold mb-2">{opt.label}</h3>
                        <p className="text-white/40">{opt.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${preferences.min_seats === opt.val ? 'border-red-500 bg-red-500' : 'border-white/20 bg-transparent'}`}>
                        {preferences.min_seats === opt.val && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-12">
                  <button onClick={() => setStep(1)} className="px-6 py-4 font-bold tracking-widest text-[10px] uppercase text-white/50 hover:text-white transition-colors">
                    ← RETREAT
                  </button>
                  <button onClick={() => setStep(3)} className="bg-white text-black px-10 py-4 font-bold tracking-widest text-xs uppercase rounded-full hover:scale-105 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Next Phase <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="animate-fade-in text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                   <div className="text-2xl font-black font-outfit">$</div>
                </div>
                <h2 className="text-4xl md:text-5xl font-outfit font-black mb-4 tracking-tight">Financial Parameters.</h2>
                <p className="text-white/50 mb-12 text-lg font-light">Set your maximum capital allocation.</p>
                
                <div className="glass p-8 rounded-3xl border border-white/5 mb-12">
                  <div className="text-6xl font-outfit font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-8">
                    ${preferences.budget.toLocaleString()}
                  </div>
                  
                  <input 
                    type="range" min="20000" max="80000" step="1000"
                    value={preferences.budget}
                    onChange={(e) => setPreferences({...preferences, budget: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-4 text-xs font-bold tracking-widest text-white/30">
                    <span>$20K</span><span>$80K+</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <button onClick={() => setStep(2)} className="px-6 py-4 font-bold tracking-widest text-[10px] uppercase text-white/50 hover:text-white transition-colors">
                    ← RETREAT
                  </button>
                  <button onClick={finishQuiz} className="bg-gradient-accent text-white px-10 py-5 font-black tracking-[0.2em] text-sm uppercase rounded-full hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] hover:scale-105 transition-all duration-300">
                    EXECUTE SEARCH
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ResultsPage = () => {
    // Artificial loading effect logic is handled in finishQuiz
    return (
      <div className="min-h-screen bg-[#030303] text-white pt-32 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
             <div>
                <button onClick={() => setPhase('quiz')} className="text-white/40 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2 transition-colors">
                  <RefreshCcw size={12} /> Refine Parameters
                </button>
                <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight text-gradient">SYSTEM MATCHES.</h1>
             </div>
             <div className="text-right hidden md:block">
                <div className="text-3xl font-black font-outfit text-white">{inventory.length}</div>
                <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Units Found</div>
             </div>
          </div>
          
          {inventory.length === 0 ? (
            <div className="glass-card p-16 text-center rounded-3xl">
               <Shield size={48} className="mx-auto text-white/20 mb-6" />
               <h3 className="text-2xl font-bold font-outfit mb-2">Constriction Threshold Reached</h3>
               <p className="text-white/50 max-w-md mx-auto">No inventory matches your current high-fidelity criteria. Consider expanding your budget or lowering structural requirements.</p>
               <button onClick={() => setPhase('quiz')} className="mt-8 border border-white/20 px-8 py-3 rounded-full text-xs font-bold tracking-widest hover:bg-white/5 transition-colors">RECALIBRATE</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inventory.map((car, index) => (
                <div key={index} className="group glass-card rounded-3xl overflow-hidden animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                  
                   {/* Card Header */}
                   <div className="p-6 pb-0 flex justify-between items-start relative z-10">
                      <div>
                        {index === 0 && <span className="inline-block bg-red-600 text-white text-[9px] font-black tracking-[0.2em] px-3 py-1.5 rounded-sm mb-3 shadow-[0_0_15px_rgba(239,68,68,0.5)]">OPTIONAL MATCH</span>}
                        <h3 className="text-2xl font-black font-outfit leading-tight">{car.Model_Name || car.Model}</h3>
                        <p className="text-white/40 text-xs font-bold tracking-widest mt-1 uppercase">{car.Trim}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold font-outfit text-white">${car.Price?.toLocaleString() || "TBD"}</div>
                      </div>
                   </div>

                   {/* Image Area */}
                   <div className="relative h-56 mt-4 w-full flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700">
                     {/* Glossy floor effect */}
                     <div className="absolute bottom-4 w-3/4 h-4 bg-white/10 blur-xl rounded-full"></div>
                     <img src={car.img || "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2000&auto=format&fit=crop"} alt={car.Model} className="w-full h-full object-contain drop-shadow-2xl z-10" />
                   </div>
                   
                   {/* Specs Footer */}
                   <div className="p-6 pt-0">
                     <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/10 mb-6">
                        <div className="text-center">
                          <div className="text-white font-bold font-outfit text-lg">{car.HP}</div>
                          <div className="text-[9px] text-white/40 font-bold tracking-widest uppercase mt-0.5">HP</div>
                        </div>
                        <div className="text-center border-l border-white/10">
                          <div className="text-white font-bold font-outfit text-lg">{car.MPG}</div>
                          <div className="text-[9px] text-white/40 font-bold tracking-widest uppercase mt-0.5">MPG</div>
                        </div>
                        <div className="text-center border-l border-white/10">
                          <div className="text-white font-bold font-outfit text-lg">{car.Seats}</div>
                          <div className="text-[9px] text-white/40 font-bold tracking-widest uppercase mt-0.5">SEATS</div>
                        </div>
                     </div>
                     
                     <button 
                       onClick={() => { setSelectedCar(car); setPhase('vdp'); }}
                       className="w-full py-4 bg-white text-black text-xs font-black tracking-[0.2em] uppercase rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 group/btn"
                     >
                       Full Telemetry <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const VDPPage = () => {
    const [isRotating, setIsRotating] = useState(false);
    return (
      <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] min-h-[90vh]">
           
           {/* Visualizer Side */}
           <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#000000] flex flex-col items-center justify-center p-12 lg:border-r border-white/10">
              {/* Back Button */}
              <button 
                onClick={() => setPhase('results')} 
                className="absolute top-8 left-8 text-white/50 hover:text-white glass px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-all z-20"
              >
                ← Return to Matrix
              </button>

              {/* Lighting Effects */}
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-600/10 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full"></div>

              {/* Main Subject */}
              <div className="relative z-10 w-full max-w-4xl h-[50vh] flex flex-col items-center justify-center">
                <img 
                  src={selectedCar.img || "https://images.unsplash.com/photo-1609521263047-f8f205293f24"} 
                  className={`w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-[2000ms] ${isRotating ? 'scale-110 -rotate-3' : 'scale-100'}`} 
                  alt="Vehicle"
                />
                
                {/* 360 Visuals Tool */}
                <div className="absolute bottom-0 w-full flex justify-center mt-12">
                   <button 
                     className="glass border border-white/20 text-white px-8 py-3 rounded-full flex items-center gap-3 hover:bg-white/10 transition-colors text-xs font-bold tracking-widest uppercase shadow-2xl backdrop-blur-md"
                     onClick={() => setIsRotating(!isRotating)}
                   >
                      <RotateCw size={16} className={isRotating ? 'animate-spin' : ''} /> Interact
                   </button>
                </div>
              </div>
           </div>
           
           {/* Specs Side */}
           <div className="bg-[#050505] p-12 md:p-16 flex flex-col relative overflow-hidden">
              {/* Top Graphic */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Shield size={300} />
              </div>

              <div className="relative z-10 flex-grow">
                <div className="inline-block bg-white/5 border border-white/10 text-white/70 text-[9px] font-black tracking-[0.2em] px-3 py-1.5 rounded-sm mb-6 uppercase">
                  Classified Specs
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black font-outfit mb-2 tracking-tight">{selectedCar.Model_Name || selectedCar.Model}</h1>
                <p className="text-xl md:text-2xl text-white/40 mb-10 font-light">{selectedCar.Trim}</p>
                
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 mb-16 font-outfit">
                  ${selectedCar.Price?.toLocaleString()}
                </div>
                
                <h3 className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase border-b border-white/10 pb-4 mb-6">Core Telemetry</h3>
                <div className="grid gap-6">
                   <div className="flex justify-between items-end pb-2 group border-b border-white/5">
                     <span className="text-white/60 text-sm font-medium transition-colors group-hover:text-white">Output Capacity</span> 
                     <span className="text-2xl font-bold font-outfit">{selectedCar.HP} <span className="text-sm font-normal text-white/30">HP</span></span>
                   </div>
                   <div className="flex justify-between items-end pb-2 group border-b border-white/5">
                     <span className="text-white/60 text-sm font-medium transition-colors group-hover:text-white">Efficiency</span> 
                     <span className="text-2xl font-bold font-outfit">{selectedCar.MPG} <span className="text-sm font-normal text-white/30">MPG</span></span>
                   </div>
                   <div className="flex justify-between items-end pb-2 group border-b border-white/5">
                     <span className="text-white/60 text-sm font-medium transition-colors group-hover:text-white">Structural Limit</span> 
                     <span className="text-2xl font-bold font-outfit">{selectedCar.Seats} <span className="text-sm font-normal text-white/30">Persons</span></span>
                   </div>
                   {selectedCar.BlindSpot && selectedCar.BlindSpot !== 'No' && (
                     <div className="flex justify-between items-end pb-2 group border-b border-white/5">
                       <span className="text-white/60 text-sm font-medium transition-colors group-hover:text-white">Sensory Array</span> 
                       <span className="text-xl font-bold font-outfit text-green-400">Active</span>
                     </div>
                   )}
                </div>
              </div>

              <div className="relative z-10 w-full mt-16 pt-8 border-t border-white/10">
                <button className="w-full bg-white text-black hover:bg-gray-200 py-6 font-black tracking-[0.2em] text-sm transition-colors rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] flex justify-center items-center gap-3 group uppercase">
                   Acquire Target <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans antialiased selection:bg-red-600/30 selection:text-white">
      <Navbar />
      <main className="transition-opacity duration-500">
        {phase === 'landing' && <LandingPage />}
        {phase === 'quiz' && <QuizPage />}
        {phase === 'results' && <ResultsPage />}
        {phase === 'vdp' && <VDPPage />}
      </main>
    </div>
  );
}