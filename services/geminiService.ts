// Local resume-based Q/A responder
// This file intentionally avoids calling external LLMs. It answers questions by searching the embedded resume text.

const CV_CONTEXT = `
Nawazuddin Sirajuddin
Senior Investigator KYC AML
contact.nawazz@gmail.com | +49) 15511260049 | Sydneystraße 28, 22297, Hamburg, Germany | Indian | German

PROFESSIONAL SNAPSHOT
Results driven Compliance professional with 9 years of experience in financial crime prevention across banking and fintech. Skilled in end-to-end compliance lifecycle customer onboarding, CDD/EDD, sanctions, PEP, and adverse media screening, transaction monitoring, and suspicious activity investigation. Experienced in filing SARs/STRs and collaborating with regulators and law enforcement. Strong expertise in detecting and investigating fraud typologies including money mule, APP fraud, account takeover, chargebacks, credit card fraud, and identity theft. Proficient in Actimize, Norkom, Mantas, World-Check, LexisNexis, Dow Jones, and Refinitiv. Fluent in English with working German proficiency; seeking AML/KYC roles across Europe.

WORK EXPERIENCE

PAYPAL INDIA PRIVATE LIMITED | 08/2019 – 06/2025 | BANGALORE, INDIA
Senior Investigator KYC AML

Know Your Customer
- Conducted end-to-end onboarding and KYC reviews for global retail and corporate clients in compliance with AML/CTF regulations.
- Verified incorporation documents, ownership hierarchies, and Ultimate Beneficial Owners (UBOs) to ensure regulatory compliance and transparency.
- Performed sanctions, PEP, SDN, and blacklist screening using World-Check, LexisNexis, Dow Jones, and Refinitiv, escalating confirmed hits for Enhanced Due Diligence (EDD).
- Executed CDD and EDD for high-risk clients, assessing source of funds, source of wealth, business activity, and jurisdictional exposure.
- Reviewed complex and offshore structures to identify hidden beneficial ownership and mitigate financial crime risk.
- Maintained audit-ready due diligence records in case management systems for regulatory and internal reviews.

Transaction Monitoring
- Monitored domestic, cross-border, and crypto transactions to detect suspicious activity, unusual patterns, and high-risk typologies including layering, structuring, TBML, money mule operations, APP fraud, ATO, credit card fraud, and identity theft.
- Investigated UARs, fraud reports from card networks/fintechs, and LEA notifications, validating transactions, counterparties, and Source of Funds (SOF).
- Prepared and finalized structured SARS, STRs, and case summaries with typology classification and substantiated evidence for MLRO, FIU, and LEA review.
- Collaborated with compliance teams, operations, and law enforcement agencies to ensure timely escalation, regulatory compliance, and effective closure of alerts.

Regulatory Compliance and Process Optimization
- Ensured adherence to AML policies and international regulatory standards (FATF, BaFin, OFAC, FinCEN).
- Supported process automation and workflow enhancements, improving case turnaround and reporting accuracy.

WELLS FARGO INDIA SOLUTIONS | 07/2016 – 08/2019 | BANGALORE, INDIA
KYC Analyst

KYC Client Onboarding & Verification
- Verified identity documents and onboarding details in line with CIP, KYC, USA Patriot Act, and BSA requirements.
- Reviewed corporate ownership hierarchies and Ultimate Beneficial Ownership (UBO) disclosures for new and existing accounts.

Due Diligence & Risk Assessment
- Conducted systematic CDD/EDD using World-Check, OFAC, FinCEN, and adverse media sources.
- Assessed risk ratings considering high-risk jurisdictions, complex shareholding patterns, nominee arrangements, and shell companies.
- Reporting & Decision Support
- Prepared structured risk assessments and recommendations to support decisions on client onboarding, maintenance, or closure.
- Collaborated with internal compliance teams to ensure regulatory deadlines and quality standards were met.

EDUCATION AND TRAINING
BCOM, Bangalore University, Bangalore, India

SKILLS
Know Your Customer, Anti Money Laundering, Counter Terrorist Financing, Due Diligence, Ultimate Beneficial Owner, Transaction Monitoring, Sanctions and PEP Screening, Adverse Media, SAR Suspicious Activity Reporting, MS Office(Word, Powerpoint, Excel, Outlook)

LANGUAGE SKILLS
URDU (4/5), ENGLISH (5/5)

AWARDS
Received Multiple Achieving Excellence Awards, Received Multiple Shared Success Awards, Received Multiple Top Performer Awards
`;

const lines = CV_CONTEXT.split(/\n+/).map(l => l.trim()).filter(Boolean);

const findSection = (keyword: string) => {
  const idx = lines.findIndex(l => l.toLowerCase().includes(keyword.toLowerCase()));
  if (idx === -1) return null;
  // return up to 8 lines starting from idx
  return lines.slice(idx, idx + 8).join(' ');
};

