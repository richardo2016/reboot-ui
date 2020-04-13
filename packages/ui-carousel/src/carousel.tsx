import React from 'react'

import { Transition } from 'react-transition-group';

import Anchor from '@reboot-ui/icomponent-anchor'

import {
    resolveJSXElement, RebootUI,
    rclassnames,
    tryUseContext,
    isReactTypeOf,
    TransitionTimeouts,
    TransitionStates,
    filterPlaceholderSize,
    coerceInteger,
    arraify,
    flatten,
    useInterval,
    useKeyPress,
} from '@reboot-ui/common'

const RUNTIME_TOKEN = Date.now()
const useToken = (str: string) => `${RUNTIME_TOKEN}_${str}`

interface CarouselContextType {
    symbol?: Symbol
    switchType: RebootUI.ValueOf<typeof SWICH_TYPES> | undefined
    itemDefaultInterval: number
    slides: SlideInfo[]
    getPlayInfo: () => ContextSlideInfo
    _isCurrent: (ref: SlideInfo['itemIndexRef']) => boolean
    _getSwitchInCls: (ref: SlideInfo['itemIndexRef'], tState: RebootUI.ValueOf<typeof TransitionStates>, startAnimation: boolean) => [
        // direction
        false | 'carousel-item-left' | 'carousel-item-right',
        // order
        false | 'carousel-item-next' | 'carousel-item-prev',
        // active
        false | 'active'
    ]
    _onSwitch: (nextIdx: number | 'prev' | 'next') => void
    _toggleFreezingSlide: (nextFreeing?: boolean) => void
    _addSlide: (sld: SlideInfo, idx?: number) => SlideInfo
    _removeSlide: (sld: SlideInfo) => void
}
const CarouselContext = React.createContext<CarouselContextType>({} as any)

const SWICH_TYPES = {
    FROM_LEFT_TO_RIGHT: 'FROM_LEFT_TO_RIGHT',
    FROM_RIGHT_TO_LEFT: 'FROM_RIGHT_TO_LEFT',
    NONE: 'NONE',
}

const symbol = Symbol('#Carousel')

interface SlideInfo {
    interval: number
    itemIndexRef: React.MutableRefObject<number>
    ref?: RebootUI.ReactRef
}

interface ContextSlideInfo {
    currentSlide: SlideInfo
    currentIndex: number
    paused: boolean
    startedAutoplay: boolean
}

const useSlides = (): [
    React.MutableRefObject<SlideInfo[]>,
    (nextVal: SlideInfo[]) => void
] => {
    const slidesRef = React.useRef<SlideInfo[]>([])
    const [_, setSlides] = React.useState<SlideInfo[]>([])
    const update = ((value: SlideInfo[]) => {
        slidesRef.current = value;
        setSlides(Array.from(slidesRef.current))
    })

    return [slidesRef, update]
}

const useIndexInfo = (initIdx = 0): [
    React.MutableRefObject<number>,
    React.MutableRefObject<number>,
    (nextVal: number) => void
] => {
    const indexRef = React.useRef(initIdx)
    const lastIndexRef = React.useRef(initIdx)
    const [_, setCurIndex] = React.useState(initIdx)

    const update = ((value: number) => {
        lastIndexRef.current = indexRef.current;

        indexRef.current = value;
        setCurIndex(indexRef.current)
    })

    return [lastIndexRef, indexRef, update]
}

type PauseMode = 'hover'

