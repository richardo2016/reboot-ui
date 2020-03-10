import json from '../../@data/data.json'

// export {
//     getOffsetAboutClsNameListFromBreakPointConfig,
//     resolveJSXElement,
//     getDivisionAboutClsNameListFromBreakPointConfig,
//     toggleCls
// } from './ui'
// export {
//     useFixupPopoverToken,
//     createPopup,
//     filterPopperTrigger,
//     filterPlacement,
//     parsePlacement,
// } from './popper'
export { getHTMLElementFromJSXElement } from '../../../../utils/react-like'
export { isReactTypeOf } from '../../../../utils/react-like'
export { parseChildrenProp } from '../../../../utils/react-like'
export { rclassnames, tryUseContext } from "../../../../utils/react-like"
export { default as useClickaway } from '../../../../utils/react-hooks/use-clickaway'
export { default as useHoveraway } from '../../../../utils/react-hooks/use-hoveraway'
export { default as useKeyPress } from '../../../../utils/react-hooks/use-keypress'
export { useInterval } from '../../../../utils/react-hooks/use-timer'

export { resolveJSXElement } from './_base.js'
export { flatten, arraify } from './_base'
export { coerceInteger, coerceFloat } from './_base'

export const themes = json['theme-colors'].map(theme => theme.name)

export const sizes = json['breakpoints'].map(x => x.breakpoint).filter(x => x)

export const TransitionTimeouts = {
    Fade:     150, // $transition-fade
    Collapse: 350, // $transition-collapse
    Modal:    300, // $modal-transition
    Carousel: 600, // $carousel-transition
};

export const TransitionStates = {
    EXITED: 'exited',
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',
};

export const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const inputTypes = [
    /**
     * @description <input> elements of type button are rendered as simple push buttons, which can be programmed to control custom functionality anywhere on a webpage as required when assigned an event handler function (typically for the click event).
     */
    'button',
    /**
     * @description <input> elements of type checkbox are rendered by default as boxes that are checked (ticked) when activated, like you might see in an official government paper form. The exact appearance depends upon the operating system configuration under which the browser is running.  Generally this is a square but it may have rounded corners.  A checkbox allows you to select single values for submission in a form (or not).
     */
    'checkbox',
    /**
     * @description <input> elements of type color provide a user interface element that lets a user specify a color, either by using a visual color picker interface or by entering the color into a text field in #rrggbb hexadecimal format.
     */
    'color',
    /**
     * @description <input> elements of type="date" create input fields that let the user enter a date, either with a textbox that validates the input or a special date picker interface.
     */
    'date',
    /**
     * @description The HTML <input type="datetime"> was a control for entering a date and time (hour, minute, second, and fraction of a second) as well as a timezone. This feature has been removed from WHATWG HTML, and is no longer supported in browsers.
     */
    'datetime',
    /**
     * @description <input> elements of type datetime-local create input controls that let the user easily enter both a date and a time, including the year, month, and day as well as the time in hours and minutes.
     * @deprecated
     */
    'datetime-local',
    /**
     * @description <input> elements of type email are used to let the user enter and edit an e-mail address, or, if the multiple attribute is specified, a list of e-mail addresses.
     */
    'email',
    /**
     * @description <input> elements with type="file" let the user choose one or more files from their device storage. Once chosen, the files can be uploaded to a server using form submission, or manipulated using JavaScript code and the File API.
     */
    'file',
    /**
     * @description <input> elements of type "hidden" let web developers include data that cannot be seen or modified by users when a form is submitted. For example, the ID of the content that is currently being ordered or edited, or a unique security token. Hidden inputs are completely invisible in the rendered page, and there is no way to make it visible in the page\'s content.
     */
    'hidden',
    /**
     * @description <input> elements of type image are used to create graphical submit buttons, i.e. submit buttons that take the form of an image rather than text.
     */
    'image',
    /**
     * @description <input> elements of type month create input fields that let the user enter a month and year allowing a month and year to be easily entered. The value is a string whose value is in the format "YYYY-MM", where YYYY is the four-digit year and MM is the month number.
     */
    'month',
    /**
     * @description <input> elements of type number are used to let the user enter a number. They include built-in validation to reject non-numerical entries.
     */
    'number',
    /**
     * @description <input> elements of type password provide a way for the user to securely enter a password.
     */
    'password',
    /**
     * @description <input> elements of type radio are generally used in radio groups—collections of radio buttons describing a set of related options.
     */
    'radio',
    /**
     * @description <input> elements of type range let the user specify a numeric value which must be no less than a given value, and no more than another given value. The precise value, however, is not considered important. This is typically represented using a slider or dial control rather than a text entry box like the number input type.
     */
    'range',
    /**
     * @description <input> elements of type "reset"  are rendered as buttons, with a default click event handler that resets all of the inputs in the form to their initial values.
     */
    'reset',
    /**
     * @description <input> elements of type search are text fields designed for the user to enter search queries into. These are functionally identical to text inputs, but may be styled differently by the user agent. 
     */
    'search',
    /**
     * @description <input> elements of type submit are rendered as buttons. When the click event occurs (typically because the user clicked the button), the user agent attempts to submit the form to the server.
     */
    'submit',
    /**
     * @description <input> elements of type tel are used to let the user enter and edit a telephone number. Unlike <input type="email"> and <input type="url"> , the input value is not automatically validated to a particular format before the form can be submitted, because formats for telephone numbers vary so much around the world.
     */
    'tel',
    /**
     * @description <input> elements of type text create basic single-line text fields.
     */
    'text',
    /**
     * @description <input> elements of type time create input fields designed to let the user easily enter a time (hours and minutes, and optionally seconds).
     */
    'time',
    /**
     * @description <input> elements of type url are used to let the user enter and edit a URL.
     */
    'url',
    /**
     * @description <input> elements of type week create input fields allowing easy entry of a year plus the ISO 8601 week number during that year (i.e., week 1 to 52 or 53).
     */
    'week',
]

