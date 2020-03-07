import React from 'react'

import { Transition } from 'react-transition-group';

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, tryUseContext, isReactTypeOf } from '../../../../utils/react-like';

import { PlaceholderImage } from '../_helpers/image'
import { TransitionTimeouts, TransitionStates } from '../common';
import { filterPlaceholderSize } from '../common-utils';
import Anchor from '../_helpers/anchor';
import { coerceInteger } from '../../../../utils/coerce';
import { arraify, flatten } from '../../../../utils/array';
import { useInterval } from '../../../../utils/react-hooks/use-timer';
import useKeyPress from '../../../../utils/react-hooks/use-keypress';

const RUNTIME_TOKEN = Date.now()
const useToken = (str) => `${RUNTIME_TOKEN}_${str}`

const CarouselContext = React.createContext({})

const SWICH_TYPES = {
    FROM_LEFT_TO_RIGHT: 'FROM_LEFT_TO_RIGHT',
    FROM_RIGHT_TO_LEFT: 'FROM_RIGHT_TO_LEFT',
    NONE: 'NONE',
}

const symbol = Symbol('#Carousel')

const useSlides = () => {
    const slidesRef = React.useRef([])
    const [_, setSlides] = React.useState([])
    const update = ((value) => {
        slidesRef.current = value;
        setSlides(Array.from(slidesRef.current))
    })

    return [slidesRef, update]
}

const useIndexInfo = (initIdx = 0) => {
    const indexRef = React.useRef(initIdx)
    const lastIndexRef = React.useRef(initIdx)
    const [_, setCurIndex] = React.useState(initIdx)

    const update = ((value) => {
        lastIndexRef.current = indexRef.current;

        indexRef.current = value;
        setCurIndex(indexRef.current)
    })

    return [lastIndexRef, indexRef, update]
}

const usePauseOnHover = (pauseMode) => {
    const [ , setPause ] = React.useState(false)
    const pauseRef = React.useRef(null)

    const onMouseEnter = React.useCallback(() => {
        if (pauseMode === 'hover')
            setPause(pauseRef.current = true)
    }, [pauseMode])
    
    const onMouseLeave = React.useCallback(() => {
        if (pauseMode === 'hover')
            setPause(pauseRef.current = false)
    }, [pauseMode])

    return [pauseRef, onMouseEnter, onMouseLeave]
}

const useStartAutoplay = (rideMode) => {
    const [, setStartAutoplay] = React.useState(false)
    // if rideMode === 'carousel, autoplay on load 
    const ref = React.useRef(isAutoplayOnLoad(rideMode))

    const onUserManulSwitched = React.useCallback(() => {
        setStartAutoplay(ref.current = true)
    }, [rideMode])

    return [ref, onUserManulSwitched]
}

const useCarouseInterval = (_itv = DFLT_INTERVAL) => {
    const [, setInterval] = React.useState(_itv)
    const ref = React.useRef(_itv)

    const update = React.useCallback((new_itv) => {
        // ref.current = new_itv
        setInterval(ref.current = new_itv)
    }, [])

    return [ref, update]
}

const useKeyboard = (latestValue) => {
    const ref = React.useRef(null)
    ref.current = latestValue
    return ref
}

const useFreezingAnimation = (value = false) => {
    const ref = React.useRef(value)
    const toggle = (nextValue = !ref.current) => {
        ref.current = nextValue
    }
    return [ref, toggle]
}

const DFLT_INTERVAL = 5000

const isAutoplayOnLoad = (rideMode) => rideMode === 'carousel'
/**
 * @see https://getbootstrap.com/docs/4.4/components/carousel
 * 
 * @inner-content `.carousel`
 * @inner-content `.carousel-inner`
 * @inner-content `.carousel-item`
 */
