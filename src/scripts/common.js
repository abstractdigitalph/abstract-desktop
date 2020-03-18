const navHamburger = document.getElementsByClassName('hamburger');
const navContent = document.getElementsByClassName('navigation__content');

if (navHamburger[0] && navContent) {
  navHamburger[0].addEventListener('click', () => {
    navHamburger[0].classList.toggle('hamburger--active');
    navHamburger[0].setAttribute(
      'aria-expanded',
      navHamburger[0].getAttribute('aria-expanded') === 'false'
        ? 'true'
        : 'false',
    );
    navContent[0].classList.toggle('navigation__content--active');
    navContent[0].classList.remove('navigation__content--initial');
    document.body.classList.toggle('disable-scroll');
  });
}
