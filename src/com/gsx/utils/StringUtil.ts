/**
 * @file The string util.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export abstract class StringUtil {
    /**
     * To upper case the initial.
     * @param {string} str
     */
    static toUpperCaseInitial(str: string): string {
        return str.trim().replace(/^(.)/, function (initial: string): string {
            return initial.toUpperCase();
        });
    }
}
