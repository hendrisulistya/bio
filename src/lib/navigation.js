// src/lib/navigation.js

export const navigationLinks = [
	{ name: 'Home', path: '/' },
	{ name: 'Blog', path: '/blog' },
	{ name: 'CV', path: '/cv' }
];

export function getDynamicBlogLink(slug) {
	return `/blog/${slug}`;
}

export function getDynamicCVLink(section) {
	return `/cv/${section}`;
}
