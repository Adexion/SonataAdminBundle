/*!
 * This file is part of the Sonata Project package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Any SCSS/CSS you require will output into a single css file (app.css in this case)
import '../scss/app.scss';

// Require jQuery normally
import $ from 'jquery';

// jQuery scrollTo is not directly used in SonataAdmin
// but it is used on SonataPage, SonataArticle and SonataDashboard
import 'jquery.scrollto';

// Only using sortable widget from jQuery UI library
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/sortable';

// Bootstrap 3 / AdminLTE 2-3 compatibility shim (deprecated: remove in 5.0)
import './bs3-compat';

// Bootstrap 5 (includes Popper.js)
import 'bootstrap';

import 'jquery-form';

// Full version of Select2, needed because SonataAdmin needs
// compat dropdownCss and it only comes on the full version
import 'select2/dist/js/select2.full';

// AdminLTE 4 (Bootstrap 5)
import 'admin-lte';

import 'masonry-layout';

// SonataAdmin custom scripts
import './admin';
import './treeview';
import './sidebar';
import './base';

import * as stimulus from '@hotwired/stimulus';

import { sonataApplication } from './stimulus';

// Create global variables to be used outside this script
global.$ = $;
global.jQuery = $;
global.stimulus = stimulus;
global.sonataApplication = sonataApplication;
