// TODO: 开屏动画（媒体查询？）
// TODO: 四周边框展开动画

// smooth scroll
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


// initialize page
const init = () => {
  render()
}

const ARTWORK_COUNT = 4

function render() {
  const $pagination = document.querySelector('.pagination')
  const $denominator = document.createElement('span')
  const $numerator = document.createElement('span')

  $denominator.className = 'denominator'
  $denominator.innerText = ARTWORK_COUNT

  $numerator.className = 'numerator'

  const $inner = document.createElement('div')
  $inner.className = 'inner'


  for (let i = 0; i < ARTWORK_COUNT; i++) {
    const $number = document.createElement('div')
    $number.innerText = i + 1
    $inner.appendChild($number)
  }

  $numerator.appendChild($inner)
  $pagination.append($numerator, ' / ', $denominator)
  console.log('render')
}

init()

// entance animation
const $topSide = document.querySelector('.top-side')
const $bottomSide = document.querySelector('.bottom-side')
const $leftSide = document.querySelector('.left-side')
const $rightSide = document.querySelector('.right-side')

const $topLine = document.querySelector('.top-line')
const $bottomLine = document.querySelector('.bottom-line')
const $leftLine = document.querySelector('.left-line')
const $rightLine = document.querySelector('.right-line')

const entranceTl = gsap.timeline({
  duration: .6,
})

entranceTl
  .to([$topSide, $leftSide, $bottomSide, $rightSide], {
    scale: 1,
  })
  .to([$leftSide, $rightSide], {
    rotate: -90
  })
  .to([$topSide, $bottomSide], {
    y: (index) => index === 0 ? -100 : 100
  })
  .to([$leftSide, $rightSide], {
    xPercent: (index) => index === 0 ? -15 : 15,
  })
  .to([$topSide, $leftSide, $bottomSide, $rightSide], {
    scale: 2,
    opacity: 0
  })
  .to([$topLine, $bottomLine], {
    scaleX: 1,
    opacity: 0
  })
  .to([$leftLine, $rightLine], {
    scaleY: 1,
    opacity: 0
  }, '-=.6')
  .from('.frame', {
    backgroundColor: '#dddddd'
  }, '-=.6')



// scroll animation
gsap.registerPlugin(ScrollTrigger)

const slider = document.querySelector('.slider')
const sections = gsap.utils.toArray('.slider section')

const scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: slider,
    pin: true,
    scrub: .2,
    snap: 1 / (sections.length - 1),
    end: () => `+=${slider.offsetWidth}`,
    // onUpdate: (self) => console.log(self.progress)
  }
})

const indicatorTween = gsap.to('.inner', {
  yPercent: -100 * (ARTWORK_COUNT - 1) / ARTWORK_COUNT,
  ease: 'none',
  scrollTrigger: {
    scrub: .2,
  }
})