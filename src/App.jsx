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

function DownloadCIFButton({ variant = "primary" }) {
  const baseClass =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-medium transition hover:scale-[1.02]";
  const styleClass =
    variant === "primary"
      ? "bg-cyan-300 text-slate-950 shadow-[0_0_36px_rgba(125,211,252,0.18)]"
      : "border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 hover:bg-cyan-300 hover:text-slate-950";

  return (
    <a
      href="/DavAri_Intake_Form_Rev2.pdf"
      download
      className={`${baseClass} ${styleClass}`}
    >
      Download Customer Intake Form (CIF)
    </a>
  );
}

function CompleteCIFButton({ onClick, variant = "primary" }) {
  const baseClass =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-medium transition hover:scale-[1.02]";
  const styleClass =
    variant === "primary"
      ? "bg-cyan-300 text-slate-950 shadow-[0_0_36px_rgba(125,211,252,0.18)]"
      : "border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 hover:bg-cyan-300 hover:text-slate-950";

  return (
    <button type="button" onClick={onClick} className={`${baseClass} ${styleClass}`}>
      Complete Customer Intake Form (CIF)
    </button>
  );
}

const initialCifData = {
  companyName: "",
  contactName: "",
  preferredContact: "Email",
  email: "",
  phone: "",
  fixtureManufacturer: "",
  fixtureType: "",
  fixtureModel: "",
  fixtureInputVoltage: "",
  ipRating: "",
  controlType: "",
  controlModel: "",
  mountingType: "",
  driverManufacturer: "",
  driverOutputType: "",
  driverModel: "",
  driverOutput: "",
  driverInputVoltage: "",
  outputsPerDriver: "",
  dimmingMethod: "",
  ledForwardVoltage: "",
  currentLimiting: "",
  applicationConditions: [],
  dailyHours: "",
  geographicLocation: "",
  issueTypes: [],
  issueOther: "",
  dateFirstObserved: "",
  failureRate: "",
  repeatable: "",
  detailedDescription: "",
  electricalInputVoltage: "",
  groundingCondition: "",
  lineFrequency: "",
  recentElectricalEvents: [],
  surgeProtection: "",
  labTesting: "",
  labResults: "",
  replacementInstalled: "",
  replacementResults: "",
  requestedServices: [],
  expectedTurnaround: "",
  priority: "",
  additionalNotes: "",
};

const voltageOptions = ["120V", "277V", "347V", "480V", "Universal 120-277V", "Unknown", "Other"];
const recentElectricalEventOptions = ["None", "Power Surge", "Power Outage", "Storm / Lightning", "Breaker Trip", "Generator / Transfer Event", "Recent Electrical Work", "Control System Change", "Unknown", "Other"];

