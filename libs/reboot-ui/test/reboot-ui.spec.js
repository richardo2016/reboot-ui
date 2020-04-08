import * as RebootUI from '../';

test('All Components', () => {
    expect(RebootUI.default).toEqual(RebootUI)
    
    expect(Object.keys(RebootUI)).toEqual([
        "Alert",
        "Badge",
        "Breadcrumb",
        "Button",
        "ButtonGroup",
        "ButtonToolbar",
        "Card",
        "Carousel",
        "Checkbox",
        "Col",
        "Collapse",
        "Container",
        "Dropdown",
        "Form",
        "Input",
        "InputGroup",
        "Jumbotron",
        "Layout",
        "ListGroup",
        "Modal",
        "Nav",
        "NavTab",
        "Navbar",
        "Pagination",
        "Popover",
        "Progress",
        "Radio",
        "Row",
        "Select",
        "Spinner",
        "Table",
        "Textarea",
        "Tooltip",
        "default",
    ])
});