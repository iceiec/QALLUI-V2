import React from 'react';

export function getInitials(name = '') {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserAvatar({ name, size = 'sm' }) {
    const initials = getInitials(name);
    const sizeClasses = size === 'md' ? 'h-7 w-7 text-[11px]' : 'h-6 w-6 text-[10px]';

    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ${sizeClasses}`}
            style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent-text)',
            }}
            title={name}
        >
            {initials}
        </span>
    );
}
