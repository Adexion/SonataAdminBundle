// NEXT_MAJOR: Remove this file.
/**
 * @deprecated since sonata-project/admin-bundle 4.x and will be removed in 5.0.
 *
 * Bootstrap 3 / AdminLTE 2-3 data attribute shim.
 * Rewrites legacy data-toggle / data-dismiss / data-target / data-widget
 * to Bootstrap 5 (data-bs-*) and AdminLTE 4 (data-lte-toggle) equivalents
 * at runtime so existing templates require no immediate changes.
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

    // AdminLTE 2/3 widget attributes → AdminLTE 4
    const lteMap = {
        'push-menu': 'sidebar',
        'tree':      'treeview',
    };
    root.querySelectorAll('[data-widget]').forEach(el => {
        const val = el.getAttribute('data-widget');
        if (lteMap[val] && !el.hasAttribute('data-lte-toggle')) {
            el.setAttribute('data-lte-toggle', lteMap[val]);
        }
    });

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