const Carousel = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        slide = true,
        /**
         * @deprecated
         */
        innerLess = false,
        /**
         * @description if set hover, pause on mouse enter carousel and resume on mouse leave carousel
         * 
         * @enum 'hover'
         * 
         * @default 'hover'
         */
        pause: pauseMode = 'hover',
        /**
         * 
         * @enum carousel - autoplay on load
         * @enum (default) - autoplay after user's first manul switch
         */
        ride: rideMode,
        /**
         * @description the interval at which the carousel automatically cycles
         * 
         * @default null
         */
        interval = isAutoplayOnLoad(rideMode) ? DFLT_INTERVAL : null,
        /**
         * @description whether the left-arrow and right-arrow keys could control the carousel
         */
        keyboard: controlledByKeyborad = false,
        /**
         * @description whether use fade animation when switch
         */
        crossFade = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });
    
        const INNER_WRAPPER = (false && innerLess) ? React.Fragment : Carousel.Inner

        const [slidesRef, setSlides] = useSlides()
        const [lastIndexRef, currentIdxRef, setCurrentIdx] = useIndexInfo()

        const [freezingSwitchRef, setFreezingSwitch] = useFreezingAnimation(false)
        const switchActiveIdx = React.useCallback((nextIdx) => {
            if (freezingSwitchRef.current) return ;

            nextIdx = coerceInteger(nextIdx, 0)

            if (nextIdx > slidesRef.current.length - 1)
                nextIdx = 0
            else if (nextIdx < 0)
                nextIdx = slidesRef.current.length - 1
            else
                nextIdx = Math.min(nextIdx, slidesRef.current.length - 1)

            setCurrentIdx(nextIdx)
        }, [switchActiveIdx])

        const [pauseRef, onMouseEnter, onMouseLeave] = usePauseOnHover(pauseMode)
        const [startedAutoplayRef, startAutoplay] = useStartAutoplay(rideMode)

        const dirOffset = lastIndexRef.current - currentIdxRef.current
        const switchType = (() => {
            const itemsOffset = slidesRef.current.length - 1
            if (dirOffset === 0) return SWICH_TYPES.NONE

            if ((dirOffset > 0))
                // over most right slide
                if (dirOffset >= itemsOffset)
                    return SWICH_TYPES.FROM_LEFT_TO_RIGHT
                else
                    return SWICH_TYPES.FROM_RIGHT_TO_LEFT
            if (dirOffset < 0)
                // over most left slide
                if (Math.abs(dirOffset) >= itemsOffset)
                    return SWICH_TYPES.FROM_RIGHT_TO_LEFT
                else
                    return SWICH_TYPES.FROM_LEFT_TO_RIGHT
        })()

        interval = coerceInteger(interval, 0)
        interval_about: {
            const [intervalRef, updateInterval] = useCarouseInterval(interval)
            useInterval(() => {
                if (!intervalRef.current) return ;
                const playInfo = context.getPlayInfo()
    
                if (playInfo.paused) return ;
                if (!playInfo.startedAutoplay) return ;
    
                context._onSwitch(playInfo.currentIndex + 1);
            }, intervalRef.current)
            // update interval(from item) on slide changed
            React.useEffect(() => {
                const currentSlide = context.getPlayInfo('currentSlide')
    
                if (!currentSlide) return 
                const nextInterval = coerceInteger(currentSlide.interval, intervalRef.current)
                if (nextInterval !== intervalRef.current)
                    updateInterval(nextInterval)
            }, [currentIdxRef.current])
        }

        keyboard_about: {
            const _controlledRef = useKeyboard(controlledByKeyborad)
            useKeyPress('ArrowLeft', {
                keydown: () => {
                    if (!_controlledRef.current) return ;
                    context._onSwitch('prev')
                }
            })
            useKeyPress('ArrowRight', {
                keydown: () => {
                    if (!_controlledRef.current) return ;
                    context._onSwitch('next')
                }
            })
        }
        
        const context = {
            symbol,
            switchType,
            itemDefaultInterval: coerceInteger(interval, 0),
            slides: slidesRef.current,
            getPlayInfo (key) {
                const info = {
                    currentSlide: context.slides[currentIdxRef.current],
                    currentIndex: currentIdxRef.current,
                    pause: pauseRef.current,
                    startedAutoplay: startedAutoplayRef.current,
                }
                switch (key) {
                    case 'currentSlide':
                    case 'currentIndex':
                    case 'paused':
                    case 'startedAutoplay':
                        return info[key];
                    default:
                        return info
                }
            },
            _isLast: (slideIndexRef) => {
                return slideIndexRef.current === lastIndexRef.current
            },
            _isCurrent: (slideIndexRef) => {
                return slideIndexRef.current === currentIdxRef.current
            },
            _getSwitchInCls: (_, tState, startAnimation) => {
                return [
                    // direction
                    startAnimation && (tState === TransitionStates.ENTERING || tState === TransitionStates.EXITING) && (
                        switchType === SWICH_TYPES.FROM_LEFT_TO_RIGHT ? 'carousel-item-left' : 'carousel-item-right'
                    ),
                    // order
                    tState === TransitionStates.ENTERING && (
                        switchType === SWICH_TYPES.FROM_LEFT_TO_RIGHT ? 'carousel-item-next' : 'carousel-item-prev'
                    ),
                    // active
                    (tState === TransitionStates.ENTERED || tState === TransitionStates.EXITING) && 'active',
                ]
            },
            _onSwitch: (nextIdx) => {
                if (!startedAutoplayRef.current) startAutoplay()

                switch (nextIdx) {
                    case 'prev':
                        switchActiveIdx(currentIdxRef.current - 1)
                        break
                    case 'next':
                        switchActiveIdx(currentIdxRef.current + 1)
                        break
                    default:
                        if (typeof nextIdx === 'number') {
                            switchActiveIdx(nextIdx)
                            break
                        }
                        throw new Error(`unexpected controlType! contact with author of reboot-ui!`)
                }
            },
            _toggleFreezingSlide: (nextFreeing = false) => {
                setFreezingSwitch(nextFreeing)
            },
            _addSlide: ({ ref, interval, itemIndexRef } = {}, idx) => {
                const slides = slidesRef.current
                idx = coerceInteger(idx, slides.length)

                idx = Math.min(idx, slides.length)
                idx = Math.max(idx, 0)

                itemIndexRef.current = idx

                const newSlide = { ref, interval, itemIndexRef }
                const _slides = slides.slice(0, idx).concat(newSlide)
                    .concat(slides.slice(idx + 1))
                setSlides(_slides)

                return newSlide
            },
            _removeSlide: (slide) => {
                const _slides = Array.from(slidesRef.current)

                const idx = _slides.findIndex(item => item === slide)
                if (idx === -1) return idx;

                _slides.splice(idx, 1)

                setSlides(
                    _slides.map((item, _idx) => {
                        item.itemIndexRef.current = _idx
                        return item
                    })
                )
            }
        }

        const flattenedList = flatten(arraify(children))
        let itemList = []
        let controlList = []
        let indicatorsNode = null
        let restChildren = []
        flattenedList.forEach(item => {
            if (isReactTypeOf(item, Carousel.Item)) itemList.push(item)
            else if (isReactTypeOf(item, Carousel.Control)) controlList.push(item)
            else if (isReactTypeOf(item, Carousel.Indicators))
                indicatorsNode = item
            else restChildren.push(item)
        })

        if (indicatorsNode)
            indicatorsNode = React.cloneElement(indicatorsNode, {
                children: Array.from({ length: itemList.length }).map(
                    (_, idx) => <CarouselIndicator {...{ [useToken('indicatorIndex')]: idx }} />
                )
            })

        itemList.forEach((item, idx) => {
            if (!isReactTypeOf(item, Carousel.Item)) return ;
            itemList[idx] = React.cloneElement(item, { [useToken('itemIndex')]: idx })
        })
    
        return (
            <CarouselContext.Provider value={context}>
                <JSXEl
                    {...props}
                    className={rclassnames(props, [
                        `carousel`,
                        slide && `slide`,
                        crossFade && `carousel-fade`,
                    ])}
                    {...rideMode && {
                        'data-ride': rideMode
                    }}
                    onMouseEnter={(nativeEvent) => {
                        onMouseEnter()
                        typeof props.onMouseEnter === 'function' && props.onMouseEnter(nativeEvent)
                    }}
                    onMouseLeave={(nativeEvent) => {
                        onMouseLeave()
                        typeof props.onMouseLeave === 'function' && props.onMouseLeave(nativeEvent)
                    }}
                    ref={ref}
                >
                    {indicatorsNode}
                    <INNER_WRAPPER>
                        {itemList}
                    </INNER_WRAPPER>
                    {controlList}
                    {restChildren}
                </JSXEl>
            </CarouselContext.Provider>
        )
    }
)

