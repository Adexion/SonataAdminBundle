/*!
 * This file is part of the Sonata Project package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const SonataCore = {
  addFlashmessageListener() {
    document.querySelectorAll('.read-more-state').forEach((element) => {
      element.addEventListener('change', (event) => {
        const label = document.querySelector(`label[for="${element.id}"]`);
        const labelMore = label.querySelector('.more');
        const labelLess = label.querySelector('.less');

        if (event.target.checked) {
          labelMore.classList.add('d-none');
          labelLess.classList.remove('d-none');
        } else {
          labelMore.classList.remove('d-none');
          labelLess.classList.add('d-none');
        }
      });
    });
  },
};

jQuery(() => {
  SonataCore.addFlashmessageListener();
});
