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
         * @WIP
         * @description if set hover, pause on mouse enter carousel and resume on mouse leave carousel
         * 
         * @enum 'hover'
         * 
         * @default 'hover'
         */
        pause = 'hover',
        /**
         * @WIP
         * 
         * @enum carousel - autoplay on load
         * @enum (default) - autoplay after user's first manul switch
         */
        ride,
        /**
         * @WIP
         * @description the interval at which the carousel automatically cycles
         */
        interval = 5000,
        /**
         * @WIP
         * @description whether the left-arrow and right-arrow keys could control the carousel
         */
        keyboard = false,
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

        const switchActiveIdx = React.useCallback((nextIdx) => {
            nextIdx = coerceInteger(nextIdx, 0)
            nextIdx = Math.max(nextIdx, 0)

            nextIdx = Math.min(nextIdx, slidesRef.current.length - 1)

            setCurrentIdx(nextIdx)
        }, [])

        const dirOffset = lastIndexRef.current - currentIdxRef.current
        const switchType = (() => {
            if (dirOffset > 0) return SWICH_TYPES.FROM_RIGHT_TO_LEFT
            if (dirOffset < 0) return SWICH_TYPES.FROM_LEFT_TO_RIGHT

            if (dirOffset === 0) return SWICH_TYPES.NONE
        })()

        const context = {
            symbol,
            switchType,
            slides: slidesRef.current,
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
            _onClickControl: (controlType) => {
                switch (controlType) {
                    case 'prev':
                        switchActiveIdx(currentIdxRef.current - 1)
                        break
                    case 'next':
                        switchActiveIdx(currentIdxRef.current + 1)
                        break
                    default:
                        throw new Error(`unexpected controlType! contact with author of reboot-ui!`)
                }
            },
            _onClickIndicator: (indicatorIdx) => {
                switchActiveIdx(indicatorIdx)
            },
            _addSlide: ({ ref, itemIndexRef } = {}, idx) => {
                const slides = slidesRef.current
                idx = coerceInteger(idx, slides.length)

                idx = Math.min(idx, slides.length)
                idx = Math.max(idx, 0)

                itemIndexRef.current = idx

                const newSlide = { ref, itemIndexRef }
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
                    {...ride && {
                        'data-ride': ride
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
                carouselCtx._onClickIndicator($indicatorIndex)
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
         * @WIP
         * @description individual interval for this carousel item
         */
        interval,
        [useToken('itemIndex')]: $itemIndex,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const [startAnimationRef, setStartAnimation] = useStartAnimation(false)

        ref = ref || React.useRef(null)

        const itemIndexRef = React.useRef($itemIndex)
    
        const carouselCtx = tryUseContext(CarouselContext)
        if (carouselCtx.symbol !== symbol)
            throw new Error(`[Carousel.Control] Carousel.Control must be put under Carousel!`)
        
        const active = carouselCtx._isCurrent(itemIndexRef)

        React.useEffect(() => {
            const slide = carouselCtx._addSlide({ ref, itemIndexRef })
    
            return () => {
                carouselCtx._removeSlide(slide)
            }
        }, [])
    
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
                  typeof props.onExiting === 'function' && props.onExiting(node);
                }}
                onExited={(node) => {
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
                carouselCtx._onClickControl(controlType)
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