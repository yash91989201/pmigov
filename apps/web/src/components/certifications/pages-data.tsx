type CertificationPageType = {
	slug: string;
	maintainingCertification: {
		title: string;
		description: string;
		activities: string[];
		ctaText: string;
		ctaHref: string;
	};
	hero: {
		breadcrumb: { label: string; href?: string }[];
		certificationBadge: string;
		title: string;
		subtitle: string;
		description: string;
		pricing: {
			memberPrice: string;
			fullPrice: string;
		};
		applyButtonText: string;
		applyButtonHref: string;
		note: string;
		membershipLink: {
			text: string;
			href: string;
		};
		shapeImage: string;
		logoImage: string;
		logoAlt: string;
	};
	isRightForYou: {
		title: string;
		description: string;
		roles: string[];
		stats: {
			value: string;
			label: string;
			source?: string;
			sourceUrl?: string;
		}[];
	};
	examContentOutline: {
		title: string;
		description: string;
		languages: string[];
		downloadUrl: string;
	};
	aboutExam: {
		title: string;
		length: string;
		time: string;
		languages: string[];
	};
	pathToCertification: {
		title: string;
		steps: { number: number; label: string }[];
		tabs: {
			heading: string;
			sections: {
				title: string;
				content: string[];
				links?: { text: string; href: string }[];
				button?: { text: string; href: string };
			}[];
			note?: string;
		}[];
		faqsLink: { text: string; href: string };
	};
	examPrep: {
		title: string;
		description: string;
		ctaText: string;
		ctaHref: string;
		courses: {
			title: string;
			description: string;
			tags: string[];
			provider?: string;
			learnMoreHref: string;
			colorTheme: "blue" | "gold";
			image?: string;
		}[];
	};
};

