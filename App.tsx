import React, { useState, useEffect } from 'react';
import type { WorkExperience, Education, Language } from './types';
import { MailIcon, PhoneIcon, MapPinIcon, AwardIcon, BotIcon, BriefcaseIcon, GraduationCapIcon, MenuIcon, XIcon, EyeIcon, AlertTriangleIcon, ShieldCheckIcon, ArrowUpIcon, SunIcon, MoonIcon } from './components/Icons';
import { AIChatBot } from './components/AIChatBot';

// Data from CV
const professionalSnapshot = "Results driven Compliance professional with 9 years of experience in financial crime prevention across banking and fintech. Skilled in end-to-end compliance lifecycle customer onboarding, CDD/EDD, sanctions, PEP, and adverse media screening, transaction monitoring, and suspicious activity investigation. Experienced in filing SARs/STRs and collaborating with regulators and law enforcement. Strong expertise in detecting and investigating fraud typologies. Fluent in English with working German proficiency; seeking AML/KYC roles across Europe.";
const workExperiences: WorkExperience[] = [
  { company: 'PAYPAL INDIA PRIVATE LIMITED', role: 'Senior Investigator KYC AML', period: '08/2019 – 06/2025', location: 'BANGALORE, INDIA', sections: [{ title: 'Key Responsibilities', tasks: ['Conducted end-to-end onboarding and KYC reviews for global retail and corporate clients.', 'Performed sanctions, PEP, SDN, and blacklist screening using World-Check, LexisNexis, etc.', 'Executed CDD and EDD for high-risk clients, assessing source of funds, wealth, and business activity.', 'Monitored transactions to detect suspicious activity like layering, structuring, and fraud.', 'Prepared and finalized structured SARS, STRs for MLRO, FIU, and LEA review.', 'Ensured adherence to AML policies and international standards (FATF, BaFin, OFAC, FinCEN).'] }] },
  { company: 'WELLS FARGO INDIA SOLUTIONS', role: 'KYC Analyst', period: '07/2016 – 08/2019', location: 'BANGALORE, INDIA', sections: [{ title: 'Key Responsibilities', tasks: ['Verified identity documents and onboarding details in line with CIP, KYC, and BSA requirements.', 'Reviewed corporate ownership hierarchies and UBO disclosures.', 'Conducted systematic CDD/EDD using World-Check, OFAC, and adverse media sources.', 'Assessed risk ratings for high-risk jurisdictions, complex shareholding patterns, and shell companies.'] }] },
];
const education: Education = { degree: 'BCOM', institution: 'Bangalore University', location: 'Bangalore, India' };
const skills: string[] = ['KYC/CDD/EDD', 'AML/CTF', 'Transaction Monitoring', 'Sanctions & PEP Screening', 'SAR/STR Reporting', 'Risk Assessment', 'Fraud Detection', 'Compliance', 'World-Check', 'LexisNexis', 'BaFin', 'EU 6AMLD',
'FATF', 'FinCEN', 'OFAC'];
const tools: string[] = ['ComplyAdvantage', 'Chainalysis', 'Feedzai', 'Actimize', 'Refinitiv (World-Check)', 'Digital IDV Solutions (Onfido, Veriff)', 'SQL & Python', 'Modern Case Mgmt. Platforms'];
const languages: Language[] = [{ name: 'English', level: 5 }, { name: 'Hindi', level: 4 }, { name: 'German', level: 2 }];
const awards: string[] = ['Multiple Achieving Excellence Awards', 'Multiple Shared Success Awards', 'Multiple Top Performer Awards'];
const navLinks = [{ href: '#about', label: 'About' }, { href: '#experience', label: 'Experience' }, { href: '#insights', label: 'Insights' }, { href: '#skills', label: 'Skills' }, { href: '#contact', label: 'Contact' }];

