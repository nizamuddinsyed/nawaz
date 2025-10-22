import { GoogleGenAI } from "@google/genai";

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

export const askAboutCv = async (question: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key is not configured. Please set the API_KEY environment variable.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful and professional assistant for Nawazuddin Sirajuddin's interactive resume. Your task is to answer questions about him based ONLY on the resume content provided below. Be concise and polite. If the answer is not in the resume, say "That information is not available in the resume." Do not make up information or answer questions not related to the resume.

--- RESUME CONTENT ---
${CV_CONTEXT}
--- END RESUME CONTENT ---

User Question: "${question}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
