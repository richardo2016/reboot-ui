// component.test.js
import React from 'react';
import Button from './component';
import renderer from 'react-test-renderer';

import { themes } from '../../@components/common'

const btnSizes = ['sm', 'lg']

test('Button - html attributes', () => {
    const component = renderer.create(
        <Button>Reboot UI</Button>,
    );

    let button = component.toJSON();
    expect(button.props.className).toEqual(expect.stringContaining('btn'))
    expect(button.props.type).toBe('button')
    expect(button.children[0]).toBe('Reboot UI')

    // re-rendering
    button = component.toJSON();
    expect(button).toMatchSnapshot();

    // re-rendering
    button = component.toJSON();
    expect(button).toMatchSnapshot();

    // re-rendering
    button = component.toJSON();
    expect(button).toMatchSnapshot();
});

test('Button - (prop: type)', () => {
    themes.forEach(theme => {
        const component = renderer.create(
            <Button theme={theme}>Reboot UI</Button>,
        );
    
        let button = component.toJSON();
        expect(button.props.className).toEqual(expect.stringContaining('btn'))
        expect(button.props.className).toEqual(expect.stringContaining(`btn-${theme}`))
    })
});

test('Button - (prop: size)', () => {
    btnSizes.forEach(size => {
        const component = renderer.create(
            <Button size={size}>Reboot UI</Button>,
        );
    
        let button = component.toJSON();
        expect(button.props.className).toEqual(expect.stringContaining('btn'))
        expect(button.props.className).toEqual(expect.stringContaining(`btn-${size}`))
    })
});

test('Button - (prop: outline)', () => {
    themes.forEach(theme => {
        const component = renderer.create(
            <Button outline type={theme}>Reboot UI</Button>,
        );
    
        let button = component.toJSON();
        expect(button.props.className).toEqual(expect.stringContaining('btn'))
        switch (theme) {
            default:
                expect(button.props.className).toEqual(expect.stringContaining(`btn-outline-${theme}`))
                break
            case 'link':
                expect(button.props.className).toEqual(expect.stringContaining(`btn-${theme}`))
                break
        }
    })
});

test('Button - (prop: active)', () => {
    const component = renderer.create(
        <Button active>Reboot UI</Button>,
    );

    let button = component.toJSON();
    expect(button.props.className).toEqual(expect.stringContaining('active'))
});

test('Button - (prop: disabled)', () => {
    let button

    button = renderer.create(
        <Button disabled>Reboot UI</Button>,
    ).toJSON();
    expect(button.props.className).not.toEqual(expect.stringContaining('disabled'))

    button = renderer.create(
        <Button as={'input'} disabled>Reboot UI</Button>,
    ).toJSON();
    expect(button.props.className).not.toEqual(expect.stringContaining('disabled'))

    button = renderer.create(
        <Button as={'a'} disabled>Reboot UI</Button>,
    ).toJSON();
    expect(button.props.className).toEqual(expect.stringContaining('disabled'))
});