export const certificationPagesData: CertificationPageType[] = [
	{
		slug: "certified-associate-in-project-management-capm",
		maintainingCertification: {
			title: "Maintaining your CAPM certification",
			description:
				"Earning your CAPM certification is a big achievement—we're here to help you maintain it. Continuous skill growth that extends beyond certification is critical to fueling your career and your impact. CAPM certification holders need to earn 15 Professional Development Units (PDUs) in each 3-year cycle to maintain certification. Each PDU represents one hour spent:",
			activities: [
				"Learning",
				"Teaching others",
				"Presenting",
				"Reading",
				"Volunteering",
				"Content creating",
			],
			ctaText: "Learn More about Maintaining",
			ctaHref: "/maintaining-certification",
		},
		hero: {
			breadcrumb: [
				{ label: "Home", href: "/" },
				{ label: "Certifications", href: "/certifications" },
				{ label: "Certified Associate in Project Management (CAPM)®" },
			],
			certificationBadge: "Certification",
			title: "Certified Associate in Project Management (CAPM)®",
			subtitle: "No experience required",
			description:
				"Show the world that you possess the foundational knowledge and skills that project teams demand. The CAPM proves that you're ready to take on a wide range of projects—with ways of working that include predictive project management, agile principles and business analysis.",
			pricing: {
				memberPrice: "₹14694",
				fullPrice: "₹19530",
			},
			applyButtonText: "Apply Now",
			applyButtonHref: "/apply/capm",
			note: "Exam fee will only be required after your application has been accepted and you are ready to schedule your exam.",
			membershipLink: {
				text: "Learn More About Membership",
				href: "/membership",
			},
			shapeImage: "/assets/shared/shape-circle.webp",
			logoImage: "/assets/shared/capm-logo.svg",
			logoAlt: "CAPM Certification Logo",
		},
		isRightForYou: {
			title: "Is a CAPM right for you?",
			description:
				"The CAPM certification is ideal for aspiring project managers and team members who want to demonstrate their commitment to the profession and stand out in the job market.",
			roles: [
				"Assistant Project Manager",
				"Project Administrator",
				"Project Analyst",
				"Project Coordinator",
				"Project Manager",
				"PMI Technical Project Manager",
			],
			stats: [
				{
					value: "1.7M+",
					label:
						"PMI certification holders worldwide, making PMI the leader in the field since 1969.",
				},
				{
					value: "$70,000",
					label:
						"Average salary for CAPM-certified project managers in the United States.",
					source: "Forbes",
					sourceUrl: "https://www.forbes.com",
				},
			],
		},
		examContentOutline: {
			title: "Exam Content Outline (ECO)",
			description:
				"Download the CAPM Exam Content Outline for details about the exam, eligibility requirements, and the application process.",
			languages: ["English"],
			downloadUrl: "/documents/capm-eco.pdf",
		},
		aboutExam: {
			title: "About the Exam",
			length: "150 questions",
			time: "180 minutes",
			languages: [
				"English",
				"French",
				"Japanese",
				"Chinese (Simplified)",
				"Arabic",
				"German",
				"Spanish",
				"Chinese (Traditional)",
				"Brazilian Portuguese",
				"Italian",
				"Korean",
			],
		},
		pathToCertification: {
			title: "Path to a CAPM certification",
			steps: [
				{ number: 1, label: "Check eligibility and prepare" },
				{ number: 2, label: "Complete the application" },
				{ number: 3, label: "Pay and schedule the exam" },
				{ number: 4, label: "Study for the exam" },
				{ number: 5, label: "Take the exam" },
			],
			tabs: [
				{
					heading:
						"Before you apply, make sure you meet the following CAPM certification requirements",
					sections: [
						{
							title: "Eligibility requirement",
							content: [
								"Secondary degree, such as a high school diploma, GED (general educational development), or global equivalent.",
								"At least 23 hours of project management education completed before the exam. You can also meet this requirement with:",
							],
							links: [
								{
									text: "PMI on-demand CAPM Exam Prep Course",
									href: "/courses/capm-prep",
								},
								{
									text: "Instructor-Led CAPM® course",
									href: "/courses/capm-instructor",
								},
							],
						},
						{
							title: "Not ready for certifications?",
							content: [
								"Check out our professional development programs for other ways to build your skills.",
							],
							button: {
								text: "Explore Foundational Learning",
								href: "/learning/foundational",
							},
						},
					],
				},
				{
					heading: "Follow the steps below for a smooth application process:",
					sections: [
						{
							title: "Gather your application materials",
							content: [
								"Enter your academic education and 23 hours of professional education courses.",
							],
						},
						{
							title: "Additional tips",
							content: [
								"Remember to register a PMI.org user account before moving forward with your application.",
								"Take your time. The application is save-as-you-go, so you can take a break if needed.",
							],
						},
					],
				},
				{
					heading: "Your application was accepted. What's next?",
					sections: [
						{
							title: "First, congratulations!",
							content: [
								"You're on the path toward career advancement. Once you verify your acceptance, the next step is to pay your exam fee.",
							],
						},
						{
							title: "Schedule your CAPM exam",
							content: [
								"After you pay, you can schedule your CAPM exam. Below are some helpful details about exam scheduling:",
								"You can take your exam at a Pearson Vue Testing Center (recommended) or securely online",
								"You may attempt the exam up to three times in one year if you don't pass",
							],
						},
					],
				},
				{
					heading: "Prepare for your CAPM exam day.",
					sections: [
						{
							title: "",
							content: [
								"While PMI certifications validate your existing skills and experience, preparation and study is critical to passing the exam.",
								"Whether you're looking for in-person training, practice exams, or on-demand courses that allow you to go at your own pace, there are plenty of options for exam preparation.",
							],
							button: {
								text: "View CAPM Exam Prep Resources Below",
								href: "#prep-resources",
							},
						},
					],
				},
				{
					heading: "Countdown to exam day.",
					sections: [
						{
							title: "At a glance:",
							content: [
								"180 minutes",
								"150 questions\n15 unscored pretest questions, 135 scored questions",
								"Offered in 8 languages",
							],
						},
						{
							title: "Associated exam content",
							content: [
								"Project Management Fundamentals and Core Concepts 36%",
								"Predictive, Plan-Based Methodologies 17%",
								"Agile Frameworks/Methodologies 20%",
								"Business Analysis Frameworks 27%",
							],
						},
					],
				},
			],
			faqsLink: { text: "View FAQs", href: "/faqs" },
		},
		examPrep: {
			title: "How to prepare for the CAPM exam",
			description:
				"PMI and its Authorized Training Partners offer world-class prep resources to help you gain the foundational knowledge to succeed. Choose self-paced eLearning, instructor-led classes, practice exams, or PMI study tools—whichever fits your learning style and schedule best.",
			ctaText: "Explore Membership",
			ctaHref: "/membership",
			courses: [
				{
					title: "Online CAPM® Exam Prep with PMTraining™",
					description:
						"A comprehensive self-paced course that walks you through every domain of the CAPM Exam Content Outline, with practice questions and end-of-domain quizzes.",
					tags: ["eLearning", "Sponsored"],
					provider: "Premier Authorized Training Partner",
					learnMoreHref: "/courses/pmtraining-capm",
					colorTheme: "blue",
					image: "/assets/shared/card-star-bg-image.webp",
				},
				{
					title:
						"Certified Associate in Project Management (CAPM)® PMI Study Hall®",
					description:
						"PMI's official study resource with personalized study plans, practice exams, and progress tracking built around the CAPM Exam Content Outline.",
					tags: ["Online Tools"],
					learnMoreHref: "/study-hall/capm",
					colorTheme: "blue",
					image: "/assets/shared/shape-triangle-in-circle.webp",
				},
				{
					title: "CAPM® Exam Prep Course",
					description:
						"On-demand training from PMI that covers predictive, agile, and business analysis frameworks—all aligned to current exam objectives.",
					tags: ["eLearning"],
					learnMoreHref: "/courses/pmi-capm-prep",
					colorTheme: "gold",
					image: "/assets/shared/card-star-bg-image.webp",
				},
				{
					title: "CAPM® Practice Exam",
					description:
						"Simulate real test-day conditions with a timed practice exam that mirrors the format, difficulty, and domain weighting of the live CAPM exam.",
					tags: ["eLearning"],
					learnMoreHref: "/courses/capm-practice-exam",
					colorTheme: "gold",
					image: "/assets/shared/card-star-bg-image.webp",
				},
				{
					title: "Instructor-Led CAPM® Exam Prep Courses",
					description:
						"Live virtual or in-person classes led by expert instructors, with structured lessons, discussions, and cohort-based study support.",
					tags: ["Live Class"],
					provider: "Expert training backed by PMI",
					learnMoreHref: "/courses/capm-instructor-led",
					colorTheme: "gold",
					image: "/assets/shared/card-star-bg-image.webp",
				},
				{
					title: "PMBOK® Guide",
					description:
						"The globally recognized PMI standard for project management—foundational reading for every aspiring project professional.",
					tags: ["Publication", "Free for Members"],
					provider: "PMI Standard",
					learnMoreHref: "/publications/pmbok-guide",
					colorTheme: "gold",
					image: "/assets/shared/shape-triangle-in-circle.webp",
				},
			],
		},
	},
];

export function getCertificationBySlug(
	slug: string
): CertificationPageType | undefined {
	return certificationPagesData.find((cert) => cert.slug === slug);
}