const extractContact = () => {
  // contact is on the first line after the name/title block
  const topLines = lines.slice(0, 3).join(' ');
  const emailMatch = topLines.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  const phoneMatch = topLines.match(/\+?\d[\d\) \-]{6,}\d/);
  const addrMatch = topLines.match(/Sydneystraße[^|]*/i);
  const parts = [] as string[];
  if (emailMatch) parts.push(`Email: ${emailMatch[0]}`);
  if (phoneMatch) parts.push(`Phone: ${phoneMatch[0]}`);
  if (addrMatch) parts.push(`Address: ${addrMatch[0].trim()}`);
  return parts.join(' | ') || topLines;
};

const formatAnswer = (text: string): string => {
  // Remove excess whitespace and limit length
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length > 200) {
    return cleaned.slice(0, 197) + '...';
  }
  return cleaned;
};

const searchByKeywords = (question: string) => {
  const q = question.toLowerCase();
  
  // Current role/title
  if (/current|role|title|position|job/i.test(q)) {
    return "💼 Senior Investigator KYC AML at PayPal, leading financial crime prevention initiatives.";
  }

  // Contact info
  if (/contact|email|phone|address|reach/i.test(q)) {
    const contact = extractContact();
    return "📱 " + contact;
  }

  // Education
  if (/education|degree|university|training/i.test(q)) {
    return "🎓 Bachelor of Commerce (BCOM) from Bangalore University, India";
  }

  // Skills based on context
  if (/skill|skills|competenc/i.test(q)) {
    if (q.includes('technical') || q.includes('tool')) {
      return "🛠️ Proficient in: World-Check, LexisNexis, Actimize, Dow Jones, and modern case management systems";
    }
    if (q.includes('fraud') || q.includes('investigation')) {
      return "🔍 Expert in: Fraud detection, suspicious activity investigation, SAR/STR reporting, and regulatory compliance";
    }
    return "🎯 Core skills: KYC/CDD/EDD processes, AML/CTF compliance, transaction monitoring, and risk assessment";
  }

  // Languages
  if (/language|speak|proficiency/i.test(q)) {
    return "🗣️ Languages: English (fluent), Urdu (professional), German (working proficiency)";
  }

  // Tools & platforms
  if (/tool|platform|software|system/i.test(q)) {
    return "⚙️ Key tools: World-Check, LexisNexis, Dow Jones, Refinitiv, Actimize, and compliance platforms";
  }

  // Experience summary
  if (/experience|year|summary|overview/i.test(q)) {
    return "📊 9 years in financial crime prevention across banking and fintech. Specialized in KYC/AML, transaction monitoring, and fraud prevention.";
  }

  // PayPal experience
  if (/paypal/i.test(q)) {
    if (q.includes('responsibility') || q.includes('duty')) {
      return "📋 At PayPal: Led KYC reviews, managed transaction monitoring, conducted EDD for high-risk clients, and prepared regulatory reports.";
    }
    return "🏢 PayPal (2019-2025): Senior Investigator focusing on KYC/AML, sanctions screening, and financial crime prevention.";
  }

  // Wells Fargo experience
  if (/wells|fargo/i.test(q)) {
    return "🏦 Wells Fargo (2016-2019): KYC Analyst handling client verification, due diligence, and risk assessments.";
  }

  // Screening & monitoring
  if (/screen|monitor|surveillance/i.test(q)) {
    return "🔍 Expert in sanctions screening, PEP checks, and transaction monitoring using industry-leading tools.";
  }

  // Regulatory & compliance
  if (/regulat|compliance|policy/i.test(q)) {
    return "📜 Well-versed in FATF, BaFin, OFAC, and FinCEN regulations. Strong focus on AML/CTF compliance.";
  }

  // Awards & recognition
  if (/award|achievement|recognition/i.test(q)) {
    return "🏆 Received multiple Excellence Awards and Top Performer recognition for outstanding contributions.";
  }

  // Certification & qualifications
  if (/certifi|qualifi/i.test(q)) {
    return "📋 BCOM degree with extensive practical experience in financial crime prevention and compliance.";
  }

  // Location & availability
  if (/location|based|available/i.test(q)) {
    return "📍 Based in Hamburg, Germany. Open to AML/KYC roles across Europe.";
  }

  // Fallback search in CV text
  const tokens = Array.from(new Set(question.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 3)));
  if (tokens.length) {
    const matched = lines.filter(l => tokens.some(t => l.toLowerCase().includes(t))).slice(0, 3);
    if (matched.length) {
      return "📝 " + formatAnswer(matched.join(' '));
    }
  }

  return "I can only answer questions based on information available in the resume. Could you try rephrasing your question?";
};

export const askAboutCv = async (question: string): Promise<string> => {
  if (!question || question.trim().length === 0) return "Please ask a question about the resume.";
  try {
    const answer = searchByKeywords(question);
    if (answer) return answer;
    return "That information is not available in the resume.";
  } catch (err) {
    console.error('Resume responder error:', err);
    return "Sorry, I encountered an error while processing your request.";
  }
};
