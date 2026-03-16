export type IdeaRecord = {
	id: string;
	title: string;
	category: string;
	description: string;
	fullDescription: string;
	votes: number;
	comments: number;
	author: string;
	time: string;
	status?: 'Published' | 'Draft';
};

export const categories = [
	'All',
	'FinTech',
	'EdTech',
	'AgriTech',
	'HealthTech',
	'Developer Tools',
	'E-commerce',
	'Productivity',
	'Smart Home'
] as const;

export const profile = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	joined: 'January 2024',
	bio: 'Entrepreneur and idea enthusiast passionate about innovative solutions.'
};

export const ideas: IdeaRecord[] = [
	{
		id: '1',
		title: 'AI-Powered Code Review Assistant',
		category: 'Developer Tools',
		description:
			'An intelligent tool that automatically reviews pull requests, identifies potential bugs, suggests improvements, and ensures code quality standards are met across the entire codebase.',
		fullDescription:
			"It integrates with GitHub, GitLab, and Bitbucket to provide inline suggestions, prioritize issues by severity, and learn from your team's coding patterns to reduce noise over time.",
		votes: 234,
		comments: 45,
		author: 'Sarah Chen',
		time: '2 hours ago',
		status: 'Published'
	},
	{
		id: '2',
		title: 'Sustainable Fashion Marketplace',
		category: 'E-commerce',
		description:
			'A platform connecting eco-conscious consumers with verified sustainable fashion brands. Features carbon footprint tracking, material transparency, and ethical manufacturing verification.',
		fullDescription:
			'A trusted marketplace for sustainable fashion with lifecycle transparency, verified suppliers, and consumer-friendly carbon impact tracking.',
		votes: 189,
		comments: 32,
		author: 'Marcus Johnson',
		time: '5 hours ago',
		status: 'Published'
	},
	{
		id: '3',
		title: 'Remote Team Wellness Platform',
		category: 'HealthTech',
		description:
			'Comprehensive wellness solution for remote teams including virtual fitness classes, mental health resources, team challenges, and personalized health tracking.',
		fullDescription:
			'A workplace wellness platform focused on distributed teams, blending preventive care, engagement programs, and personalized recommendations.',
		votes: 156,
		comments: 28,
		author: 'Emily Rodriguez',
		time: '8 hours ago',
		status: 'Published'
	},
	{
		id: '4',
		title: 'Smart Home Energy Optimizer',
		category: 'Smart Home',
		description:
			'IoT solution that learns your energy usage patterns and automatically adjusts smart home devices to minimize electricity costs while maintaining comfort.',
		fullDescription:
			'An adaptive smart-home orchestration system that optimizes consumption, automates schedules, and visualizes cost savings in real time.',
		votes: 142,
		comments: 19,
		author: 'David Kim',
		time: '12 hours ago',
		status: 'Published'
	},
	{
		id: '5',
		title: 'Local Food Network App',
		category: 'AgriTech',
		description:
			'Connect home cooks with neighbors to share homemade meals, reduce food waste, and build community. Features dietary filters, rating system, and secure payments.',
		fullDescription:
			'A neighborhood food-sharing network that enables micro-commerce around local meals while improving trust, safety, and discovery.',
		votes: 127,
		comments: 41,
		author: 'Priya Patel',
		time: '1 day ago',
		status: 'Published'
	},
	{
		id: '6',
		title: 'Freelancer Financial Dashboard',
		category: 'FinTech',
		description:
			'All-in-one financial management for freelancers with invoice tracking, expense categorization, tax estimation, and automated bookkeeping.',
		fullDescription:
			'A freelancer control center for cash flow visibility, tax planning, invoicing, and lightweight financial operations.',
		votes: 98,
		comments: 15,
		author: 'Alex Turner',
		time: '1 day ago',
		status: 'Published'
	},
	{
		id: '7',
		title: 'Peer-to-Peer Tutoring Marketplace',
		category: 'EdTech',
		description:
			'Connect students with verified peer tutors across subjects. Features scheduling, video sessions, session recordings, and a reputation-based matching system.',
		fullDescription:
			'An academic support platform that matches students with trusted peers and provides scheduling, delivery, and quality assurance tools.',
		votes: 76,
		comments: 12,
		author: 'Amara Diallo',
		time: '2 days ago',
		status: 'Draft'
	}
];

export const userIdeaIds = ['1', '6', '7'];

export function getIdeaById(id: string) {
	return ideas.find((idea) => idea.id === id);
}

export function getUserIdeas() {
	return ideas.filter((idea) => userIdeaIds.includes(idea.id));
}
