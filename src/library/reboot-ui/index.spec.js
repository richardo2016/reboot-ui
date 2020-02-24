const path = require('path')

const pkgRoot = require.resolve('../../../package.json')
const pkg = require(pkgRoot)
const ROOT = path.dirname(pkgRoot)

const RebootUI = require(path.resolve(ROOT, pkg.browser))

const React = require('react')
const ReactDOM = require('react-dom')

describe('RebootUI', () => {
    it('RebootUI - components', () => {
        expect(
            Object.keys(RebootUI)
        ).toEqual([
            "Alert",
            "Badge",
            "Breadcrumb",
            "Button",
            "ButtonGroup",
            "ButtonToolbar",
            "Col",
            "Container",
            "Dropdown",
            "DropdownItem",
            "DropdownMenu",
            "Layout",
            "Nav",
            "Navbar",
            "Row",
            "Table",
        ]);
    });
  });