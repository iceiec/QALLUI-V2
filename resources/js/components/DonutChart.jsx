import React from 'react';

export default function DonutChart({
    segments = [],
    size = 136,
    strokeWidth = 14,
    centerTitle = '',
    centerSubtitle = '',
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

    let cumulativeOffset = 0;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="var(--border-subtle)"
                    strokeWidth={strokeWidth}
                />
                {segments.map((seg, idx) => {
                    const fraction = Math.max(0, seg.value) / total;
                    const dashArray = `${fraction * circumference} ${circumference}`;
                    const dashOffset = -cumulativeOffset * circumference;
                    cumulativeOffset += fraction;
                    return (
                        <circle
                            key={idx}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="butt"
                        />
                    );
                })}
            </svg>
            {(centerTitle || centerSubtitle) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    {centerTitle && (
                        <span className="font-inter-black text-base sm:text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
                            {centerTitle}
                        </span>
                    )}
                    {centerSubtitle && (
                        <span className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            {centerSubtitle}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