export function filterThemeName (theme = '') {
    if (themes.includes(theme)) return theme
}

export function filterSize (size = '') {
    if (sizes.includes(size)) return size
}

export function filterFormControlSize (size = '') {
    if (['sm', 'lg'].includes(size)) return size
}

export function filterPlaceholderSize (size = '') {
    if (['sm', 'lg'].includes(size)) return size
}

export function filterPaginationSize (size = '') {
    if (['sm', 'lg'].includes(size)) return size
}

export function filterInputType (type = '') {
    if (inputTypes.includes(type)) return type
}

export function filterAxis (axis = '') {
    switch (axis) {
        default:
        case 'x':
        case 'h':
        case 'horizontal':
            axis = 'horizontal'
            break
        case 'y':
        case 'v':
        case 'vertical':
            axis = 'vertical'
            break
    }

    return axis
}

export function filterPopperTrigger (trigger) {
    switch (trigger) {
      case 'click':
      case 'hover':
        break
      default:
        trigger = 'click'
        break
    }
  
    return trigger
  }
  
  export function filterPlacement (placement = 'bottom-start') {
    return parsePlacement(placement).placement || 'bottom-start'
  }
  
  export function parsePlacement (placement = 'bottom-start') {
    let direction
    let axis
  
    switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
            direction = 'top';
            axis = 'vertical';
            break;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
            direction = 'bottom';
            axis = 'vertical';
            break;
        case 'left':
        case 'left-start':
        case 'left-end':
            direction = 'left';
            axis = 'horizontal';
            break;
        case 'right':
        case 'right-start':
        case 'right-end':
            direction = 'right';
            axis = 'horizontal';
            break;
        default:
        // case 'auto':
        //     placement = 'auto'
        //     direction = 'auto'
        // case 'auto-start':
        // case 'auto-end':
        //     axis = 'auto'
            break
    }
  
    return {
        placement,
        direction,
        axis,
    }
  }