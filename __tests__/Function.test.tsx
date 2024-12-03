import 'react-native';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import {test, expect, } from '@jest/globals';
import Home from '../src2/Home';

// test('Username Snapshot', () => {
//     const {getByTestId} = render(<Home />);
//     const textInput = getByTestId('username');

//     fireEvent.changeText(textInput, 'Andika123');

//     expect(textInput.props.value).toBe('Andika123');
// })

const findElement = (tree, element) => {
    // console.log('t= ',tree);
    /*
        t=  {
        type: 'View',
        props: {
            style: { flex: 1, alignItems: 'center', justifyContent: 'center' }
        },
        children: [ { type: 'TextInput', props: [Object], children: null } ]
        }
    */
    // console.log('tc= ',tree.children);
    /*
        tc=  [
        {
            type: 'TextInput',
            props: {
            testID: 'username',
            onChangeText: [Function: onChangeText],
            style: [Object],
            placeholder: 'Enter the username'
            },
            children: null
        }
        ]
    */
    // console.log('e= ', element); // 'username'
    
    let result = undefined;
    for ( dataId in tree.children) {
        console.log('DI = ',dataId);
        if(tree.children[dataId].props.testID == element){
            result = true
        }
    }
    return result;
}

test('username ss ', () => {
    const snap = renderer.create(<Home />).toJSON();

    expect(findElement(snap, 'username')).toBeDefined();
    // test case 1 => testID is existed or not
})