

window.addEventListener('load', () => {

    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector('[data-scroll-container]');



    const locoScroll = new LocomotiveScroll({
        el: scroller,
        smooth: true,
        getDirection: true,
        direction: 'horizontal',
        smartphone: {
            smooth: true,
            direction: 'horizontal',
        },
        tablet: {
            smooth: true,
            direction: 'horizontal'
        }
    });

    locoScroll.stop();
    setTimeout(() => {
        locoScroll.start()
    }, 1000);


    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        scrollLeft(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.x;
        },
        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: scroller.style.transform ? 'transform' : 'fixed'
    });

    ScrollTrigger.defaults({
        scroller: scroller
    })


    let scrollTween = gsap.to('.anim-wrap', {
        scrollTrigger: {
            trigger: '.vertical',
            start: () => 'left left',
            end: () => '+=' + document.querySelector('.anim-wrap').scrollHeight,
            pin: true,
            pinSpacing: true,
            anticipatepin: 1,
            scrub: true,
            horizontal: true,
            invalidateOnRefresh: true,
            refreshPriority: 1
        },
        y: () => { return - (document.querySelector('.anim-wrap').scrollHeight - window.innerHeight) },
        ease: 'none'
    });

    const gsapHImg = gsap.utils.toArray('.image.Horizontal_img');

    gsapHImg.forEach((gsHImg) => {

        const itemHImg = gsHImg.querySelector('.img_bl');

        gsap.to(itemHImg, {

            scrollTrigger: {
                trigger: gsHImg,
                start: () => 'left right',
                end: () => 'right left',
                scrub: 1.7,
                horizontal: true,
                invalidateOnRefresh: true,
                refreshPriority: 1
            },
            x: 0,
            ease: 'none'
        });
    });


    // ---------------------------------------------
    const gsapVs = gsap.utils.toArray('.vertical .inner-section');

    console.log(gsapVs);

    gsapVs.forEach((gsVs) => {
        const itemVImg = gsVs.querySelector('.img_bl');
        const title = gsVs.querySelector('.title')

        console.log(itemVImg)
        gsap.to(itemVImg, {

            scrollTrigger: {
                trigger: gsVs,
                start: () => 'left right',
                end: () => 'right left',
                scrub: true,
                horizontal: false,
                refreshPriority: 1,
                containerAnimation: scrollTween
            },
            y: 210,
            ease: 'none'
        });
    });
    // -------------------------------------------------

    gsap.to(title, {
        scrollTrigger: {
            trigger: gsVs,
            start: () => 'left right',
            end: () => 'rigth left',
            scrub: 1.5,
            horizontal: false,
            refreshPriority: 1,
            containerAnimation: scrollTween
        },
        y: 85,
        ease: 'none'
    })

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
});


