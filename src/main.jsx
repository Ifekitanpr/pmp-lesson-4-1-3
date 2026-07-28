import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Award, CalendarDays, Check, ChevronDown,
  ClipboardCheck, Coins, FileCheck2, Gauge, Menu, RefreshCcw,
  Scale, ShieldAlert, Sparkles, Target, Volume2, VolumeX, X
} from "lucide-react";
import hookStory from "./assets/illustrations/hook-story-v2.svg?raw";
import filterStory from "./assets/illustrations/filter-story-v2.svg?raw";
import kpiStory from "./assets/illustrations/kpi-story.svg?raw";
import riskStory from "./assets/illustrations/risk-threshold-story.svg?raw";
import budgetStory from "./assets/illustrations/budget-constraint-story.svg?raw";
import progressStory from "./assets/illustrations/progress-report-story.svg?raw";
import complianceStory from "./assets/illustrations/compliance-story-v2.svg?raw";
import predictiveStory from "./assets/illustrations/predictive-story.svg?raw";
import adaptiveStory from "./assets/illustrations/adaptive-story.svg?raw";
import precisionStory from "./assets/illustrations/precision-story-v2.svg?raw";
import criticalSignalModal from "./assets/illustrations/modal-critical-signal.svg?raw";
import filterModal from "./assets/illustrations/modal-filter-deliberately.svg?raw";
import complianceModal from "./assets/illustrations/modal-compliance-monitoring.svg?raw";
import precisionModal from "./assets/illustrations/modal-precision.svg?raw";
import riskCheckModal from "./assets/illustrations/modal-risk-threshold-check.svg?raw";
import adaptiveCheckModal from "./assets/illustrations/modal-adaptive-check.svg?raw";
import "./styles.css";
import { useLessonAudio } from "../../shared/useLessonAudio";
import { IllustrationPlayer } from "./components/IllustrationPlayer";

const screens = ["Signal, not volume", "Filter deliberately", "Four categories", "Compliance", "Development approach", "Exam lens"];

const categories = [
  {
    title: "Key Performance Indicators (KPIs)",
    Icon: Gauge,
    image: kpiStory,
    text: "Measurable data showing how well the project is progressing toward its goals — schedule adherence, budget performance, quality standards, delivery against milestones. KPIs translate objectives into numbers that can be tracked, compared against targets, and used to trigger decisions when performance drifts outside acceptable bounds. The test for a KPI isn't whether it's interesting — it's whether it directly measures something the project is accountable for delivering."
  },
  {
    title: "Risk Thresholds",
    Icon: ShieldAlert,
    image: riskStory,
    text: "Define the point at which a risk requires immediate action. Not all risks demand the same response, and not all risk data is equally critical at all times. Identifying thresholds in advance means the PM knows, before a risk materializes, what triggers escalation, what triggers a mitigation response, and what falls within acceptable tolerance. Without predefined thresholds, risk data arrives as information but leaves without an action."
  },
  {
    title: "Budget Constraints",
    Icon: Coins,
    image: budgetStory,
    text: "Monitoring financial performance is essential to avoid cost overruns that compromise the project's business case. Approaching or exceeding budget limits is critical information requiring swift decisions — re-scoping, re-sequencing, escalating to the sponsor. Budget data that arrives too late, or isn't tracked against meaningful thresholds, produces surprises rather than decisions."
  },
  {
    title: "Progress Reports",
    Icon: ClipboardCheck,
    image: progressStory,
    text: "Regular, structured updates that keep stakeholders informed about advancements, emerging issues, and adjustments. Progress reporting isn't just a communication task — it's how the PM maintains shared situational awareness across a stakeholder community with different information needs. Too detailed overwhelms most readers; too high-level fails to surface the signals that matter."
  }
];

