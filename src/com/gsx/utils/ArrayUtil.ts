/**
 * @file The array util.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export abstract class ArrayUtil {

    /**
     * The list contains item or not.
     * @param {any[]} list
     * @param {any} item
     */
    static contain(list: any[], item: any): boolean {
        for (var i = 0, j = list.length; i < j; ++i) {
            if (list[i] === item) {
                return true;
            }
        }
        return false;
    }
}
