UPGRADE 4.x
===========

UPGRADE FROM 4.42 (Unreleased — Bootstrap 5 frontend upgrade)
=========================

## Frontend — Bootstrap 5 + AdminLTE 4

The frontend has been upgraded from Bootstrap 3 + AdminLTE 2 to Bootstrap 5 + AdminLTE 4.
A compatibility layer is included and active by default, so **existing applications require
no immediate template changes**. The compat layer will be removed in 5.0.

### What works automatically (no changes needed)

The following are handled by the built-in compatibility layer:

- Bootstrap 3 CSS classes: `.box`, `.box-header`, `.box-body`, `.box-footer`, `.box-title`,
  `.pull-left`, `.pull-right`, `.btn-default`, `.label.label-*`, `.col-xs-*`,
  `.no-padding`, `.nopadding`, `.sr-only`, `.hide`, `.hidden-xs/sm/md/lg`, `.visible-xs`
- Bootstrap 3 data attributes: `data-toggle`, `data-dismiss`, `data-target`, `data-parent`
  (rewritten to `data-bs-*` at runtime by the JS shim)
- AdminLTE 2/3 sidebar toggle: `data-widget="push-menu"` → `data-lte-toggle="sidebar"`
- Bootstrap 3 tab visibility: `.fade.in` → opacity 1 (same as BS5 `.fade.show`)

### Recommended template migration (before 5.0)

To prepare for the removal of the compat layer in 5.0, update your templates:

**CSS classes:**

| Old (Bootstrap 3 / AdminLTE 2-3)               | New (Bootstrap 5 / AdminLTE 4)          |
|------------------------------------------------|-----------------------------------------|
| `.box`                                         | `.card`                                 |
| `.box-header`, `.box-body`, `.box-footer`      | `.card-header`, `.card-body`, `.card-footer` |
| `.box-title`                                   | `.card-title`                           |
| `.box-primary/success/warning/danger/info`     | `.card` + `border-top: 3px solid ...`   |
| `.pull-left` / `.pull-right`                   | `.float-start` / `.float-end`           |
| `.btn-default`                                 | `.btn-secondary`                        |
| `.label.label-primary` (etc.)                  | `.badge.bg-primary` (etc.)              |
| `.col-xs-6`                                    | `.col-6`                                |
| `.no-padding` / `.nopadding`                   | `.p-0`                                  |
| `.sr-only`                                     | `.visually-hidden`                      |
| `.hide`                                        | `.d-none`                               |
| `.hidden-xs`                                   | `.d-none.d-sm-block`                    |
| `.bg-aqua`                                     | `.bg-info`                              |

**HTML attributes:**

| Old                              | New                              |
|----------------------------------|----------------------------------|
| `data-toggle="dropdown"`         | `data-bs-toggle="dropdown"`      |
| `data-toggle="tab"`              | `data-bs-toggle="tab"`           |
| `data-toggle="modal"`            | `data-bs-toggle="modal"`         |
| `data-toggle="collapse"`         | `data-bs-toggle="collapse"`      |
| `data-dismiss="modal"`           | `data-bs-dismiss="modal"`        |
| `data-target="#foo"`             | `data-bs-target="#foo"`          |
| `data-widget="push-menu"`        | `data-lte-toggle="sidebar"`      |
| `class="tab-pane fade in active"`| `class="tab-pane fade show active"` |

### Removed dependencies

The following npm packages were removed and must be removed from your own `package.json`
if you required them directly:

- `icheck` — use native Bootstrap 5 `.form-check` styling instead
- `x-editable` — no Bootstrap 5 compatible version exists; implement inline editing manually
- `jquery-slimscroll` — no longer needed in AdminLTE 4
- `select2-bootstrap-theme` — replaced by `select2-bootstrap-5-theme`

### Custom layouts

If your application extends `standard_layout.html.twig` with a custom layout,
update the HTML structure to AdminLTE 4:

```html
<!-- Old (AdminLTE 2) -->
<body class="skin-blue fixed">
  <div class="wrapper">
    <header class="main-header">...</header>
    <aside class="main-sidebar">...</aside>
    <div class="content-wrapper">...</div>
    <footer class="main-footer">...</footer>
  </div>
</body>

<!-- New (AdminLTE 4) -->
<body class="layout-fixed">
  <div class="app-wrapper">
    <nav class="app-header navbar">...</nav>
    <aside class="app-sidebar">...</aside>
    <main class="app-main">...</main>
    <footer class="app-footer">...</footer>
  </div>
</body>
```

The `admin_lte_skin_class` block previously set the body skin class (e.g. `skin-blue`).
It now controls the sidebar background class (e.g. `bg-dark`).

UPGRADE FROM 4.41 to 4.42
=========================

## Optional Symfony ACL integration