const quizOne = {
  image: riskCheckModal,
  imageAlt: "A project manager and sponsor review a predefined risk impact boundary",
  question: "Scenario: A project has a rule that any risk with a potential cost impact above a defined dollar amount must be escalated to the sponsor immediately. What is this an example of?",
  answers: ["A KPI", "A risk threshold", "A budget constraint", "A progress report"],
  correct: 1,
  correctFeedback: "Right — a predefined trigger point for action based on impact or probability is exactly what a risk threshold is. Without it, the same risk data would arrive with no agreed response attached.",
  incorrectFeedback: "Reconsider — this is specifically about a predefined trigger point for risk action, not a performance measure or a spending limit."
};

const quizTwo = {
  image: adaptiveCheckModal,
  imageAlt: "A Scrum team reviews current work and a burndown trend during a daily stand-up",
  question: "Scenario: A Scrum team relies on burndown charts and daily stand-ups rather than a monthly formal status report to track progress. What does this reflect?",
  answers: [
    "The team is skipping proper information governance",
    "An adaptive environment's approach to information requirements — real-time data over periodic reporting",
    "A predictive environment's approach to information requirements",
    "The team has no critical information requirements defined"
  ],
  correct: 1,
  correctFeedback: "Exactly — real-time, continuously reassessed data replacing formal periodic reporting is the adaptive pattern, not a governance gap.",
  incorrectFeedback: "Look again at the cadence described — continuous, real-time tracking points to one specific development approach."
};

