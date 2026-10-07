/*
 * Strapi entries → the website's content types, one module per area.
 *
 * Every mapper takes the static fallback for its content and falls back
 * field by field: a missing, null or blank value from Strapi (an unfilled
 * field, an unexpected shape, a half-published entry) renders the fallback
 * instead of an empty or broken section. Shared building blocks live in
 * `./shared` and are not re-exported.
 */
export * from './layout';
export * from './landing';
export * from './blog';
export * from './about';
export * from './career';
export * from './contact';
export * from './legal';
