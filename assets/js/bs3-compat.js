/**
 * Bootstrap 3 → 5 data attribute shim.
 *
 * Rewrites legacy data-toggle / data-dismiss / data-target attributes
 * to their Bootstrap 5 equivalents (data-bs-*) so existing templates
 * don't need to be updated immediately.
 *
 * Import this file in your own app's JS entry point BEFORE bootstrap:
 *   import '@sonata-project/admin-bundle/assets/js/bs3-compat';
 *
 * Or copy it to your own assets and import from there.
 *
 * Remove once all templates are migrated to Bootstrap 5 attributes.
 */

function migrateDataAttributes(root) {
    const map = {
        'data-toggle':  'data-bs-toggle',
        'data-dismiss': 'data-bs-dismiss',
        'data-target':  'data-bs-target',
        'data-parent':  'data-bs-parent',
        'data-ride':    'data-bs-ride',
        'data-slide':   'data-bs-slide',
        'data-slide-to': 'data-bs-slide-to',
        'data-spy':     'data-bs-spy',
        'data-offset':  'data-bs-offset',
        'data-interval': 'data-bs-interval',
    };

    const selector = Object.keys(map)
        .map(attr => `[${attr}]`)
        .join(',');

    root.querySelectorAll(selector).forEach(el => {
        Object.entries(map).forEach(([old, next]) => {
            if (el.hasAttribute(old) && !el.hasAttribute(next)) {
                el.setAttribute(next, el.getAttribute(old));
            }
        });
    });
}

// Run on initial DOM
document.addEventListener('DOMContentLoaded', () => migrateDataAttributes(document));

// Re-run when Sonata injects dynamic content (modals, inline forms, etc.)
document.addEventListener('sonata-admin-append-form-element', e => {
    if (e.target) migrateDataAttributes(e.target);
});
