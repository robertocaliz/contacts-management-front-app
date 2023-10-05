'use client';

import { AppProgressBar as ProgressBar_ } from 'next-nprogress-bar';

export default function ProgressBar({ barColor = '#0070f3' }: {
	barColor?: string
}) {
	return (
		<ProgressBar_ color={barColor} />
	);
}