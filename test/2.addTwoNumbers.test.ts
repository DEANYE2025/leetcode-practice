import {
    ListNode,
    addTwoNumbers
} from '../src/2.addTwoNumbers';

function toList(arr: number[]) {
    let dummy: ListNode = { next: null }, p = dummy;
    for (let val of arr) {
        p = p.next = { val: val, next: null};
    }
    return dummy.next;
}

function toArray(node: ListNode | null) {
    let arr = [];
    while (node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
}

test('342 + 465 = 807', () => {
    let l1 = toList([2,4,3]);
    let l2 = toList([5,6,4]);
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([7,0,8]);
});

test('should handle adding zeros (Example 2: 0 + 0 = 0)', () => {
    let l1 = toList([0]);
    let l2 = toList([0]);
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([0]);
});

test('should handle different lengths with carry-over (Example 3: 9999999 + 9999 = 10009998)', () => {
    let l1 = toList([9, 9, 9, 9, 9, 9, 9]);
    let l2 = toList([9, 9, 9, 9]);
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
});

test('should handle simple carry-over', () => {
    let l1 = toList([5]);
    let l2 = toList([5]);
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([0, 1]); // 5 + 5 = 10
});

test('should handle large numbers with many carry-overs', () => {
    let l1 = toList([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]); // Represents 1 followed by 30 zeros then 1
    let l2 = toList([5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
});

test('should handle one empty list', () => {
    let l1 = toList([1, 2, 3]);
    let l2 = null; // Represents 0
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([1, 2, 3]);
});

test('should handle both empty lists', () => {
    let l1 = null;
    let l2 = null;
    let res = addTwoNumbers(l1, l2);
    expect(toArray(res)).toEqual([]); // Or [0] if the problem implies 0 for empty lists
    // LeetCode's constraints say "non-empty linked lists", so this case might not be strictly necessary per problem statement.
    // If it returns [0] for l1=[0],l2=[0], it might return [0] for null inputs too.
    // The implementation here returns [0] for null, null due to `carry !== 0` check.
    // If you want strictly [], you'd need to adjust `addTwoNumbers` to check for l1/l2 being null at the very start.
});