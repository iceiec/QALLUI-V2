import React from 'react';

export default function Card({
    children,
    className = '',
    accentColor = null,
    padding = 'p-4 sm:p-5',
    hoverable = true,
}) {
    return (
        <div
            className={`relative rounded-xl border transition-all duration-200 ease-out ${
                hoverable ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''
            } ${padding} ${className}`}
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
            }}
        >
            {accentColor && (
                <div
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl"
                    style={{ backgroundColor: accentColor }}
                />
            )}
            {children}
        </div>
    );
}