const finCrimeInsights = [
    { category: 'Neobanks (Revolut, N26)', painPoints: ['Balancing hyper-growth with robust KYC, risking synthetic identity and mule account proliferation.', 'Managing diverse AML/fraud risks across a wide product ecosystem (crypto, payments, trading).', 'Navigating intense regulatory scrutiny (e.g., from BaFin) to enhance compliance controls.'], solutions: ['Implement dynamic, automated KYC workflows that escalate to manual EDD based on real-time risk signals.', 'Develop a 360-degree customer risk profile, consolidating data across all products to detect complex laundering typologies.', 'Leverage my SAR/STR expertise to build automated reporting systems that ensure timely and accurate filings to FIUs.'] },
    { category: 'Cross-Border Payments (Wise)', painPoints: ['Navigating a complex web of differing AML/CTF regulations and sanctions lists across numerous payment corridors.', 'Detecting illicit funds masked as legitimate trade (TBML) in high-volume, low-value transactions.'], solutions: ['Enhance screening logic by layering global sanctions lists with national/regional lists, tailored to each payment corridor\'s risk profile.', 'Design advanced transaction monitoring rules to flag TBML red flags, like unusual payment patterns and high-risk jurisdictions.'] },
    { category: 'Payment Processors (Stripe)', painPoints: ['Onboarding potentially fraudulent businesses or shell companies that exploit the platform for transaction laundering.', 'Combating sophisticated fraud schemes, including merchant account takeovers and collusion.'], solutions: ['Augment standard merchant due diligence with deep dives into online presence and corporate structures to mitigate shell company risks.', 'Build collaborative fraud prevention frameworks that link disparate data points to identify and dismantle collusive fraud networks.'] }
];

// Helper for smooth scrolling
const handleNavLinkClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

type Theme = 'light' | 'dark';

// Components
const Header = ({ onMenuClick, activeSection, theme, onThemeToggle }: { onMenuClick: () => void; activeSection: string; theme: Theme; onThemeToggle: () => void; }) => (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-50/80 dark:bg-slate-900/60 backdrop-blur-sm border-b border-gray-200/80 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <a href="#" onClick={(e) => handleNavLinkClick('hero', e)} className="text-2xl font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-500 transition-colors">NS.</a>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={(e) => handleNavLinkClick(link.href.substring(1), e)} className={`text-sm font-medium transition-colors cursor-pointer ${activeSection === link.href.substring(1) ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'}`}>
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <button onClick={onThemeToggle} className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
                    </button>
                    <div className="md:hidden">
                        <button onClick={onMenuClick} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                            <MenuIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

const MobileMenu = ({ isOpen, onClose, activeSection }: { isOpen: boolean; onClose: () => void; activeSection: string; }) => (
    <div className={`fixed inset-0 z-50 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-sm md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex justify-end p-4">
            <button onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                <XIcon className="w-7 h-7"/>
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
            {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => { handleNavLinkClick(link.href.substring(1), e); onClose(); }} className={`text-2xl font-medium transition-colors ${activeSection === link.href.substring(1) ? 'text-teal-600 dark:text-teal-400' : 'text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400'}`}>{link.label}</a>
            ))}
        </nav>
    </div>
);

const Section: React.FC<{id: string, children: React.ReactNode, className?: string}> = ({id, children, className=""}) => (
    <section id={id} className={`py-16 sm:py-24 scroll-mt-16 ${className}`}>
        {children}
    </section>
);

const ExperienceCard: React.FC<{ job: WorkExperience; isLast: boolean }> = ({ job, isLast }) => (
    <div className="relative pl-8 animate-fadeInUp">
        <div className="absolute left-0 top-1 w-4 h-4 bg-teal-500 rounded-full border-4 border-gray-50 dark:border-slate-900"></div>
        {!isLast && <div className="absolute left-[7px] top-5 h-full w-0.5 bg-gray-200 dark:bg-slate-700"></div>}
        
        <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h4>
                    <p className="text-md font-medium text-teal-600 dark:text-teal-400">{job.company}</p>
                </div>
                <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 mt-2 sm:mt-0 flex-shrink-0 sm:ml-4">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 mt-4">
                {job.sections[0].tasks.map((task, index) => (
                  <li key={index} className="animate-staggeredFadeInUp" style={{animationDelay: `${index * 100}ms`}}>{task}</li>
                ))}
            </ul>
        </div>
    </div>
);

const FinCrimeInsightsSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Section id="insights">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Strategic FinCrime Insights</h3>
                <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
                    An analysis of common financial crime challenges faced by industry leaders and strategic solutions based on 9 years of hands-on experience.
                </p>
            </div>

            <div className="flex flex-col items-center">
                <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-2 rounded-lg shadow-sm">
                    {finCrimeInsights.map((insight, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${activeTab === index ? 'bg-teal-500 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                        >
                            {insight.category}
                        </button>
                    ))}
                </div>

                <div className="w-full max-w-4xl">
                    {finCrimeInsights.map((insight, index) => (
                        <div key={index} className={`animate-fadeInUp ${activeTab === index ? 'block' : 'hidden'}`}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
                                    <h4 className="flex items-center gap-3 text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                        <AlertTriangleIcon className="w-6 h-6 text-amber-500" />
                                        Industry Pain Points
                                    </h4>
                                    <ul className="space-y-3">
                                        {insight.painPoints.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 animate-staggeredFadeInUp" style={{animationDelay: `${i * 100}ms`}}>
                                                <span className="text-amber-500 mt-1">&bull;</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
                                    <h4 className="flex items-center gap-3 text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                        <ShieldCheckIcon className="w-6 h-6 text-teal-500" />
                                        My Proposed Solutions
                                    </h4>
                                    <ul className="space-y-3">
                                        {insight.solutions.map((solution, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 animate-staggeredFadeInUp" style={{animationDelay: `${i * 100}ms`}}>
                                                <span className="text-teal-500 mt-1">&bull;</span>
                                                <span>{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

interface LanguageBarProps {
    name: string;
    level: number;
}

const LanguageBar: React.FC<LanguageBarProps> = ({ name, level }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${(level / 5) * 100}%` }}></div>
        </div>
    </div>
);

