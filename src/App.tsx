import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  ClipboardCheck, 
  BrainCircuit, 
  Layout, 
  Loader2, 
  ChevronRight, 
  Copy, 
  Check,
  RefreshCw,
  Info,
  Download,
  AlertCircle,
  Trophy,
  Target,
  Image as ImageIcon,
  ArrowRight,
  Zap,
  ShieldCheck,
  Sparkles,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { 
  AcademicLevel, 
  ContentType, 
  ToneStyle, 
  OutputLength, 
  GenerationParams,
  DifficultyLevel,
  QuestionType,
  QuizData
} from './types';
import { generateAcademicContent } from './services/geminiService';

// Mermaid rendering component
const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'Inter',
      });
      try {
        mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        }).catch(err => {
          console.error("Mermaid error (Promise):", err);
          if (ref.current) {
            ref.current.innerHTML = `<div class="text-red-500 text-sm p-4 text-center">Failed to render diagram. Syntax error in AI output.</div>`;
          }
        });
      } catch (err) {
        console.error("Mermaid error (Sync):", err);
        if (ref.current) {
          ref.current.innerHTML = `<div class="text-red-500 text-sm p-4 text-center">Failed to render diagram. Syntax error in AI output.</div>`;
        }
      }
    }
  }, [chart]);

  return <div ref={ref} className="my-6 bg-white p-4 rounded-xl border border-slate-200 overflow-x-auto flex justify-center" />;
};

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-sky-50/50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
      
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">AcademiaGen <span className="text-indigo-600">AI</span></span>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
        >
          Enter App
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Higher Education Teaching Suite</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
            >
              Generate university-grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">learning materials</span> in seconds.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Empower educators and students with meticulously crafted lesson plans, study guides, and interactive practice tools tailored for undergraduate and postgraduate levels.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Start Generating <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-8"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Academically Accurate
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <Zap className="w-4 h-4 text-amber-500" /> Instant Layouts
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <BrainCircuit className="w-4 h-4 text-indigo-500" /> Pedagogically Sound
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] w-full"
          >
            {/* Abstract visual representation of the app features */}
            <div className="absolute inset-0 bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 overflow-hidden">
               {/* Mock Header */}
               <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                 </div>
                 <div>
                   <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                   <div className="h-3 w-24 bg-slate-100 rounded mt-2" />
                 </div>
               </div>

               {/* Mock Content */}
               <div className="flex-1 space-y-4">
                 <div className="h-8 w-3/4 bg-slate-100 rounded-lg" />
                 <div className="h-4 w-full bg-slate-50 rounded" />
                 <div className="h-4 w-full bg-slate-50 rounded" />
                 <div className="h-4 w-5/6 bg-slate-50 rounded" />
                 
                 <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 h-32 flex flex-col justify-between">
                     <FileText className="w-6 h-6 text-indigo-400" />
                     <div className="h-3 w-20 bg-indigo-200 rounded" />
                   </div>
                   <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 h-32 flex flex-col justify-between">
                     <Target className="w-6 h-6 text-sky-400" />
                     <div className="h-3 w-24 bg-sky-200 rounded" />
                   </div>
                 </div>
               </div>
               
               {/* Decorative glass overlay */}
               <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent blur-2xl rounded-full" />
            </div>

            {/* Floating Elements */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -left-8 top-12 bg-white p-4 rounded-xl border border-slate-100 shadow-xl flex items-center gap-3 backdrop-blur-md"
            >
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-sm font-semibold text-slate-700">Quiz Generated</div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -right-8 top-1/2 bg-white p-4 rounded-xl border border-slate-100 shadow-xl flex flex-col gap-2 backdrop-blur-md w-48"
            >
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Difficulty Level</div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-indigo-500 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [params, setParams] = useState<GenerationParams>({
    academicLevel: 'Undergraduate',
    topic: '',
    contentType: 'Lesson Plan',
    toneStyle: 'Formal',
    outputLength: 'Standard',
    difficultyLevel: 'Intermediate',
    questionType: 'Multiple Choice'
  });

  const [content, setContent] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!params.topic.trim()) {
      setError("Please enter a topic to generate content.");
      return;
    }

    setLoading(true);
    setError(null);
    setContent(null);
    setQuizData(null);
    setActiveTab('quiz');
    setCurrentFlashcard(0);
    setIsFlipped(false);
    setUserAnswers({});
    setShowResults(false);

    try {
      const result = await generateAcademicContent(params);
      
      if (params.contentType === 'Practice Tools') {
        try {
          const parsed = JSON.parse(result);
          setQuizData(parsed);
        } catch (parseErr) {
          console.warn("Could not parse AI response as JSON quiz, falling back to markdown", parseErr);
          setContent(result);
        }
      } else {
        setContent(result);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const downloadContent = () => {
    let textToDownload = content || "";
    if (quizData) {
      // Format quiz data for download if interactive mode is active
      textToDownload = `# ${quizData.title}\n\n${quizData.instructions}\n\n`;
      quizData.questions.forEach((q, i) => {
        textToDownload += `## Question ${i + 1}\n${q.question}\n`;
        if (q.options) {
          textToDownload += q.options.map((opt, oi) => `   ${String.fromCharCode(65 + oi)}) ${opt}`).join('\n') + '\n';
        }
        textToDownload += `\nCorrect Answer: ${q.correctAnswer}\nExplanation: ${q.explanation}\n\n---\n\n`;
      });
    }

    const blob = new Blob([textToDownload], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${params.topic.replace(/\s+/g, '_')}_${params.contentType.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreDetails = () => {
    if (!quizData) return { score: 0, maxScore: 0, percentage: 0, feedback: "" };
    
    let score = 0;
    let maxScore = 0;
    
    quizData.questions.forEach(q => {
      const pts = q.points || 1;
      maxScore += pts;
      const userAns = userAnswers[q.id]?.trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      if (userAns === correctAns) score += pts;
    });
    
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    let feedback = "Review your answers above to reinforce your understanding of the core concepts.";
    
    if (quizData.scoreTracking?.feedbackRanges) {
      const range = quizData.scoreTracking.feedbackRanges.find(r => percentage >= r.min && percentage <= r.max);
      if (range) {
        feedback = range.feedback;
      }
    }
    
    return { score, maxScore, percentage, feedback };
  };

  const copyToClipboard = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!hasStarted) {
    return <LandingPage onStart={() => setHasStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setHasStarted(false)}
          >
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900" id="app-title">AcademiaGen <span className="text-indigo-600">AI</span></h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1 font-medium"><Info className="w-4 h-4" /> Higher Education Suite</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                <h2 className="font-medium text-slate-700">Configuration</h2>
              </div>
              
              <form onSubmit={handleGenerate} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium text-slate-700 block">Research Topic / Subject</label>
                  <input 
                    id="topic"
                    type="text"
                    placeholder="e.g. Quantum Mechanics, Macroeconomics..."
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                    value={params.topic}
                    onChange={(e) => setParams({...params, topic: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="level" className="text-sm font-medium text-slate-700 block">Academic Level</label>
                    <select 
                      id="level"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                      value={params.academicLevel}
                      onChange={(e) => setParams({...params, academicLevel: e.target.value as AcademicLevel})}
                    >
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium text-slate-700 block">Content Type</label>
                    <select 
                      id="type"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                      value={params.contentType}
                      onChange={(e) => setParams({...params, contentType: e.target.value as ContentType})}
                    >
                      <option value="Lesson Plan">Lesson Plan</option>
                      <option value="Study Guide">Study Guide</option>
                      <option value="Practice Tools">Practice Tools</option>
                      <option value="Course Outline">Course Outline</option>
                    </select>
                  </div>
                </div>

                {params.contentType === 'Study Guide' && (
                  <div className="space-y-2">
                    <label htmlFor="diff" className="text-sm font-medium text-slate-700 block">Difficulty Level</label>
                    <select 
                      id="diff"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                      value={params.difficultyLevel}
                      onChange={(e) => setParams({...params, difficultyLevel: e.target.value as DifficultyLevel})}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                )}

                {params.contentType === 'Practice Tools' && (
                  <div className="space-y-2">
                    <label htmlFor="qtype" className="text-sm font-medium text-slate-700 block">Question Format</label>
                    <select 
                      id="qtype"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                      value={params.questionType}
                      onChange={(e) => setParams({...params, questionType: e.target.value as QuestionType})}
                    >
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="True/False">True/False</option>
                      <option value="Short Answer">Short Answer</option>
                      <option value="Mixed Format">Mixed Format</option>
                      <option value="Case Study">Case Study</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="tone" className="text-sm font-medium text-slate-700 block">Tone Style</label>
                    <select 
                      id="tone"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                      value={params.toneStyle}
                      onChange={(e) => setParams({...params, toneStyle: e.target.value as ToneStyle})}
                    >
                      <option value="Formal">Formal</option>
                      <option value="Simplified">Simplified</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="len" className="text-sm font-medium text-slate-700 block">Output Depth</label>
                    <select 
                      id="len"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                      value={params.outputLength}
                      onChange={(e) => setParams({...params, outputLength: e.target.value as OutputLength})}
                    >
                      <option value="Summary">Summary</option>
                      <option value="Standard">Standard</option>
                      <option value="Detailed">Detailed</option>
                    </select>
                  </div>
                </div>

                <button 
                  id="generate-button"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Crafting Content...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Generate Materials
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Quick Tips */}
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 italic text-sm text-indigo-800">
              "Quality educational materials require clear topics. Be specific for better university-grade results."
            </div>
          </div>

          {/* Result Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!content && !loading && !error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl border border-slate-200 h-[600px] flex flex-col items-center justify-center text-slate-400 p-8 text-center"
                >
                  <img 
                    src="https://picsum.photos/seed/library/600/300"
                    alt="Academic Library"
                    className="w-full max-w-md h-48 object-cover rounded-2xl mb-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl border border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <BookOpen className="w-12 h-12 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Knowledge Engine Ready</h3>
                  <p className="max-w-xs mx-auto text-slate-500">Enter a topic and academic level to generate university-standard learning materials and interactive tools.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 h-[600px] flex flex-col items-center justify-center p-8 overflow-hidden relative"
                >
                  <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    {/* Background outline */}
                    <Brain className="absolute inset-0 w-full h-full text-slate-100" strokeWidth={1} />
                    
                    {/* Animated filling part */}
                    <motion.div 
                      className="absolute inset-0 text-indigo-600 drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      transition={{ duration: 15, ease: "easeOut" }}
                    >
                      <Brain className="w-full h-full" strokeWidth={1.5} />
                      
                      {/* Inner gradient filler effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-transparent mix-blend-multiply" />
                    </motion.div>
                    
                    {/* Pulse ring behind */}
                    <motion.div 
                      className="absolute inset-0 border-[3px] border-indigo-100 rounded-[3rem] -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="mt-8 space-y-3 text-center z-10">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">The AI is thinking...</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto animate-pulse leading-relaxed">
                      Structuring academic frameworks, sourcing concepts, and tailoring exactly to your requested level.
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 rounded-2xl border border-red-100 p-8 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="bg-white p-3 rounded-full shadow-sm text-red-500">
                    <Info className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800">Generation Failed</h3>
                  <p className="text-red-600 max-w-sm">{error}</p>
                  <button 
                    onClick={handleGenerate}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {content && (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[700px]"
                >
                  {/* Toolbar */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 shadow-sm">
                        <FileText className="w-3.5 h-3.5" />
                        {params.contentType}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 shadow-sm">
                        <Layout className="w-3.5 h-3.5" />
                        {params.academicLevel}
                      </div>
                      {quizData?.flashcards && (
                        <div className="flex p-0.5 bg-slate-100 rounded-lg ml-2">
                          <button 
                            onClick={() => setActiveTab('quiz')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'quiz' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Quiz
                          </button>
                          <button 
                            onClick={() => setActiveTab('flashcards')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'flashcards' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Flashcards
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={downloadContent}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500 transition-all flex items-center gap-2 text-sm font-medium"
                        title="Download as Markdown"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button 
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500 transition-all flex items-center gap-2 text-sm font-medium"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Content or Quiz Body */}
                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {quizData ? (
                      activeTab === 'quiz' ? (
                        <div className="space-y-8">
                          <div className="border-b border-slate-100 pb-6">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{quizData.title}</h1>
                            <p className="text-slate-500 italic">{quizData.instructions}</p>
                          </div>

                          {quizData.questions.map((q, qIndex) => (
                            <div key={q.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 space-y-4">
                              <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                  {qIndex + 1}
                                </span>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-slate-800 leading-snug">{q.question}</h3>
                                </div>
                              </div>

                              {q.options ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                                  {q.options.map((option, oIndex) => {
                                    const isSelected = userAnswers[q.id] === option;
                                    const isCorrect = option === q.correctAnswer;
                                    const showSolution = showResults;

                                    let classes = "p-3 rounded-lg border text-left text-sm transition-all ";
                                    if (showSolution) {
                                      if (isCorrect) classes += "bg-green-50 border-green-200 text-green-700 font-medium ";
                                      else if (isSelected) classes += "bg-red-50 border-red-200 text-red-700 ";
                                      else classes += "bg-white border-slate-200 text-slate-400 ";
                                    } else {
                                      classes += isSelected 
                                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 " 
                                        : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50 ";
                                    }

                                    return (
                                      <button
                                        key={oIndex}
                                        disabled={showResults}
                                        onClick={() => setUserAnswers({...userAnswers, [q.id]: option})}
                                        className={classes}
                                      >
                                        <span className="inline-block w-6 font-bold">{String.fromCharCode(65 + oIndex)}.</span>
                                        {option}
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="ml-12">
                                  <input 
                                    type="text"
                                    disabled={showResults}
                                    placeholder="Type your answer here..."
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-all ${
                                      showResults 
                                        ? (userAnswers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300")
                                        : "bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    }`}
                                    value={userAnswers[q.id] || ''}
                                    onChange={(e) => setUserAnswers({...userAnswers, [q.id]: e.target.value})}
                                  />
                                  {showResults && (
                                    <div className="mt-3 p-3 bg-indigo-50 rounded-lg flex gap-2 items-start">
                                      <Target className="w-4 h-4 text-indigo-600 mt-0.5" />
                                      <div>
                                        <p className="text-sm font-bold text-indigo-900">Correct Answer: {q.correctAnswer}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {showResults && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="ml-12 p-4 bg-slate-100 rounded-lg text-sm text-slate-600 border-l-4 border-slate-300"
                                >
                                  <div className="flex gap-2 items-start">
                                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <p>{q.explanation}</p>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          ))}

                          {/* Quiz Summary/Submit */}
                          {!showResults ? (
                            <div className="flex justify-center pt-8 border-t border-slate-100">
                              <button
                                onClick={() => setShowResults(true)}
                                className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                              >
                                <ClipboardCheck className="w-5 h-5" />
                                Submit Quiz & View Results
                              </button>
                            </div>
                          ) : (
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-8 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-8"
                            >
                              <div className="relative w-32 h-32 flex items-center justify-center">
                                <Target className="w-16 h-16 absolute opacity-20" />
                                <div className="text-center z-10">
                                  <span className="block text-4xl font-black">{getScoreDetails().score}/{getScoreDetails().maxScore}</span>
                                  <span className="text-xs uppercase tracking-widest font-bold opacity-80">Final Score</span>
                                </div>
                                <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
                                <div 
                                  className="absolute inset-0 border-4 border-white rounded-full transition-all duration-1000" 
                                  style={{ clipPath: `inset(0 ${100 - getScoreDetails().percentage}% 0 0)` }}
                                />
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                  <Trophy className="w-6 h-6 text-yellow-300" />
                                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                                </div>
                                <p className="opacity-100 font-medium text-lg">
                                  {getScoreDetails().percentage.toFixed(0)}% — {getScoreDetails().feedback}
                                </p>
                                <p className="opacity-80 leading-relaxed text-sm">
                                  You've completed the interactive assessment for <strong>{params.topic}</strong>.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                  <button
                                    onClick={() => { setShowResults(false); setUserAnswers({}); }}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold border border-white/30 transition-all"
                                  >
                                    Retry Same Quiz
                                  </button>
                                  <button
                                    onClick={() => handleGenerate()}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold border border-white/30 transition-all text-indigo-100"
                                  >
                                    Generate New Quiz
                                  </button>
                                  <button
                                    onClick={downloadContent}
                                    className="px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-all"
                                  >
                                    Download Results
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto py-12">
                          <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-slate-800">Concept Flashcards</h2>
                            <p className="text-slate-500">Tap to flip and reveal the definition</p>
                          </div>

                          <div className="relative w-full aspect-[4/3] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                            <motion.div 
                              animate={{ rotateY: isFlipped ? 180 : 0 }}
                              transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                              className="w-full h-full relative preserve-3d"
                            >
                              {/* Front */}
                              <div className="absolute inset-0 backface-hidden bg-white border-2 border-indigo-100 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
                                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4">Front</span>
                                <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                                  {quizData.flashcards?.[currentFlashcard]?.front}
                                </h3>
                              </div>
                              
                              {/* Back */}
                              <div className="absolute inset-0 backface-hidden bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center rotateY-180">
                                <span className="text-xs uppercase tracking-widest text-indigo-200 font-bold mb-4">Definition</span>
                                <p className="text-lg text-white leading-relaxed font-medium">
                                  {quizData.flashcards?.[currentFlashcard]?.back}
                                </p>
                              </div>
                            </motion.div>
                          </div>

                          <div className="flex items-center gap-8 mt-12">
                            <button
                              disabled={currentFlashcard === 0}
                              onClick={(e) => { e.stopPropagation(); setCurrentFlashcard(prev => prev - 1); setIsFlipped(false); }}
                              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
                            >
                              <ChevronRight className="w-6 h-6 rotate-180" />
                            </button>
                            <span className="text-sm font-bold text-slate-400">
                             Card {currentFlashcard + 1} of {quizData.flashcards?.length}
                            </span>
                            <button
                              disabled={currentFlashcard === (quizData.flashcards?.length || 0) - 1}
                              onClick={(e) => { e.stopPropagation(); setCurrentFlashcard(prev => prev + 1); setIsFlipped(false); }}
                              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      )
                    ) : (
                    <div className="markdown-body">
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-mermaid/.exec(className || '');
                            if (!inline && match) {
                              return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                            }
                            return (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                          img({ src, alt }) {
                            const isPlaceholder = src?.includes('Illustration') || src?.includes('Image');
                            const displaySrc = isPlaceholder 
                              ? `https://picsum.photos/seed/${encodeURIComponent(alt || 'academic')}/800/400`
                              : src;

                            return (
                              <div className="my-8 space-y-2">
                                <img 
                                  src={displaySrc} 
                                  alt={alt} 
                                  className="rounded-2xl border border-slate-200 shadow-lg w-full object-cover max-h-[400px]"
                                  referrerPolicy="no-referrer"
                                />
                                {alt && <p className="text-center text-xs text-slate-400 italic font-medium">Figure: {alt}</p>}
                              </div>
                            );
                          }
                        }}
                      >
                        {content || ''}
                      </ReactMarkdown>
                    </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex justify-between items-center text-xs text-slate-400">
                    <span>Generated by AcademiaGen AI Engineering</span>
                    <span className="flex items-center gap-1"><ClipboardCheck className="w-3 h-3" /> Ready for Academic Use</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-sky-50/50 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }

        /* Basic Markdown Styling */
        .markdown-body h1 { font-size: 2.25rem; font-weight: 800; border-bottom: 2px solid #F1F5F9; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 1.5rem; color: #1E293B; }
        .markdown-body h2 { font-size: 1.5rem; font-weight: 700; margin-top: 1.75rem; margin-bottom: 1rem; color: #334155; border-left: 4px solid #6366F1; padding-left: 1rem; }
        .markdown-body h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #475569; }
        .markdown-body p { margin-bottom: 1rem; line-height: 1.75; color: #475569; }
        .markdown-body ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-body ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-body li { margin-bottom: 0.5rem; color: #475569; }
        .markdown-body blockquote { border-left: 4px solid #E2E8F0; padding-left: 1rem; font-style: italic; color: #64748B; margin: 1.5rem 0; }
        .markdown-body code { background: #F1F5F9; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.875em; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
        .markdown-body table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.875rem; }
        .markdown-body th { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.75rem; text-align: left; font-weight: 600; color: #475569; }
        .markdown-body td { border: 1px solid #E2E8F0; padding: 0.75rem; color: #64748B; }
        .markdown-body strong { font-weight: 600; color: #334155; }

        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