Carousel.Indicators = function ({
    children,
    as: _as = 'ol',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['ol', 'ul'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `carousel-indicators`
            ])}
        >
            {children}
        </JSXEl>
    )
}

const CarouselIndicator = function ({
    children,
    as: _as = 'li',
    // active = false,
    [useToken('indicatorIndex')]: $indicatorIndex,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });
    
    const carouselCtx = tryUseContext(CarouselContext)
    if (carouselCtx.symbol !== symbol)
        throw new Error(`[CarouselIndicator] CarouselIndicator must be put under Carousel!`)

    const active = carouselCtx._isCurrent({ current: $indicatorIndex })
    
    return (
        <JSXEl
            {...props}
            data-slice-to={$indicatorIndex}
            className={rclassnames(props, [
                active && `active`
            ])}
            onClick={() => {
                carouselCtx._onSwitch($indicatorIndex)
            }}
        >
            {children}
        </JSXEl>
    )
}

Carousel.Inner = function ({
    children,
    as: _as = 'div',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `carousel-inner`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

Carousel.Caption = function ({
    children,
    as: _as = 'div',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `carousel-caption`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

const useStartAnimation = (initState = false) => {
    const ref = React.useRef(initState)
    const [_, set] = React.useState(initState)

    const update = ((value) => {
        ref.current = value;
        set(ref.current)
    })

    return [ref, update]
}

Carousel.Item = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        /**
         * @description individual interval for this carousel item
         */
        interval,
        [useToken('itemIndex')]: $itemIndex,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const itemIndexRef = React.useRef($itemIndex)
    
        const carouselCtx = tryUseContext(CarouselContext)
        if (carouselCtx.symbol !== symbol)
            throw new Error(`[Carousel.Control] Carousel.Control must be put under Carousel!`)

        const [startAnimationRef, setStartAnimation] = useStartAnimation(false)
        // React.useEffect(() => {
        //     carouselCtx._toggleFreezingSlide(startAnimationRef.current)
        // }, [startAnimationRef.current])

        const active = carouselCtx._isCurrent(itemIndexRef)
        if (interval === undefined) interval = coerceInteger(carouselCtx.itemDefaultInterval, 0)
        else if (typeof interval !== null) interval = coerceInteger(interval, null)

        // register item to carousel
        React.useEffect(() => {
            const slide = carouselCtx._addSlide({ ref, interval, itemIndexRef })
    
            return () => {
                carouselCtx._removeSlide(slide)
            }
        }, [interval])
        
    
        return (
            <Transition
                in={active}
                appear={false}
                enter={true}
                exit={true}
                timeout={{
                    appear: 0,
                    enter: TransitionTimeouts.Carousel,
                    exit: TransitionTimeouts.Carousel,
                }}
                onEnter={(node, isAppearing) => {
                  setStartAnimation(false)
                  typeof props.onEnter === 'function' && props.onEnter(node, isAppearing);
                }}
                onEntering={(node, isAppearing) => {
                  // getting this variable triggers a reflow
                  const offsetHeight = node.offsetHeight;
                  setStartAnimation(true)
                  typeof props.onEntering === 'function' && props.onEntering(node, isAppearing);
                  return offsetHeight;
                }}
                onExit={(node) => {
                  setStartAnimation(false)
                  typeof props.onExit === 'function' && props.onExit(node);
                }}
                onExiting={(node) => {
                  setStartAnimation(true)
                  carouselCtx._toggleFreezingSlide(true)
                  typeof props.onExiting === 'function' && props.onExiting(node);
                }}
                onExited={(node) => {
                    carouselCtx._toggleFreezingSlide(false)
                  typeof props.onExited === 'function' && props.onExited(node);
                }}
            >
                {(state) => {
                    const switchInCls = carouselCtx._getSwitchInCls(itemIndexRef, state, startAnimationRef.current)
                    
                    return (
                        <JSXEl
                            {...props}
                            ref={ref}
                            className={rclassnames(props, [
                                `carousel-item`,
                                switchInCls,
                            ])}
                        >
                            {children}
                        </JSXEl>
                    )
                }}
            </Transition>
        )
    }
)

Carousel.Control = function ({
    children,
    as: _as = Anchor,
    prev = false,
    next = !prev,
    active = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });
    
    prev = !next

    const controlType = prev ? 'prev' : 'next'
    const dfltText = prev ? `Previous` : `Next`

    const carouselCtx = tryUseContext(CarouselContext)
    if (carouselCtx.symbol !== symbol)
        throw new Error(`[Carousel.Control] Carousel.Control must be put under Carousel!`)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `carousel-control-${controlType}`,
            ])}
            role="button"
            data-slide={controlType}
            onClick={() => {
                carouselCtx._onSwitch(controlType)
            }}
        >
            <span class={`carousel-control-${controlType}-icon`} aria-hidden="true"></span>
            <span class="sr-only">{dfltText}</span>
        </JSXEl>
    )
}

Carousel.PlaceholderImage = function ({
    children,
    size = '',
    ...props
}) {
    size = filterPlaceholderSize(size)

    return (
        <PlaceholderImage
            {...props}
            className={rclassnames(props, [
                'bd-placeholder-img',
                size && `bd-placeholder-img-${size}`
            ])}
        >
            {children}
        </PlaceholderImage>
    )
}

export default Carousel