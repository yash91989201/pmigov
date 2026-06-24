import { IconCircleCheck, IconFileText } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

type BoardMember = {
	id: string;
	name: string;
	role: string;
	bio: string;
	imageUrl: string;
};

export const Route = createFileRoute("/about/")({
	component: AboutComponent,
});

const boardMembers: BoardMember[] = [
	{
		id: "1",
		name: "Ashish Rajak",
		role: "FCO",
		bio: "Ashish Rajak oversees the financial operations and ensures fiscal responsibility for the chapter's initiatives and programs.",
		imageUrl: "",
	},
	{
		id: "2",
		name: "Dhruv Singh Yadav",
		role: "Account Manager",
		bio: "Dhruv Singh Yadav manages member accounts and coordinates financial records, ensuring smooth handling of account-related activities for the PMIGOV.",
		imageUrl: "",
	},
	{
		id: "3",
		name: "Kaptan",
		role: "Finance Manager",
		bio: "Kaptan oversees financial planning and reporting for the chapter, ensuring budgetary discipline and transparency across all programs and initiatives.",
		imageUrl: "",
	},
];

function AboutComponent() {
	return (
		<div className="w-full bg-[#faf9f6]">
			<section className="relative w-full overflow-hidden">
				<div className="mx-auto max-w-[1600px]">
					<div className="flex flex-col items-center lg:flex-row">
						<div className="relative z-10 h-[500px] w-full lg:h-[700px] lg:w-[45%] lg:pr-10">
							<div className="hero-curve relative h-full w-full overflow-hidden shadow-2xl">
								<img
									alt="Professionals walking in field"
									className="h-full w-full object-cover"
									height={700}
									src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
									width={1000}
								/>
								<div className="absolute inset-0 bg-black/5" />
							</div>
						</div>

						<div className="w-full px-6 py-16 md:px-12 lg:w-[55%] lg:px-24 lg:py-0">
							<div className="max-w-2xl">
								<div className="mb-8 flex items-center gap-2 font-bold text-gray-500 text-sm uppercase tracking-widest">
									<span>Home</span>
									<span className="text-gray-300">/</span>
									<span>About Us</span>
									<span className="text-gray-300">/</span>
									<span className="text-pmi-primary">Our Mission</span>
								</div>

								<h1 className="mb-8 font-extrabold text-4xl text-[#1e0a45] leading-tight tracking-tight md:text-5xl lg:text-6xl">
									Project Management Institute Gov Chapter
								</h1>

								<div className="space-y-6 font-light text-gray-700 text-lg leading-relaxed md:text-xl">
									<p>
										We are a chartered component of the Project Management
										Institute (PMI), the world's leading professional
										association for a growing global community of millions of
										project professionals.
									</p>
									<p>
										<strong>Our Purpose:</strong> To maximize project success to
										elevate our world.
									</p>
									<p>
										The Gov Chapter serves professionals in the region by
										providing networking, professional development, and
										leadership opportunities. We are committed to the PMI
										Culture Values of Make it Easy, Aim Higher, Be Welcoming,
										Embrace Curiosity, and Together We Can.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="border-gray-100 border-y bg-white py-20">
				<div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-12 divide-y divide-gray-100 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
						<div className="py-4">
							<div className="mb-2 font-extrabold text-5xl text-pmi-primary">
								25+
							</div>
							<div className="font-bold text-gray-600 text-sm uppercase tracking-wider">
								Years Chartered
							</div>
						</div>
						<div className="py-4">
							<div className="mb-2 font-extrabold text-5xl text-pmi-accent">
								1,500+
							</div>
							<div className="font-bold text-gray-600 text-sm uppercase tracking-wider">
								Active Members
							</div>
						</div>
						<div className="py-4">
							<div className="mb-2 font-extrabold text-5xl text-pmi-brand">
								78%
							</div>
							<div className="font-bold text-gray-600 text-sm uppercase tracking-wider">
								PMP® Certified
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-[#faf9f6] py-24">
				<div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
					<div className="mb-16">
						<h2 className="mb-6 font-bold text-4xl text-[#1e0a45]">
							Board of Directors
						</h2>
						<div className="h-1.5 w-20 rounded-full bg-pmi-primary" />
						<p className="mt-6 max-w-3xl font-light text-gray-600 text-xl">
							Our chapter is guided by experienced professionals in finance,
							technology, and advisory roles who are committed to ensuring
							organizational excellence and advancing the project management
							profession.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{boardMembers.map((member) => (
							<div
								className="group border-pmi-primary border-t-4 bg-white p-10 shadow-sm transition-all duration-300 hover:shadow-xl"
								key={member.id}
							>
								<h3 className="mb-2 font-bold text-2xl text-gray-900 transition-colors group-hover:text-pmi-primary">
									{member.name}
								</h3>
								<p className="mb-6 font-bold text-pmi-primary text-sm uppercase tracking-wider">
									{member.role}
								</p>
								<p className="text-base text-gray-600 leading-relaxed">
									{member.bio}
								</p>
							</div>
						))}
					</div>

					<div className="mt-20 text-center">
						<button
							className="rounded-full border-2 border-[#1e0a45] bg-transparent px-10 py-4 font-bold text-[#1e0a45] transition-all duration-300 hover:bg-[#1e0a45] hover:text-white"
							type="button"
						>
							View Bylaws & Strategic Plan
						</button>
					</div>
				</div>
			</section>

			<section className="bg-[#f0f4f8] py-24">
				<div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
						<div className="w-full lg:w-1/2">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#5621b4] px-4 py-2 font-bold text-white text-xs uppercase tracking-wider">
								<IconFileText size={14} />
								Finance Branch Verification
							</div>
							<h2 className="mb-6 font-bold text-4xl text-[#1e0a45] leading-tight md:text-5xl">
								Corporate Financial{" "}
								<span className="text-[#5621b4]">Trust & Transparency</span>
							</h2>
							<p className="mb-6 font-light text-gray-600 text-lg leading-relaxed">
								At PMI Gov, we maintain strictly verified financial channels for
								all enterprise transactions through our official partner,
								ensuring the highest standards of accountability and trust in
								every operation we undertake.
							</p>
							<div className="flex items-center gap-2 font-bold text-green-600 text-sm">
								<IconCircleCheck size={18} />
								<span>Verified Corporate Branch Profile</span>
							</div>
						</div>

						<div className="w-full lg:w-1/2">
							<div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
								<div className="flex items-start gap-6">
									<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#5621b4]/10">
										<IconFileText className="text-[#5621b4]" size={28} />
									</div>
									<div className="space-y-5">
										<div>
											<p className="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">
												Organization Name
											</p>
											<p className="font-bold text-[#1e0a45] text-lg">
												PMI Gov
											</p>
										</div>
										<div>
											<p className="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">
												Financial Institution
											</p>
											<p className="font-bold text-[#1e0a45] text-lg">
												HDFC Bank
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
