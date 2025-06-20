export interface ListNode {
    val?: number;
    next: ListNode | null;
}

/**
 * @param {ListNode} a
 * @param {ListNode} b
 * @return {ListNode}
 */
export function addTwoNumbers(a: ListNode | null, b: ListNode | null) {
    let dummy: ListNode = { next: null },
        p = dummy,
        carry = 0;
    while (a || b || carry) {
        let x = a && a.val ? a.val : 0,
            y = b && b.val ? b.val : 0,
            sum = x + y + carry;
        carry = Math.floor(sum / 10);
        p.next = { val: sum % 10, next: null };
        p = p.next;
        a = a ? a.next : null;
        b = b ? b.next : null;
    }
    return dummy.next;
}