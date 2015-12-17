/**
 * @file The string util.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export abstract class StringUtil {
    /**
     * To upper case the initial.
     * @param {string} str
     * @return {string}
     */
    static toUpperCaseInitial(str: string): string {
        return str.trim().replace(/^(.)/, function (initial: string): string {
            return initial.toUpperCase();
        });
    }

    /**
     * Format the attr name.Split - and put the initial char to upper case.
     * @param {string} str
     */
    static pressStr2UpperCaseInitial(str: string): string {
        return str.split('-').map(function (strFrag: string): string {
            return StringUtil.toUpperCaseInitial(strFrag);
        }).join('');
    }
}
