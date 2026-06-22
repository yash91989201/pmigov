import { IconArrowRight } from "@tabler/icons-react";
import type { CertificationPageType } from "./pages-data";

interface CourseCardProps {
	course: CertificationPageType["examPrep"]["courses"][number];
}

// ponytail: visual cue for flagship/trustworthy offers (sponsored or member-perk)
const TEAL_TAG_LABELS = new Set(["Sponsored", "Free for Members"]);

export function CourseCard({ course }: CourseCardProps) {
	return (
		<article className="relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			{course.image && (
				<img
					alt=""
					aria-hidden="true"
					className="absolute inset-0 h-full w-full object-cover"
					height={420}
					loading="lazy"
					src={course.image}
					width={400}
				/>
			)}

			<div className="relative flex flex-1 flex-col gap-4 bg-gradient-to-t from-white to-transparent px-6 pt-24 pb-8">
				{course.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{course.tags.map((tag) => {
							const isTeal = TEAL_TAG_LABELS.has(tag);
							return (
								<span
									className={`inline-flex rounded-full px-3 py-1 font-medium text-xs ${
										isTeal
											? "bg-[#007ba7] text-white"
											: "border border-slate-200 bg-white text-[#1d1d35]"
									}`}
									key={tag}
								>
									{tag}
								</span>
							);
						})}
					</div>
				)}

				<h3 className="font-semibold text-[#1d1d35] text-lg leading-snug">
					{course.title}
				</h3>

				{course.provider && (
					<p className="text-slate-500 text-xs">{course.provider}</p>
				)}

				<p className="text-slate-600 text-sm leading-relaxed">
					{course.description}
				</p>

				<a
					className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#1d1d35] px-5 py-2 font-medium text-sm text-white transition-colors hover:bg-[#0a1628]"
					href={course.learnMoreHref}
				>
					Learn More
					<IconArrowRight aria-hidden="true" className="size-4" />
				</a>
			</div>
		</article>
	);
}