const usePauseOnHover = (pauseMode: PauseMode): [
    React.MutableRefObject<boolean>,
    () => void,
    () => void,
] => {
    const [ , setPause ] = React.useState<boolean>(false)
    const pauseRef = React.useRef<boolean>(true)

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

export type RideMode = 'carousel'
const useStartAutoplay = (rideMode?: RideMode): [
    React.MutableRefObject<boolean>,
    () => void
] => {
    const [, setStartAutoplay] = React.useState(false)
    // if rideMode === 'carousel, autoplay on load 
    const ref = React.useRef<boolean>(isAutoplayOnLoad(rideMode))

    const onUserManulSwitched = React.useCallback(() => {
        setStartAutoplay(ref.current = true)
    }, [rideMode])

    return [ref, onUserManulSwitched]
}

const useCarouseInterval = (_itv = DFLT_INTERVAL): [
   React.MutableRefObject<number>,
   (nextVal: number) => void
] => {
    const [, setInterval] = React.useState(_itv)
    const ref = React.useRef(_itv)

    const update = React.useCallback((new_itv) => {
        // ref.current = new_itv
        setInterval(ref.current = new_itv)
    }, [])

    return [ref, update]
}

const useKeyboard = (latestValue: boolean | boolean) => {
    const ref = React.useRef<boolean | null>(null)
    ref.current = latestValue
    return ref
}

const useFreezingAnimation = (value = false): [
    React.MutableRefObject<boolean>,
    (nextVal?: boolean) => void
] => {
    const ref = React.useRef<boolean>(value)
    const toggle = (nextValue: boolean = !ref.current) => {
        ref.current = nextValue
    }
    return [ref, toggle]
}

const DFLT_INTERVAL = 5000

const isAutoplayOnLoad = (rideMode: any) => rideMode === 'carousel'
/**
 * @see https://getbootstrap.com/docs/4.4/components/carousel
 * 
 * @inner-content `.carousel`
 * @inner-content `.carousel-inner`
 * @inner-content `.carousel-item`
 */
type CarouselType = RebootUI.IComponentPropsWithChildren<{
    pause: 'hover'
    slide?: boolean
    ride?: RideMode
    interval?: number | null
    keyboard?: boolean
    crossFade?: boolean
    onMouseEnter?: (evt: MouseEvent) => void
    onMouseLeave?: (evt: MouseEvent) => void
}>

const CarouselProto = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        slide = true,
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
    }: CarouselType, ref: RebootUI.ReactRef<any, CarouselType>) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

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
        }, [])

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

        const INTERVAL = coerceInteger(interval, 0)
        interval_about: {
            const [intervalRef, updateInterval] = useCarouseInterval(INTERVAL)
            useInterval(() => {
                if (!intervalRef.current) return ;
                const playInfo = context.getPlayInfo()

                if (playInfo.paused) return ;
                if (!playInfo.startedAutoplay) return ;

                context._onSwitch(playInfo.currentIndex + 1);
            }, intervalRef.current)
            // update interval(from item) on slide changed
            React.useEffect(() => {
                const currentSlide = context.getPlayInfo().currentSlide

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
        
        const context: CarouselContextType = {
            symbol,
            switchType,
            itemDefaultInterval: coerceInteger(INTERVAL, 0),
            slides: slidesRef.current,
            getPlayInfo (
                key?: keyof ContextSlideInfo
            ): ContextSlideInfo {
                const info: ContextSlideInfo = {
                    currentSlide: context.slides[currentIdxRef.current],
                    currentIndex: currentIdxRef.current,
                    paused: pauseRef.current,
                    startedAutoplay: startedAutoplayRef.current,
                }

                return info
            },
            _isCurrent: (slideIndexRef: SlideInfo['itemIndexRef']) => {
                return slideIndexRef.current === currentIdxRef.current
            },
            _getSwitchInCls: (_, tState: RebootUI.ValueOf<typeof TransitionStates>, startAnimation: boolean) => {
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
            _onSwitch: (nextIdx: number | 'prev' | 'next') => {
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
            _addSlide: ({
                ref,
                interval = INTERVAL,
                itemIndexRef
            }: SlideInfo, idx?: number) => {
                const slides = slidesRef.current
                idx = coerceInteger(idx, slides.length)

                idx = Math.min(idx, slides.length)
                idx = Math.max(idx, 0)

                itemIndexRef.current = idx

                const newSlide: SlideInfo = { ref, interval, itemIndexRef }
                const _slides = slides.slice(0, idx).concat(newSlide)
                    .concat(slides.slice(idx + 1))
                setSlides(_slides)

                return newSlide
            },
            _removeSlide: (slide: SlideInfo) => {
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

        const flattenedList = flatten(arraify(children)) as React.ReactElement[]
        let itemList: React.ReactElement[] = []
        let controlList: React.ReactElement[] = []
        let indicatorsNode = null
        let restChildren: React.ReactElement[] = []
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
                    (_, idx) => {
                        const props = { [useToken('indicatorIndex')]: idx };
                        return <CarouselIndicator {...props} />
                    }
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
                    onMouseEnter={(nativeEvent: MouseEvent) => {
                        onMouseEnter()
                        typeof props.onMouseEnter === 'function' && props.onMouseEnter(nativeEvent)
                    }}
                    onMouseLeave={(nativeEvent: MouseEvent) => {
                        onMouseLeave()
                        typeof props.onMouseLeave === 'function' && props.onMouseLeave(nativeEvent)
                    }}
                    ref={ref}
                >
                    {indicatorsNode}
                    <Carousel.Inner>
                        {itemList}
                    </Carousel.Inner>
                    {controlList}
                    {restChildren}
                </JSXEl>
            </CarouselContext.Provider>
        )
    }
)

const Carousel = function (props: RebootUI.IGetReactLikeComponentProps<typeof CarouselProto>) {
    return <CarouselProto {...props} />
}

export default Carousel

Carousel.Indicators = function ({
    children,
    as: _as = 'ol',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'ol' | 'ul'>
}>) {
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
    // @ts-ignore
    [useToken('indicatorIndex')]: $indicatorIndex,
    ...props
}: RebootUI.IComponentPropsWithChildren<{}>) {
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
}: RebootUI.IComponentPropsWithChildren<{}>) {
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
}: RebootUI.IComponentPropsWithChildren<{}>) {
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

const useStartAnimation = (initState = false): [
    React.MutableRefObject<boolean>,
    (nextVal: boolean) => void
] => {
    const ref = React.useRef<boolean>(initState)
    const [_, set] = React.useState<boolean>(initState)

    const update = ((value: boolean) => {
        ref.current = value;
        set(ref.current)
    })

    return [ref, update]
}

Carousel.Item = React.forwardRef(
    function (
        {
            children,
            as: _as = 'div',
            /**
             * @description individual interval for this carousel item
             */
            interval,
            ...props
        }: RebootUI.IComponentPropsWithChildren<{
            interval?: number
        } & Partial<RebootUI.TransitionGroupProps>>,
        ref
    ) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const {
            // @ts-ignore
            [useToken('itemIndex')]: $itemIndex,
        } = props || {};

        const itemIndexRef = React.useRef<number>($itemIndex)
    
        const carouselCtx = tryUseContext(CarouselContext)
        if (carouselCtx.symbol !== symbol)
            throw new Error(`[Carousel.Control] Carousel.Control must be put under Carousel!`)

        const [startAnimationRef, setStartAnimation] = useStartAnimation(false)
        // React.useEffect(() => {
        //     carouselCtx._toggleFreezingSlide(startAnimationRef.current)
        // }, [startAnimationRef.current])

        const active = carouselCtx._isCurrent(itemIndexRef)
        if (interval === undefined) interval = coerceInteger(carouselCtx.itemDefaultInterval, 0)
        else if (typeof interval !== null) interval = coerceInteger(interval)

        const INTERVAL = interval
        // register item to carousel
        React.useEffect(() => {
            const slide = carouselCtx._addSlide({ ref, interval: INTERVAL, itemIndexRef })
    
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
    as: _as = Anchor as any,
    prev = false,
    next = !prev,
    active = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    prev?: boolean
    next?: boolean
    active?: boolean
}>) {
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
            <span className={`carousel-control-${controlType}-icon`} aria-hidden="true"></span>
            <span className="sr-only">{dfltText}</span>
        </JSXEl>
    )
}

Carousel.PlaceholderImage = function ({
    children,
    as: _as = Anchor as any,
    size,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    size?: RebootUI.BinarySizeType
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    size = filterPlaceholderSize(size)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'bd-placeholder-img',
                size && `bd-placeholder-img-${size}`
            ])}
        >
            {children}
        </JSXEl>
    )
}