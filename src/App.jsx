import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function ShieldLogo({ className = "h-12 w-12" }) {
  return (
    <img src="/davari_shield.svg" alt="DavAri Shield" className={className} />
  );
}

function FullLogo({ className = "w-[240px] md:w-[280px]" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/davari_logo.svg"
        alt="DavAri Solutions"
        className="w-full drop-shadow-[0_0_30px_rgba(56,189,248,0.18)]"
      />
    </div>
  );
}

export default function App() {
  const [transition, setTransition] = useState({
    open: true,
    label: "DavAri Solutions",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransition((prev) => ({ ...prev, open: false }));
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Virtual Consultations",
      description:
        "Focused remote consultation for lighting performance issues, abnormal behavior, field failures, and system-level concerns that need experienced technical interpretation.",
    },
    {
      title: "Failure Analysis",
      description:
        "Fixture and lighting-system failure analysis to identify likely failure points, isolate the component driving the issue, and confirm the failure from a system perspective.",
    },
    {
      title: "Functional & Stress Testing",
      description:
        "Practical lighting-system bench testing including on/off behavior, dimming, cycling, and anomaly detection to reveal functional issues before they become larger problems.",
    },
    {
      title: "Technical Reporting",
      description:
        "Clear 8D and A3-style reporting that documents findings, captures the problem clearly, and helps manufacturers or stakeholders move toward root cause and corrective action.",
    },
    {
      title: "Manufacturer Collaboration",
      description:
        "Support for deeper PCBA and subsystem investigations by working alongside manufacturers and technical partners when root cause needs to be pushed further.",
    },
    {
      title: "Expert Witness Support",
      description:
        "Independent technical interpretation and professional support for matters involving lighting-system failures, performance concerns, and evidence-based engineering review.",
    },
  ];

  const whoWeServe = [
    "Manufacturers",
    "Engineering teams",
    "Quality organizations",
    "Product companies",
    "Installers and field stakeholders",
    "Legal teams needing technical interpretation",
  ];

  const deliverables = [
    "Virtual technical consultation",
    "Fixture failure findings",
    "Functional test observations",
    "8D / A3-style reporting",
    "Recommended next-step actions",
    "Independent technical insight",
  ];

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  const startTransition = (id, label) => {
    setTransition({ open: true, label });
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 380);
    setTimeout(() => {
      setTransition((prev) => ({ ...prev, open: false }));
    }, 980);
  };

  return (
    <div className="min-h-screen scroll-smooth bg-[#020817] text-white">
      <AnimatePresence>
        {transition.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(18,74,165,0.22),rgba(1,6,23,0.96)_52%,rgba(1,6,23,1)_100%)] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5 px-6 text-center"
            >
              <div className="rounded-[2rem] border border-cyan-400/20 bg-white/5 p-6 shadow-[0_0_80px_rgba(56,189,248,0.14)]">
                <FullLogo className="w-[240px] md:w-[320px]" />
              </div>
              <div className="text-sm text-slate-300">{transition.label}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.13),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.9),transparent_32%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button
            onClick={() => startTransition("top", "DavAri Solutions")}
            className="flex items-center gap-3 text-left"
          >
            <ShieldLogo className="h-12 w-12" />
            <div>
              <div className="text-lg font-semibold tracking-wide text-white">
                DavAri Solutions
              </div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                Engineering Insight. Strategic Solutions.
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => startTransition(item.id, item.label)}
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => startTransition("contact", "Request a Consultation")}
              className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300 hover:text-slate-950"
            >
              Request a Consultation
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
                Lighting systems consulting • Failure analysis • Functional testing
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                Independent technical support for lighting system failures,
                performance concerns, and high-stakes technical decisions.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                DavAri Solutions provides lighting-system consultation, failure
                analysis, functional testing, and disciplined reporting for
                clients who need credible technical answers, clear findings, and
                practical next-step guidance.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => startTransition("contact", "Request a Consultation")}
                  className="rounded-2xl bg-cyan-300 px-6 py-3 font-medium text-slate-950 shadow-[0_0_36px_rgba(125,211,252,0.18)] transition hover:scale-[1.02]"
                >
                  Request a Consultation
                </button>
                <button
                  onClick={() => startTransition("services", "Services")}
                  className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  Explore Services
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-slate-400">Specialty</div>
                  <div className="mt-1 text-base font-semibold">
                    Lighting system diagnostics
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-slate-400">Reporting</div>
                  <div className="mt-1 text-base font-semibold">
                    8D & A3-style documentation
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-slate-400">Positioning</div>
                  <div className="mt-1 text-base font-semibold">
                    Independent technical insight
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_55%)] blur-3xl" />
                <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(2,8,23,0.55)] backdrop-blur-sm">
                  <div className="rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-slate-950 to-slate-900 p-6">
                    <ShieldLogo className="mx-auto w-[220px] h-[220px]" />
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                      <div className="text-sm text-slate-400">Core Focus</div>
                      <div className="mt-2 text-xl font-semibold">
                        Lighting Diagnostics
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        Failure analysis, functional testing, and technical
                        interpretation for real-world lighting systems.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                      <div className="text-sm text-slate-400">Approach</div>
                      <div className="mt-2 text-xl font-semibold">
                        Structured & Practical
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        Clear findings, disciplined review, and recommendations
                        built for action instead of guesswork.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:col-span-2">
                      <div className="text-sm text-slate-400">Best Fit</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Manufacturers, engineering teams, quality organizations,
                        product companies, installers, and stakeholders who need
                        lighting-system-specific analysis they can trust.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">
                About
              </div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Built to bring clarity to lighting system problems.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                DavAri Solutions supports manufacturers, engineering teams,
                quality organizations, product companies, and other stakeholders
                dealing with lighting performance issues. Services are built
                around virtual consultation, fixture-level failure analysis,
                practical functional testing, and professional reporting that
                helps clients understand what is failing, where the likely issue
                is located, and what action should come next.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                The foundation of this work is built on hands-on experience
                within leading lighting and electrical manufacturing
                environments, including organizations such as Eaton Lighting and
                Acuity Brands.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-6">
                <div className="text-lg font-semibold">Who we serve</div>
                <div className="mt-5 grid gap-3">
                  {whoWeServe.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-900/60 px-4 py-4"
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                      <div className="text-slate-200">{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-cyan-300/15 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
                <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                  Founder Background
                </div>
                <p className="mt-4 leading-7 text-slate-300">
                  DavAri Solutions is grounded in hands-on quality, failure
                  analysis, and lighting-system experience developed across
                  major manufacturing environments, including Eaton Lighting and
                  Acuity Brands, with over ten years of overall industry
                  experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">
                Services
              </div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Technical support designed around real lighting-system issues.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_12px_40px_rgba(2,8,23,0.35)]"
                >
                  <div className="text-xl font-semibold">{service.title}</div>
                  <p className="mt-4 leading-7 text-slate-300">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">
              Process
            </div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              A disciplined process built for technical clarity.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="text-2xl font-semibold">Review</div>
              <p className="mt-4 leading-7 text-slate-300">
                Start with the reported symptom, application details, field
                behavior, and available product or fixture information.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="text-2xl font-semibold">Test & Diagnose</div>
              <p className="mt-4 leading-7 text-slate-300">
                Evaluate behavior, isolate likely failure points, identify
                anomalies, and determine what the system is telling us.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="text-2xl font-semibold">Report & Recommend</div>
              <p className="mt-4 leading-7 text-slate-300">
                Deliver clear findings through consultation notes or 8D/A3-style
                reporting and outline practical next-step actions.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-gradient-to-r from-cyan-400/8 via-white/0 to-blue-400/8 p-6">
            <div className="text-lg font-semibold">Typical deliverables</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-10 shadow-[0_18px_80px_rgba(2,8,23,0.5)]">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                  <FullLogo className="mx-auto w-[220px] md:w-[300px]" />
                </div>

                <div>
                  <div className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">
                    CONTACT{" "}
                    <span className="normal-case tracking-normal text-sm text-slate-400">
                      - info@davarisolutions.com
                    </span>
                  </div>
                  <h2 className="text-3xl font-semibold md:text-4xl">
                    Bring the issue forward. Get a technical read on what comes next.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                    DavAri Solutions is positioned for clients who need credible
                    quality/failure insight, disciplined review, and a
                    professional path forward for lighting-system-related
                    concerns.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="mailto:info@davarisolutions.com"
                      className="rounded-2xl bg-cyan-300 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
                    >
                      Email DavAri Solutions
                    </a>
                    <button
                      onClick={() => startTransition("services", "Services")}
                      className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300"
                    >
                      Review Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
