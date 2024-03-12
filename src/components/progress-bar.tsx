'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export default function ProgressBar({
	barColor = '#0070f3',
}: {
	barColor?: string;
}) {
	return <AppProgressBar color={barColor} />;
}
