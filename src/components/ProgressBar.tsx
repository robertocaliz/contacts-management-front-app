'use client';

import { AppProgressBar } from 'next-nprogress-bar';

type ProgressBarProps = {
    barColor?: string;
};

export const ProgressBar = ({ barColor = '#0070f3' }: ProgressBarProps) => {
    return <AppProgressBar color={barColor} />;
};
