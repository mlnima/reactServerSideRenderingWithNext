import {_uniqBy} from '../_uniqBy'


const mockData = [
    {
        id:1,
        name:'AAAAA',
        age:120
    },
    {
        id:2,
        name:'BBBBB',
        age:18
    },
    {
        id:3,
        name:'CCCCC',
        age:25
    },
    {
        id:1,
        name:'CCCCC',
        age:25
    },
]


const expectData = [
    {
        id:2,
        name:'BBBBB',
        age:18
    },
    {
        id:3,
        name:'CCCCC',
        age:25
    },
    {
        id:1,
        name:'CCCCC',
        age:25
    },
]


describe('Make array of object unique', () => {
    test('_uniqBy', () => {
        expect(_uniqBy(mockData,'id')).toEqual(expect.arrayContaining(expectData));
    });
});