function FocusModal({ title, image, imageAlt = "", children, action = "Mark as read", onClose, onAction }) {
  useEffect(() => {
    const key = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);
  return createPortal(
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.section className="focus-modal" initial={{ opacity: 0, y: 26, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .98 }} onClick={(event) => event.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close"><X /></button>
        <IllustrationPlayer className="modal-illustration" svg={image} />
        <h3>{title}</h3>
        <div className="modal-copy">{children}</div>
        <button className="modal-action" onClick={() => { onAction(); onClose(); }}>{action}<Check /></button>
      </motion.section>
    </motion.div>, document.body
  );
}

function KnowledgeCheck({ data, onFinish }) {
  const [pick, setPick] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <motion.section className="knowledge-modal" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <IllustrationPlayer className="quiz-illustration" svg={data.image} />
        <p className="quiz-label"><Target /> MICRO KNOWLEDGE CHECK</p>
        <h3>{data.question}</h3>
        <div className="answers">
          {data.answers.map((answer, index) => (
            <button key={answer} className={pick === index ? (index === data.correct ? "correct" : "wrong") : ""} onClick={() => setPick(index)}>
              <span>{String.fromCharCode(65 + index)}</span>{answer}
            </button>
          ))}
        </div>
        {pick !== null && <p className={`feedback ${pick === data.correct ? "good" : "bad"}`}>{pick === data.correct ? data.correctFeedback : data.incorrectFeedback}</p>}
        {pick !== null && <button className="finish-check" onClick={onFinish}>Finish check <ArrowRight /></button>}
      </motion.section>
    </div>, document.body
  );
}

function App() {
  const [page, setPage] = useState(0);
  const [sound, setSound] = useState(true);
  const [menu, setMenu] = useState(false);
  const [reveal, setReveal] = useState(null);
  const [heroRead, setHeroRead] = useState(false);
  const [meaningRead, setMeaningRead] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [categoriesSeen, setCategoriesSeen] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [quizOneDone, setQuizOneDone] = useState(false);
  const [complianceRead, setComplianceRead] = useState(false);
  const [approach, setApproach] = useState("predictive");
  const [approachesSeen, setApproachesSeen] = useState([]);
  const [quizTwoDone, setQuizTwoDone] = useState(false);
  const [done, setDone] = useState(false);
  useLessonAudio(sound);

  useEffect(() => {
    if (page === 4) {
      setApproachesSeen((seen) => seen.includes(approach) ? seen : [...seen, approach]);
    }
  }, [page, approach]);

  const canContinue = [heroRead, meaningRead, categoriesSeen.length === 4 && quizOneDone, complianceRead, approachesSeen.length === 2 && quizTwoDone, done][page];
  const goNext = () => page < 5 && setPage(page + 1);
  const visitApproach = (name) => {
    setApproach(name);
    setApproachesSeen((seen) => seen.includes(name) ? seen : [...seen, name]);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select"><Award /><span>PMP Project Management Professional</span><ChevronDown /></button>
        <div className="module-progress"><div>{Array.from({ length: 10 }, (_, i) => <span key={i} className={`progress-dot ${i < 9 ? "done" : i === 9 ? "active" : ""}`}>{i < 9 ? <Check size={10} /> : <span />}</span>)}</div></div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>{sound ? <Volume2 /> : <VolumeX />}<span>{sound ? "Sound on" : "Sound off"}</span></button>
          <button className="ghost-button"><X /><span>Quit</span></button>
        </div>
      </header>

      <main className="workspace">
        <section className="lesson-stage">
          <div className="outline">
            <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Open lesson outline"><Menu /></button>
            {menu && <div className="outline-panel">
              <div className="outline-summary"><div><b>Lesson progress</b><span>{page + 1} / 6</span></div><span className="summary-track"><span style={{ width: `${((page + 1) / 6) * 100}%` }} /></span></div>
              <div className="lesson-list">{screens.map((screen, index) => <button key={screen} className={`lesson ${index === page ? "current" : ""}`} disabled={index > page} onClick={() => { setPage(index); setMenu(false); }}><span>{index < page ? <Check size={13} /> : index + 1}</span><span>{screen}</span><small>{index < page ? "Read" : index === page ? "Current" : "Locked"}</small></button>)}</div>
            </div>}
          </div>

          <article className="lesson-card">
            <nav className="section-tabs">
              <p>Section {page + 1} of 6</p>
              <div>{screens.map((screen, index) => <button key={screen} disabled={index > page} className={index === page ? "active" : index < page ? "done" : "locked"} onClick={() => setPage(index)}>{index < page && <Check />}<span>{screen}</span></button>)}</div>
            </nav>

            <AnimatePresence mode="wait">
              <motion.section key={page} className="lesson-content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -26 }}>
                {page === 0 && <div className="hero-layout">
                  <div>
                    <p className="eyebrow">LESSON 4.1.3</p>
                    <h1>Determine Critical Information Requirements</h1>
                    <p className="lead">The project generating the most reports isn't necessarily the best-governed one. Sometimes it's the one furthest out of control — hiding behind a flood of data that nobody actually has time to read.</p>
                    <button className="primary-cta" onClick={() => setReveal("hook")}>{heroRead ? "Critical signal revealed" : "Reveal the critical signal"}<ArrowRight /></button>
                  </div>
                  <motion.div className="lesson-art" animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><IllustrationPlayer svg={hookStory} style={{ height: "100%" }} /></motion.div>
                </div>}

                {page === 1 && <div className="hero-layout compact-hero">
                  <div>
                    <p className="eyebrow">WHAT THIS ENABLER MEANS</p>
                    <h2>The third enabler of ECO Process Task 1 isn't asking you to collect more.</h2>
                    <p className="lead">It's asking you to filter deliberately — on purpose, before the project even starts.</p>
                    <button className="primary-cta" onClick={() => setReveal("meaning")}>{meaningRead ? "Filter revealed" : "Reveal what this enabler means"}<ArrowRight /></button>
                  </div>
                  <motion.div className="lesson-art" animate={{ scale: [1, 1.015, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><IllustrationPlayer svg={filterStory} style={{ height: "100%" }} /></motion.div>
                </div>}

                {page === 2 && <div className="wide-page">
                  <p className="eyebrow">FOUR CATEGORIES OF CRITICAL INFORMATION</p>
                  <h2>Critical information requirements organize into four categories, and each one serves a distinct governance purpose.</h2>
                  <p className="lead">Click each to explore.</p>
                  <div className="accordion">
                    {categories.map(({ title, Icon, image, text }, index) => <div key={title} className={`accordion-item ${openCategory === index ? "open" : ""}`}>
                      <button onClick={() => { setOpenCategory(openCategory === index ? null : index); setCategoriesSeen((seen) => seen.includes(index) ? seen : [...seen, index]); }}>
                        <span className="category-icon"><Icon /></span><span className="category-number">0{index + 1}</span><strong>{title}</strong><ChevronDown />
                      </button>
                      <AnimatePresence initial={false}>{openCategory === index && <motion.div className="accordion-copy" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><IllustrationPlayer className="accordion-art" svg={image} /><p>{text}</p></motion.div>}</AnimatePresence>
                    </div>)}
                  </div>
                  {categoriesSeen.length === 4 && !quizOneDone && <button className="knowledge-cta" onClick={() => setQuiz(quizOne)}><Target /> Start knowledge check <ArrowRight /></button>}
                </div>}

                {page === 3 && <div className="hero-layout compact-hero">
                  <div>
                    <p className="eyebrow">COMPLIANCE: THE CATEGORY THAT HIDES IN PLAIN SIGHT</p>
                    <h2>One category of critical information gets treated as an afterthought more often than it should.</h2>
                    <p className="lead">And the cost of that mistake tends to show up much later than everything else on this list.</p>
                    <button className="primary-cta" onClick={() => setReveal("compliance")}>{complianceRead ? "Compliance revealed" : "Reveal the overlooked category"}<ArrowRight /></button>
                  </div>
                  <motion.div className="lesson-art" animate={{ opacity: [.94, 1, .94] }} transition={{ duration: 4, repeat: Infinity }}><IllustrationPlayer svg={complianceStory} style={{ height: "100%" }} /></motion.div>
                </div>}

                {page === 4 && <div className="approach-page">
                  <p className="eyebrow">PREDICTIVE VS. ADAPTIVE INFORMATION REQUIREMENTS</p>
                  <h2>The four categories don't change — but how the information gets collected and used shifts noticeably depending on the development approach.</h2>
                  <p className="lead">Toggle between the two to compare.</p>
                  <div className="approach-tabs">
                    <button className={approach === "predictive" ? "active" : ""} onClick={() => visitApproach("predictive")}><CalendarDays /> Predictive</button>
                    <button className={approach === "adaptive" ? "active" : ""} onClick={() => visitApproach("adaptive")}><RefreshCcw /> Adaptive</button>
                  </div>
                  <motion.div className="approach-panel" key={approach} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    {approach === "predictive" ? <><IllustrationPlayer className="approach-art" svg={predictiveStory} /><div><h3>Predictive</h3><p>Information requirements are largely defined during planning and remain relatively stable. Data is collected and reported at set intervals — monthly status meetings, phase gate reviews, formal progress reports. The emphasis is on structured, consistent reporting against predefined KPIs and milestones.</p></div></> : <><IllustrationPlayer className="approach-art" svg={adaptiveStory} /><div><h3>Adaptive</h3><p>Information requirements are reassessed regularly, often at the start of each sprint or iteration. The project's current phase determines what data is most relevant right now. Real-time data becomes more important than periodic reporting — daily stand-ups, burndown charts, velocity metrics, and sprint reviews replace or supplement the formal reporting structures of a predictive environment.</p></div></>}
                  </motion.div>
                  {approachesSeen.length === 2 && <motion.div className="principle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Sparkles /><p>In either case, the underlying principle is the same — identify the data that actually drives decisions and track it deliberately, rather than collecting everything and hoping the important signals surface on their own.</p></motion.div>}
                  {approachesSeen.length === 2 && !quizTwoDone && <button className="knowledge-cta" onClick={() => setQuiz(quizTwo)}><Target /> Start knowledge check <ArrowRight /></button>}
                </div>}

                {page === 5 && <div className="exam-layout">
                  <div className="exam-visual">
                    <IllustrationPlayer className="exam-visual-art" svg={precisionStory} />
                  </div>
                  <div>
                    <p className="eyebrow">SYNTHESIS (EXAM LENS)</p>
                    <h2>Strip away the four categories and the predictive/adaptive split, and one word captures what this whole enabler is really about.</h2>
                    <button className="primary-cta" disabled={done} onClick={() => setReveal("synthesis")}>{done ? "Synthesis reviewed" : "Reveal the synthesis"}<Sparkles /></button>
                  </div>
                </div>}
              </motion.section>
            </AnimatePresence>

            {canContinue && <div className="completion"><Check /> Interaction complete — continue when ready.</div>}
            <footer className="nav-footer">
              <button className="secondary-button" disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowLeft /> Previous</button>
              <button className={`primary-button ${canContinue ? "unlocked" : ""}`} disabled={!canContinue} onClick={goNext}>{page === 5 ? "Continue to next lesson" : "Continue"}<ArrowRight /></button>
            </footer>
          </article>
        </section>
      </main>

      <AnimatePresence>
        {reveal === "hook" && <FocusModal title="Critical information requirements" image={criticalSignalModal} imageAlt="A project manager selects five essential signals from many reports for a sponsor" onClose={() => setReveal(null)} onAction={() => setHeroRead(true)}><p>Projects generate an overwhelming amount of data — metrics, reports, dashboards, status updates, risk logs — and the volume on any reasonably sized project can quickly become unmanageable. More reporting is not the same thing as more control. Here's the discipline this enabler is asking for: not all of that data matters equally. A small number of specific data points actually drive the decisions that determine whether the project succeeds or fails. Those are your critical information requirements — and identifying them before the project is underway is what separates informed project management from data collection for its own sake.</p></FocusModal>}
        {reveal === "meaning" && <FocusModal title="Filter deliberately" image={filterModal} imageAlt="A project team deliberately selects must-have information before kickoff" onClose={() => setReveal(null)} onAction={() => setMeaningRead(true)}><p>This asks the project manager to determine critical information requirements — identifying the specific, must-have data that drives the health, performance, and compliance of the project. Not collecting everything. Filtering deliberately: identifying the few data points that influence key decisions, track real progress, signal early warnings for emerging risks, and keep stakeholders aligned without overwhelming them with irrelevant detail. PMBOK® 8 connects this directly to the governance principle of informed decision-making — governance decisions should be supported by relevant, timely data. Without critical information requirements, the project either drowns in data or makes decisions in a vacuum.</p></FocusModal>}
        {reveal === "compliance" && <FocusModal title="Compliance is critical information" image={complianceModal} imageAlt="A project manager and compliance specialist catch a compliance warning early" onClose={() => setReveal(null)} onAction={() => setComplianceRead(true)}><p>As the project progresses, compliance-related data must be monitored as diligently as performance data. Government regulations — are the project's activities legally compliant? Corporate policies — are the project's processes meeting internal standards? Quality benchmarks — do the deliverables meet the standards they were designed to? These are not administrative details. They are risk vectors. Non-compliance discovered late in a project carries remediation costs that can dwarf the original budget for the affected work. Critical information requirements need to integrate compliance monitoring alongside performance monitoring — one coherent picture of both how the project is performing and whether it's remaining within the legal and organizational boundaries it's required to operate in.</p></FocusModal>}
        {reveal === "synthesis" && <FocusModal title="Precision" image={precisionModal} imageAlt="A concise decision brief helps a project manager and sponsor choose a project path" action="Mark synthesis reviewed" onClose={() => setReveal(null)} onAction={() => setDone(true)}><p>Precision. In a sea of available data, project managers must identify the small set of indicators that truly guide decisions, track progress, ensure compliance, and manage risks. Whether using a traditional plan-driven model or a dynamic Agile approach, focusing on these essential data points enables you to cut through the noise, make informed decisions quickly, and keep your project aligned with both its objectives and compliance obligations.</p><h4>Exam-relevant enablers to remember:</h4><ul><li>Four categories: KPIs, risk thresholds, budget constraints, progress reports — each serves a distinct governance purpose</li><li>Compliance (regulatory, corporate policy, quality benchmarks) is critical information too, not an administrative afterthought</li><li>Predictive: stable requirements, periodic formal reporting. Adaptive: continuously reassessed, real-time data</li><li>The goal is never more data — it's the smallest set of indicators that actually drives decisions</li></ul></FocusModal>}
      </AnimatePresence>

      {quiz && <KnowledgeCheck data={quiz} onFinish={() => { if (quiz === quizOne) setQuizOneDone(true); else setQuizTwoDone(true); setQuiz(null); }} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