Before 4.42.0 the `symfony/security-acl` package was a hard dependency even if no ACL features were used.
Starting with 4.42.0 the dependency is now optional and users who are using ACL features should not be impacted as they
also need to have `symfony/acl-bundle` installed anyway (which requires `symfony/security-acl`).

In case `symfony/security-acl` is not installed we are now also skipping registration of some ACL related services.

UPGRADE FROM 4.18 to 4.19
=========================

## Form errors retrieved via ajax calls

This change will most likely not affect you since normally the admin is not used
directly as an api for create or edit objects.

Previously ajax form errors that happen on creation / edit of an admin object
were outputted as a custom json that didn't had the information about which field
had the error. This was a problem because the form was not able to highlight the
field with the error.

Now the ajax form errors are outputted with the standard Symfony json format for
validation errors.

To be able to output errors with that new format, you will also need to have
`symfony/serializer` installed.

Before:

```json
    {
        "result":"error",
        "errors": [
            "Form error message"
        ]
    }
```

After:

```json
    {
        "type":"https://symfony.com/errors/validation",
        "title":"Validation Failed",
        "detail":"name: Form error message",
        "violations": [
            {
                "propertyPath":"name",
                "title":"Form error message",
                "parameters":[]
            }
        ]
    }
```

## BCLabelTranslatorStrategy

The BCLabelTranslatorStrategy is deprecated. Please use another label translator strategy or
implements your own directly in your project.

UPGRADE FROM 4.13 to 4.14
=========================

## FilterInterface

Not implementing `getFormOptions()` is deprecated, it will replace the `getRenderSettings()`
in next major. If you have an implementation this way:
```php
public function getRenderSettings(): array
{
    return [DefaultType::class, [
        'operator_type' => $this->getOption('operator_type'),
        'operator_options' => $this->getOption('operator_options'),
        'field_type' => $this->getFieldType(),
        'field_options' => $this->getFieldOptions(),
        'label' => $this->getLabel(),
    ]];
}
```
You can implement the `getFormOptions()` method this way:
```php
public function getFormOptions(): array
{
    return [
        'operator_type' => $this->getOption('operator_type'),
        'operator_options' => $this->getOption('operator_options'),
        'field_type' => $this->getFieldType(),
        'field_options' => $this->getFieldOptions(),
        'label' => $this->getLabel(),
    ];
}
```

UPGRADE FROM 4.12.0 to 4.13.0
=============================

## Batch action is relevant

Deprecate `batchAction%sIsRelevant` hook. You must handle the specific logic in your
batch action controller directly.

UPGRADE FROM 4.11.1 to 4.12.0
=============================

## Datetime picker assets

Datetime picker assets were moved from SonataAdminBundle to form-extensions.
Normally this should not affect you, unless you have modified
the default javascript and/or stylesheets
(remember that you can also add extra stylesheets or javascript using
`extra_stylesheets` and `extra_javascripts` to avoid this kind of issues):

Before
```yaml
    sonata_admin:
        assets:
            javascript:
                bundles/sonataadmin/app.js
                your_own.js
            stylesheets:
                bundles/sonataadmin/app.css
                your_own.css
```

After
```yaml
    sonata_admin:
        assets:
            javascript:
                bundles/sonataadmin/app.js
                bundles/sonataform/app.js
                your_own.js
            stylesheets:
                bundles/sonataadmin/app.css
                bundles/sonataform/app.css
                your_own.css
```

UPGRADE FROM 4.7 to 4.8
=======================

## Admin definitions

Deprecate passing the code, the model class and the controller in the arguments section.

Before
```yaml
    services:
        app.admin.car:
            class: App\Admin\CarAdmin
            tags:
                - { name: sonata.admin, manager_type: orm, group: Demo, label: Car }
            arguments:
                - admin_car
                - App\Entity\Car
                - App\Controller\CarAdminController
```
After
```yaml
    services:
        app.admin.car:
            class: App\Admin\CarAdmin
            tags:
                - { name: sonata.admin, code: admin_car, model_class: App\Entity\Car, controller: App\Controller\CarAdminController, manager_type: orm, group: Demo, label: Car }
```

UPGRADE FROM 4.0 to 4.1
=======================

### appendParentObject is called inside createNewInstance with child admins

In a child admin, if you were overriding `createNewInstance` and relying on sonata to provide the needed "parent" entity
to the instance, now you have to call `appendParentObject` manually.

Before:
```php
final class PostAdmin extends AbstractAdmin
{
    public function createNewInstance(): object
    {
        return new Post();
    }
}
```

After:
```php

final class PostAdmin extends AbstractAdmin
{
    public function createNewInstance(): object
    {
        $object = new Post();

         // set the post author if the parent admin is "AuthorAdmin"
        $this->appendParentObject($object);

        return $object;
    }
}
```
