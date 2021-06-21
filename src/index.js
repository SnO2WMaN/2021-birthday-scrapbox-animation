import anime from 'animejs/lib/anime.es';
import {shuffle} from 'lodash';

const load = () => {
  const $bg = document.querySelector('#bg');
  const $nav = document.querySelector('nav');
  const $profile = $nav.querySelector('nav > .profile');
  const $createpage = $nav.querySelector('#create-page');
  const $searchbox = $nav.querySelector('#searchbox');
  const $project = document.querySelector('#project');
  const $sizer = document.querySelector('#sizer');
  const $sorter = document.querySelector('#sorter');

  anime({
    targets: $bg,
    easing: 'easeOutQuad',
    duration: 3500,
    opacity: [0, 1],
  });
  anime
    .timeline()
    .add({
      targets: $nav,
      easing: 'easeOutQuint',
      delay: 1500,
      duration: 1000,
      translateY: [`-${100}%`, 0],
    })
    .add(
      {
        targets: $profile.querySelector('.icon > .cover'),
        easing: 'easeInQuint',
        duration: 350,
        scale: [0, 1],
      },
      `-=${500}`,
    )
    .add({
      targets: $profile.querySelector('.icon > .cover'),
      easing: 'easeOutQuint',
      duration: 350,
      borderWidth: 0,
    })
    .add(
      {
        targets: $profile.querySelector('.icon > img'),
        easing: 'easeOutQuint',
        duration: 500,
        scale: [0, 1],
      },
      `-=${250}`,
    )
    .add(
      {
        targets: $profile.querySelector('.caret'),
        easing: 'easeOutQuint',
        duration: 500,
        translateY: [`-${100}%`, 0],
        opacity: [0, 1],
      },
      `-=${500}`,
    );

  anime
    .timeline()
    .add({
      targets: $project.querySelectorAll('.title > .cover'),
      easing: (_, i) =>
        ['easeInOutCubic', 'easeInOutQuint', 'easeInOutExpo'][i],
      delay: 1500,
      duration: 1000,
      translateX: [`${101}%`, `-${101}%`],
    })
    .add(
      {
        targets: $project.querySelector('.caret'),
        easing: 'easeOutQuint',
        duration: 500,
        translateX: [`${100}%`, 0],
        opacity: [0, 1],
      },
      `-=${250}`,
    )
    .add(
      {
        targets: $project.querySelectorAll('.title > p'),
        easing: 'easeOutCubic',
        duration: 750,
        opacity: [0, 1],
        translateX: [`${25}%`, `${0}%`],
      },
      `-=${500}`,
    );

  anime
    .timeline()
    .add({
      targets: $createpage,
      easing: 'easeOutCubic',
      delay: 1750,
      duration: 500,
      translateX: [`-${100}%`, 0],
      rotate: [`-${1}rad`, 0],
      opacity: [0, 1],
    })
    .add(
      {
        targets: $searchbox.querySelector('.bg'),
        easing: 'easeInOutExpo',
        duration: 500,
        scaleX: [0, 1],
      },
      `-=${250}`,
    )
    .add({
      targets: $searchbox.querySelector('.search'),
      easing: 'easeInOutExpo',
      duration: 250,
      opacity: [0, 1],
      rotate: [`${45}deg`, 0],
    });

  anime
    .timeline()
    .add({
      targets: $sizer.querySelector('.bar'),
      easing: 'easeInOutCubic',
      delay: 2000,
      duration: 400,
      scaleX: [0, 1],
    })
    .add({
      targets: $sizer.querySelector('.nob'),
      easing: 'easeInOutCubic',
      duration: 250,
      translateX: [`-${100}%`, 0],
      opacity: [0, 1],
    });

  anime
    .timeline()
    .add({
      targets: $sorter.querySelector('span'),
      easing: 'easeOutQuad',
      delay: 2250,
      duration: 400,
      translateY: [`-${50}%`, 0],
      opacity: [0, 1],
    })
    .add(
      {
        targets: $sorter.querySelector('.caret'),
        easing: 'easeOutQuad',
        duration: 400,
        translateY: [`-${50}%`, 0],
        opacity: [0, 1],
      },
      `-=${200}`,
    );

  const $pages = document.querySelectorAll('#pages > .page');
  Array.from($pages).forEach(($page, i, {length}) => {
    const per =
      (((i % ROW) / (ROW - 1)) ** 2 * XSC +
        (Math.floor(i / ROW) / Math.floor(length / ROW)) ** 2 * YSC) /
      (XSC + YSC);
    const seed = Math.random();

    const coverScX =
      seed < 0.5 ? (seed < 0.25 ? [-1, 0, 1] : [1, 0, -1]) : [0, 0, 0];
    const coverScY =
      0.5 <= seed ? (0.75 <= seed ? [-1, 0, 1] : [1, 0, -1]) : [0, 0, 0];

    const $covers = $page.querySelectorAll('.covers > .cover');
    const coverHue = 60 + per * 300 + Math.random() * 50;
    Array.from($covers).forEach(($el, i, {length}) => {
      $el.style.backgroundColor = `hsl(${
        coverHue + (i / length) ** 0.75 * 80
      }, 95%, 70%)`;
    });

    const $bg = $page.querySelector('.bg');
    $bg.style.visibility = 'hidden';

    const $pin = $page.querySelector('.pin');

    anime
      .timeline()
      .add({
        targets: $covers,
        duration: (_, i, l) => 350 * ((i + 1) / l) ** 0.75,
        delay: 1000 + per ** 0.4 * 1500,
        easing: 'easeInExpo',
        translateX: [`${coverScX[0] * 101}%`, `${coverScX[1] * 100}%`],
        translateY: [`${coverScY[0] * 101}%`, `${coverScY[1] * 100}%`],
        complete: () => {
          $bg.style.visibility = 'visible';
        },
      })
      .add({
        targets: $covers,
        duration: (_, i, l) => 350 * ((i + 1) / l) ** 0.75,
        easing: 'easeOutExpo',
        translateX: [`${coverScX[1] * 100}%`, `${coverScX[2] * 101}%`],
        translateY: [`${coverScY[1] * 100}%`, `${coverScY[2] * 100}%`],
      })
      .add(
        {
          targets: $pin,
          duration: 250,
          easing: 'easeOutQuint',
          scaleY: [0, 1],
        },
        `-=${200}`,
      )
      .add(
        {
          targets: $page.querySelector('.title'),
          duration: 250,
          easing: 'easeOutExpo',
          opacity: [0, 1],
          translateX: [`${coverScX[0] * -15}%`, `0%`],
          translateY: [`${coverScY[0] * -15}%`, `0%`],
        },
        `-=${250}`,
      )
      .add(
        {
          targets: $page.querySelector('.thumbnail'),
          duration: 500,
          easing: 'easeOutQuad',
          opacity: [0, 1],
          translateX: [`${coverScX[0] * 5}%`, `0%`],
          translateY: [`${coverScY[0] * 5}%`, `0%`],
        },
        `-=${250}`,
      )
      .add(
        {
          targets: $page.querySelectorAll('.description > *'),
          duration: (_, i, l) => 1000 * ((i + 1) / l),
          easing: 'easeOutCubic',
          opacity: [0, 1],
          translateX: [`${coverScX[0] * 10}%`, `0%`],
          translateY: [`${coverScY[0] * 10}%`, `0%`],
        },
        `-=${500}`,
      )
      .add({
        targets: $page.querySelector('.shadow'),
        duration: 750,
        easing: 'easeInOutCubic',
        opacity: [0, 1],
      });
  });
};

const ROW = 16;
const YSC = 1,
  XSC = 2540 / 1140;

window.addEventListener('load', () => {
  setTimeout(() => load(), 1000);
});
