/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x: number) {
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    let reverted = 0;
    while (x > reverted) {
        reverted = reverted * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    return x == Math.floor(reverted / 10) || x == reverted;
};

export default isPalindrome;