const SkillsBentoGrid = () => (
    <Section id="skills">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-sm animate-fadeInUp">
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Core Competencies</h4>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                        <span key={skill} className="bg-teal-50 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-sm font-medium px-3 py-1.5 rounded-md animate-staggeredFadeInUp" style={{animationDelay: `${i * 50}ms`}}>{skill}</span>
                    ))}
                </div>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-sm animate-fadeInUp" style={{animationDelay: '100ms'}}>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Awards</h4>
                <ul className="space-y-2">
                    {awards.map((award, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 animate-staggeredFadeInUp" style={{animationDelay: `${i * 100}ms`}}>
                            <AwardIcon className="w-4 h-4 text-teal-500 flex-shrink-0" />
                            <span>{award}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-sm animate-fadeInUp" style={{animationDelay: '200ms'}}>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Languages</h4>
                <div className="space-y-4">
                    {languages.map((lang, i) => (
                        <LanguageBar 
                            key={i} 
                            name={lang.name} 
                            level={lang.level} 
                        />
                    ))}
                </div>
            </div>
            <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-sm animate-fadeInUp" style={{animationDelay: '300ms'}}>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Tools & Technologies</h4>
                 <div className="flex flex-wrap gap-2">
                    {tools.map((tool, i) => (
                        <span key={tool} className="bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium px-3 py-1.5 rounded-md animate-staggeredFadeInUp" style={{animationDelay: `${i * 50}ms`}}>{tool}</span>
                    ))}
                </div>
            </div>
        </div>
    </Section>
);

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const handleThemeToggle = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);

            const scrollPosition = window.scrollY + window.innerHeight / 2;
            let currentSectionId = '';
            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    currentSectionId = section.id;
                    break;
                }
            }
            if (!currentSectionId && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                currentSectionId = 'contact';
            }
            setActiveSection(currentSectionId);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                isMenuOpen && setIsMenuOpen(false);
                isChatOpen && setIsChatOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen, isChatOpen]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
    <div className="bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Header onMenuClick={() => setIsMenuOpen(true)} activeSection={activeSection} theme={theme} onThemeToggle={handleThemeToggle}/>
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeSection={activeSection} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <Section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center">
                <div className="animate-fadeInUp max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white !leading-tight">
                        Nawazuddin Sirajuddin
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-semibold text-teal-600 dark:text-teal-400 mt-3">
                        Senior Investigator, Financial Crime Prevention
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-6 max-w-3xl mx-auto leading-relaxed">
                       A dedicated professional with 9 years of experience in safeguarding financial systems across banking and fintech.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#contact" onClick={(e) => handleNavLinkClick('contact', e)} className="w-full sm:w-auto bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Get In Touch
                        </a>
                        <a href="https://drive.google.com/file/d/1NH434yYX7RBIwfOaYzZl0bL67fsDWn92/view" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 font-semibold px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-500 transition-all">
                            <EyeIcon className="w-5 h-5"/>
                            View CV
                        </a>
                    </div>
                </div>
            </Section>
            
            <Section id="about">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="animate-fadeInUp">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About Me</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-left sm:text-center">{professionalSnapshot}</p>
                    </div>
                </div>
            </Section>
            
            <Section id="experience">
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Work Experience</h3>
                <div className="relative max-w-3xl mx-auto space-y-12">
                    {workExperiences.map((job, index) => <ExperienceCard key={index} job={job} isLast={index === workExperiences.length - 1} />)}
                </div>
            </Section>
            
            <FinCrimeInsightsSection />

            <SkillsBentoGrid />

            <Section id="contact">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">I'm currently seeking new opportunities in AML/KYC roles across Europe. Feel free to reach out if you'd like to connect.</p>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4">
                        <a href="mailto:contact.nawazz@gmail.com" className="flex items-center gap-3 group text-base sm:text-lg">
                          <MailIcon className="w-6 h-6 text-gray-400 dark:text-slate-500 group-hover:text-teal-500 transition-colors" />
                          <span className="text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">contact [dot] nawazz [at] gmail [dot] com</span>
                        </a>
                        <div className="flex items-center gap-3 text-base sm:text-lg">
                          <PhoneIcon className="w-6 h-6 text-gray-400 dark:text-slate-500" />
                          <span className="text-slate-700 dark:text-slate-300">+49 15511260049</span>
                        </div>
                        <div className="flex items-center gap-3 text-base sm:text-lg">
                          <MapPinIcon className="w-6 h-6 text-gray-400 dark:text-slate-500" />
                          <span className="text-slate-700 dark:text-slate-300">Hamburg, Germany</span>
                        </div>
                    </div>
                </div>
            </Section>
        </main>

        <footer className="text-center py-8 text-sm text-slate-500 dark:text-slate-400 border-t border-gray-200 dark:border-slate-800 mt-16">
            <p>&copy; {new Date().getFullYear()} Nawazuddin Sirajuddin. All Rights Reserved.</p>
        </footer>
        
        <div className={`fixed bottom-20 right-6 sm:bottom-6 z-50 transition-transform duration-300 ${isChatOpen ? 'scale-0' : 'scale-100'}`}>
            <button onClick={() => setIsChatOpen(true)} className="bg-teal-500 text-white rounded-full p-4 shadow-xl hover:bg-teal-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900" aria-label="Open AI Assistant">
                <BotIcon className="w-8 h-8" />
            </button>
        </div>

        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
             <AIChatBot onClose={() => setIsChatOpen(false)} />
        </div>

        <button 
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-50 bg-teal-500/80 backdrop-blur-sm text-white rounded-full p-3 shadow-xl hover:bg-teal-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
    </div>
  );
};

export default App;