function Field({ label, name, value, onChange, required = false, type = "text", placeholder = "" }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">
        {label}{required && <span className="text-cyan-300"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">
        {label}{required && <span className="text-cyan-300"> *</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, name, value, onChange, required = false, rows = 4, placeholder = "" }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">
        {label}{required && <span className="text-cyan-300"> *</span>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
      />
    </label>
  );
}

function CheckboxGroup({ label, name, values, onChange, options, required = false }) {
  const toggle = (option) => {
    const next = values.includes(option)
      ? values.filter((value) => value !== option)
      : [...values, option];
    onChange(name, next);
  };

  return (
    <div>
      <div className="text-sm text-slate-300">
        {label}{required && <span className="text-cyan-300"> *</span>}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40">
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggle(option)}
              className="h-4 w-4 accent-cyan-300"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

function IntakeWorkflow({ onBack }) {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(initialCifData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === "#cif") {
        setStarted(false);
        setPage(0);
        setErrors({});
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const pageMatch = hash.match(/^#cif-page-(\d)$/);
      if (pageMatch) {
        const nextPage = Math.min(2, Math.max(0, Number(pageMatch[1]) - 1));
        setStarted(true);
        setPage(nextPage);
        setErrors({});
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    handlePopState();
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pushCifHistory = (nextPage, nextStarted = true) => {
    const nextHash = nextStarted ? `#cif-page-${nextPage + 1}` : "#cif";
    if (window.location.hash !== nextHash) {
      window.history.pushState({ view: "cif", page: nextStarted ? nextPage : null }, "", nextHash);
    }
  };

  const update = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const pageRequired = [
    ["companyName", "contactName", "email", "phone", "fixtureManufacturer", "fixtureType", "fixtureModel", "fixtureInputVoltage", "driverManufacturer", "driverOutputType", "driverModel", "driverInputVoltage"],
    ["applicationConditions", "issueTypes", "dateFirstObserved", "repeatable", "detailedDescription", "electricalInputVoltage"],
    ["labTesting", "replacementInstalled", "requestedServices", "expectedTurnaround", "priority"],
  ];

  const labelMap = {
    companyName: "Company Name",
    contactName: "Contact Name",
    email: "Email",
    phone: "Phone",
    fixtureManufacturer: "Fixture Manufacturer",
    fixtureType: "Fixture Type",
    fixtureModel: "Fixture Model",
    fixtureInputVoltage: "Fixture Input Voltage",
    driverManufacturer: "Driver Manufacturer",
    driverOutputType: "Driver Output Type",
    driverModel: "Driver Model",
    driverInputVoltage: "Driver Input Voltage",
    applicationConditions: "Application Conditions",
    issueTypes: "Issue Type",
    dateFirstObserved: "Date First Observed",
    repeatable: "Repeatable",
    detailedDescription: "Detailed Description",
    electricalInputVoltage: "Electrical Input Voltage",
    requestedServices: "Requested Services",
    expectedTurnaround: "Expected Turnaround Time",
    priority: "Priority",
    labTesting: "Lab Testing",
    replacementInstalled: "Replacement Installed",
  };

  const isEmpty = (value) => Array.isArray(value) ? value.length === 0 : !String(value || "").trim();

  const validatePage = (targetPage = page) => {
    const missing = {};
    pageRequired[targetPage].forEach((field) => {
      if (isEmpty(data[field])) missing[field] = true;
    });
    setErrors(missing);
    const firstMissing = Object.keys(missing)[0];
    if (firstMissing) {
      setTimeout(() => document.getElementById(firstMissing)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return false;
    }
    return true;
  };

  const nextPage = () => {
    if (validatePage(page)) {
      const next = Math.min(2, page + 1);
      setPage(next);
      pushCifHistory(next, true);
      setErrors({});
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  const previousPage = () => {
    const previous = Math.max(0, page - 1);
    setPage(previous);
    pushCifHistory(previous, true);
    setErrors({});
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const submitForm = () => {
    if (!validatePage(2)) return;

    const submittedDate = new Date().toLocaleDateString();
    const body = `DavAri Solutions Customer Intake Form (CIF)\n\nSubmitted Date: ${submittedDate}\n\nCLIENT INFORMATION\nCompany Name: ${data.companyName}\nContact Name: ${data.contactName}\nPreferred Contact: ${data.preferredContact}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nFIXTURE & CONTROL DETAILS\nManufacturer: ${data.fixtureManufacturer}\nFixture Type: ${data.fixtureType}\nModel: ${data.fixtureModel}\nInput Voltage: ${data.fixtureInputVoltage}\nIP Rating: ${data.ipRating}\nControl Type: ${data.controlType}\nControl Model: ${data.controlModel}\nMounting Type: ${data.mountingType}\n\nDRIVER INFORMATION\nManufacturer: ${data.driverManufacturer}\nOutput Type: ${data.driverOutputType}\nModel: ${data.driverModel}\nOutput Current/Voltage: ${data.driverOutput}\nInput Voltage: ${data.driverInputVoltage}\n# of Outputs per Driver: ${data.outputsPerDriver}\nDimming Method: ${data.dimmingMethod}\nLED Forward Voltage: ${data.ledForwardVoltage}\nCurrent Limiting on LED Load: ${data.currentLimiting}\n\nAPPLICATION / ENVIRONMENT\nApplication Conditions: ${data.applicationConditions.join(", ")}\nDaily Hours of Operation: ${data.dailyHours}\nGeographic Location: ${data.geographicLocation}\n\nISSUE DESCRIPTION\nIssue Types: ${data.issueTypes.join(", ")}${data.issueOther ? `, Other: ${data.issueOther}` : ""}\nDate First Observed: ${data.dateFirstObserved}\nFailure Rate: ${data.failureRate}\nRepeatable: ${data.repeatable}\nDetailed Description: ${data.detailedDescription}\n\nELECTRICAL & INSTALLATION\nInput Voltage: ${data.electricalInputVoltage}\nGrounding Condition: ${data.groundingCondition}\nLine Frequency: ${data.lineFrequency}\nRecent Electrical Events: ${data.recentElectricalEvents.join(", ")}\nSurge Protection: ${data.surgeProtection}\n\nTESTING & TROUBLESHOOTING\nLab Testing: ${data.labTesting}\nLab Results: ${data.labResults}\nReplacement Installed: ${data.replacementInstalled}\nReplacement Results: ${data.replacementResults}\n\nREQUESTED SERVICES\n${data.requestedServices.join(", ")}\nExpected Turnaround: ${data.expectedTurnaround}\nPriority: ${data.priority}\nAdditional Notes: ${data.additionalNotes}\n\nNote: This website form does not store responses. Please attach photos, labels, test data, or supporting files directly to this email before sending.`;

    const mailto = `mailto:info@davarisolutions.com?subject=${encodeURIComponent(`DavAri CIF Submission - ${data.companyName}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const ErrorText = ({ name }) => errors[name] ? <div className="mt-2 text-sm text-cyan-200">Required before continuing.</div> : null;
  const fieldWrap = (name, child) => <div id={name} className={errors[name] ? "rounded-2xl border border-cyan-300/50 p-2" : ""}>{child}<ErrorText name={name} /></div>;

  if (!started) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 shadow-[0_18px_80px_rgba(2,8,23,0.5)] md:p-12">
          <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">Customer Intake Workflow</div>
          <h1 className="text-3xl font-semibold md:text-5xl">Complete Customer Intake Form (CIF)</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            The CIF captures the key fixture, driver, application, issue, and requested service details DavAri Solutions needs to review a lighting performance or failure concern.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-lg font-semibold">3 short pages</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Client and product details, application and issue details, then testing and service request details.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-lg font-semibold">10–15 minutes</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Most clients can complete it in one sitting if fixture and issue information is available.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-lg font-semibold">No saved progress</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">This form does not store information. If you leave or refresh, the form will not be saved.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => { setStarted(true); setPage(0); pushCifHistory(0, true); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); }} className="rounded-2xl bg-cyan-300 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]">Start CIF</button>
            <button onClick={onBack} className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300">Back to Website</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Customer Intake Form</div>
          <div className="mt-2 text-2xl font-semibold">Page {page + 1} of 3</div>
          <p className="mt-2 text-sm text-slate-400">Required fields are marked with an asterisk. Missing required fields will be highlighted before you can continue.</p>
        </div>
        <button onClick={onBack} className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300">Back to Website</button>
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_80px_rgba(2,8,23,0.45)] md:p-8">
        {page === 0 && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Client Information</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("companyName", <Field label="Company Name" name="companyName" value={data.companyName} onChange={update} required />)}
                {fieldWrap("contactName", <Field label="Contact Name" name="contactName" value={data.contactName} onChange={update} required />)}
                <SelectField label="Preferred Contact" name="preferredContact" value={data.preferredContact} onChange={update} options={["Email", "Phone", "Either"]} />
                {fieldWrap("email", <Field label="Email" name="email" type="email" value={data.email} onChange={update} required />)}
                {fieldWrap("phone", <Field label="Phone" name="phone" type="tel" value={data.phone} onChange={update} required />)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Fixture & Control Details</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("fixtureManufacturer", <Field label="Fixture Manufacturer" name="fixtureManufacturer" value={data.fixtureManufacturer} onChange={update} required />)}
                {fieldWrap("fixtureType", <SelectField label="Fixture Type" name="fixtureType" value={data.fixtureType} onChange={update} required options={["Troffer", "Panel", "Downlight", "Linear", "High Bay", "Area/Site", "Wall Pack", "Flood", "Emergency", "Decorative", "Other"]} />)}
                {fieldWrap("fixtureModel", <Field label="Fixture Model" name="fixtureModel" value={data.fixtureModel} onChange={update} required />)}
                {fieldWrap("fixtureInputVoltage", <SelectField label="Input Voltage" name="fixtureInputVoltage" value={data.fixtureInputVoltage} onChange={update} required options={voltageOptions} />)}
                <SelectField label="IP Rating" name="ipRating" value={data.ipRating} onChange={update} options={["Indoor/Not Rated", "IP20", "IP40", "IP54", "IP65", "IP66", "IP67", "Unknown"]} />
                <SelectField label="Control Type" name="controlType" value={data.controlType} onChange={update} options={["None", "0-10V", "DALI", "DMX", "Phase Dimming", "Wireless", "Sensor", "Networked Controls", "Unknown", "Other"]} />
                <Field label="Control Model" name="controlModel" value={data.controlModel} onChange={update} />
                <SelectField label="Mounting Type" name="mountingType" value={data.mountingType} onChange={update} options={["Recessed", "Surface", "Pendant", "Pole", "Wall", "Track", "Suspended", "Unknown", "Other"]} />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Driver Information</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("driverManufacturer", <Field label="Driver Manufacturer" name="driverManufacturer" value={data.driverManufacturer} onChange={update} required />)}
                {fieldWrap("driverOutputType", <SelectField label="Output Type" name="driverOutputType" value={data.driverOutputType} onChange={update} required options={["Constant Current (CC)", "Constant Voltage (CV)", "Programmable", "Unknown"]} />)}
                {fieldWrap("driverModel", <Field label="Driver Model" name="driverModel" value={data.driverModel} onChange={update} required />)}
                <Field label="Output Current / Voltage" name="driverOutput" value={data.driverOutput} onChange={update} placeholder="Example: 700mA or 24V" />
                {fieldWrap("driverInputVoltage", <SelectField label="Driver Input Voltage" name="driverInputVoltage" value={data.driverInputVoltage} onChange={update} required options={voltageOptions} />)}
                <Field label="# of Outputs per Driver" name="outputsPerDriver" value={data.outputsPerDriver} onChange={update} />
                <SelectField label="Dimming Method" name="dimmingMethod" value={data.dimmingMethod} onChange={update} options={["None", "0-10V", "DALI", "DMX", "Phase", "PWM", "Wireless", "Unknown", "Other"]} />
                <Field label="LED Forward Voltage (CC)" name="ledForwardVoltage" value={data.ledForwardVoltage} onChange={update} placeholder="Example: 36V, 48V, or 72V string voltage" />
                <Field label="Current Limiting on LED Load (CV)" name="currentLimiting" value={data.currentLimiting} onChange={update} placeholder="Example: Resistor, onboard LED current regulation, fuse, unknown" />
              </div>
            </section>
          </div>
        )}

        {page === 1 && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Application / Environment</h2>
              {fieldWrap("applicationConditions", <CheckboxGroup label="Application Conditions" name="applicationConditions" values={data.applicationConditions} onChange={update} required options={["Commercial", "Industrial", "Outdoor", "Retail", "Healthcare", "Residential", "High Temp", "Vibration", "Indoor", "Damp", "Wet"]} />)}
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field label="Daily Hours of Operation" name="dailyHours" value={data.dailyHours} onChange={update} placeholder="Example: 12 hours/day" />
                <Field label="Geographic Location" name="geographicLocation" value={data.geographicLocation} onChange={update} placeholder="City, State / Site Location" />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Issue Description</h2>
              {fieldWrap("issueTypes", <CheckboxGroup label="Issue (Select all that apply)" name="issueTypes" values={data.issueTypes} onChange={update} required options={["No Output", "Flicker", "Intermittent", "Dimming", "Color Shift", "Comm Failure", "Overheating", "Early Failure", "Out of Box Failure", "Clicking", "Other"]} />)}
              {data.issueTypes.includes("Other") && <div className="mt-5"><Field label="Other Issue" name="issueOther" value={data.issueOther} onChange={update} /></div>}
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("dateFirstObserved", <Field label="Date First Observed" name="dateFirstObserved" type="date" value={data.dateFirstObserved} onChange={update} required />)}
                <Field label="Failure Rate" name="failureRate" value={data.failureRate} onChange={update} placeholder="Example: 3 of 25 fixtures" />
                {fieldWrap("repeatable", <SelectField label="Repeatable" name="repeatable" value={data.repeatable} onChange={update} required options={["Yes", "No", "Unknown"]} />)}
              </div>
              <div className="mt-5">
                {fieldWrap("detailedDescription", <TextAreaField label="Detailed Description" name="detailedDescription" value={data.detailedDescription} onChange={update} required placeholder="If repeatable, describe how to reproduce. Otherwise, include all known details." />)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Electrical & Installation</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("electricalInputVoltage", <SelectField label="Input Voltage" name="electricalInputVoltage" value={data.electricalInputVoltage} onChange={update} required options={voltageOptions} />)}
                <SelectField label="Grounding Condition" name="groundingCondition" value={data.groundingCondition} onChange={update} options={["Verified Good", "Questionable", "No Ground", "Unknown"]} />
                <SelectField label="Line Frequency" name="lineFrequency" value={data.lineFrequency} onChange={update} options={["50Hz", "60Hz", "Unknown"]} />
                <CheckboxGroup label="Recent Electrical Events" name="recentElectricalEvents" values={data.recentElectricalEvents} onChange={update} options={recentElectricalEventOptions} />
                <SelectField label="Surge Protection?" name="surgeProtection" value={data.surgeProtection} onChange={update} options={["Yes", "No", "Unknown"]} />
              </div>
            </section>
          </div>
        )}

        {page === 2 && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Testing & Troubleshooting Already Performed</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("labTesting", <SelectField label="Lab Testing" name="labTesting" value={data.labTesting} onChange={update} required options={["Yes", "No", "Unknown"]} />)}
                <TextAreaField label="Lab Testing Results" name="labResults" value={data.labResults} onChange={update} rows={3} />
                {fieldWrap("replacementInstalled", <SelectField label="Replacement Installed" name="replacementInstalled" value={data.replacementInstalled} onChange={update} required options={["Yes", "No", "Unknown"]} />)}
                <TextAreaField label="Replacement Results" name="replacementResults" value={data.replacementResults} onChange={update} rows={3} />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Requested Services</h2>
              {fieldWrap("requestedServices", <CheckboxGroup label="Requested Services" name="requestedServices" values={data.requestedServices} onChange={update} required options={["Failure Analysis", "Functional Testing", "Stress Testing", "Technical Report", "Consultation", "Manufacturer Collaboration", "Expert Witness"]} />)}
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Timeline & Priority</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {fieldWrap("expectedTurnaround", <SelectField label="Expected Turnaround Time" name="expectedTurnaround" value={data.expectedTurnaround} onChange={update} required options={["Standard", "Within 1 week", "Within 2 weeks", "Urgent / ASAP", "Not Sure"]} />)}
                {fieldWrap("priority", <SelectField label="Priority" name="priority" value={data.priority} onChange={update} required options={["Low", "Medium", "High", "Critical"]} />)}
              </div>
              <div className="mt-5">
                <TextAreaField label="Additional Notes" name="additionalNotes" value={data.additionalNotes} onChange={update} rows={4} />
              </div>
              <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-5 text-sm leading-6 text-slate-300">
                No information is stored by this website. Submitting opens your email client with the completed CIF details. Attach photos, fixture labels, test data, or other supporting files to that email before sending.
              </div>
            </section>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex gap-3">
            {page > 0 && <button onClick={previousPage} className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300">Back</button>}
            <button onClick={onBack} className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300">Exit CIF</button>
          </div>
          {page < 2 ? (
            <button onClick={nextPage} className="rounded-2xl bg-cyan-300 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]">Next</button>
          ) : (
            <button onClick={submitForm} className="rounded-2xl bg-cyan-300 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]">Submit CIF by Email</button>
          )}
        </div>
      </div>
    </main>
  );
}


export default function App() {
  const [transition, setTransition] = useState({
    open: true,
    label: "DavAri Solutions",
  });
  const [showIntake, setShowIntake] = useState(false);

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
        "Clear Failure Analysis Report (FAR) and A3-style reporting summary that documents findings, captures the problem clearly, and helps stakeholders move toward root cause and corrective action.",
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
    "FAR / A3-style reporting",
    "Recommended next-step actions",
    "Independent technical insight",
  ];

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handlePopState = () => {
      const isCifRoute = window.location.hash === "#cif" || window.location.hash.startsWith("#cif-page-");
      setShowIntake(isCifRoute);
    };

    window.addEventListener("popstate", handlePopState);
    handlePopState();
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openIntake = () => {
    setShowIntake(true);
    if (!window.location.hash.startsWith("#cif")) {
      window.history.pushState({ view: "cif-start" }, "", "#cif");
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const closeIntake = () => {
    setShowIntake(false);
    if (window.location.hash.startsWith("#cif")) {
      window.history.pushState({}, "", window.location.pathname + window.location.search);
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

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

  if (showIntake) {
    return (
      <div className="min-h-screen scroll-smooth bg-[#020817] text-white">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.13),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.9),transparent_32%)]" />
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <button onClick={closeIntake} className="flex items-center gap-3 text-left">
              <ShieldLogo className="h-12 w-12" />
              <div>
                <div className="text-lg font-semibold tracking-wide text-white">DavAri Solutions</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400">Engineering Insight. Strategic Solutions.</div>
              </div>
            </button>
            <button onClick={closeIntake} className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300 hover:text-slate-950">Back to Website</button>
          </div>
        </header>
        <IntakeWorkflow onBack={closeIntake} />
      </div>
    );
  }

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
                    Failure Analysis Report (FAR) & A3 Summary Style documentation
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
                environments.
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
                  major manufacturing environments with over ten years of overall
                  industry experience.
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

            <div className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-gradient-to-r from-cyan-400/8 via-white/0 to-blue-400/8 p-6">
              <div className="text-lg font-semibold">Start with the intake form</div>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Complete the Customer Intake Form (CIF) online in one sitting, or download the PDF version if you prefer to complete it offline.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <CompleteCIFButton variant="secondary" onClick={openIntake} />
                <DownloadCIFButton variant="secondary" />
              </div>
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
                Deliver clear findings through consultation notes or FAR/A3-style
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
                      - info@davarisolutions.com / (770)-913-6865
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
                      Email Us
                    </a>
                    <a
                      href="tel:+17709136865"
                      className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300"
                    >
                      Call Us
                    </a>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <CompleteCIFButton variant="secondary" onClick={openIntake} />
                      <DownloadCIFButton variant="secondary" />
                    </div>
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
