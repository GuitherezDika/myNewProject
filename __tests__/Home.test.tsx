import 'react-native';
import React from 'react';
import Home from '../src2/Home';
import renderer from 'react-test-renderer';
import {it, test, expect} from '@jest/globals';

test('Home snapShot', () => {
    const snap = renderer.create(
        <Home />
    ).toJSON();
    expect(snap).toMatchSnapshot();
})  