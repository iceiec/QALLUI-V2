import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    title: (title) => (title ? `${title} — QALL` : 'QALL'),
    resolve: (name) => {
        const pages = import.meta.glob('./features/**/views/*.jsx', { eager: true });
        const [feature, ...rest] = name.split('/');
        const pageName = rest.join('/');
        const path = `./features/${feature}/views/${pageName}.jsx`;

        if (!pages[path]) {
            throw new Error(`Inertia view not found: ${name} (expected ${path})`);
        }

        return pages[path];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
