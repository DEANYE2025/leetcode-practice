import trap from '../src/42.trap';

describe('trap rain water', () => {
    test('example 1: [0,1,0,2,1,0,1,3,2,1,2,1]', () => {
        expect(trap([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
    });

    test('example 2: [4,2,0,3,2,5]', () => {
        expect(trap([4,2,0,3,2,5])).toBe(9);
    });

    test('edge case: empty array', () => {
        expect(trap([])).toBe(0);
    });

    test('edge case: single bar', () => {
        expect(trap([4])).toBe(0);
    });

    test('edge case: all same height', () => {
        expect(trap([2,2,2,2,2])).toBe(0);
    });

    test('valley shape', () => {
        expect(trap([5,0,5])).toBe(5);
    });

    test.only('descending then ascending', () => {
        expect(trap([5,4,1,2,3,4,5])).toBe(11);
    });
});
