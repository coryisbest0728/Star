/**
 * @file The number util.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export abstract class NumberUtil {
    /**
     * Get the random number.
     * @param {number} digit The digit number. The default is 8.
     * @return {string}
     */
    static getRandom(digit: number = 8): string {
        var chars: string[] = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g','h',
            'i', 'j', 'k','l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        var random: string = '';
        for (var i: number = 0; i < digit; ++i) {
            random += chars[Math.ceil(Math.random() * 35)];
        }
        return random;
    }
}
