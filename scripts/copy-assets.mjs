import { cpSync, copyFileSync } from 'node:fs';

cpSync('assets', 'dist/assets', { recursive: true, force: true });
copyFileSync('robots.txt', 'dist/robots.txt');
copyFileSync('sitemap.xml', 'dist/sitemap.xml');
