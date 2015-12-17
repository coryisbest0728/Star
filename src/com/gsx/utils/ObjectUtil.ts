/**
 * @file The object util.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export abstract class ObjectUtil {

    /**
     * To upper case the initial.
     * @param {Object} target
     * @param {Object}
     * @return {Object}
     */
    static mixin(target: Object, ...args: Object[]): Object {
        var mixined: Object;
        if (args && args.length > 0) {
            mixined = args[args.length - 1];
        }
        for (var i: number = args.length - 1; i >= 1; --i) {
            mixined = ObjectUtil.mixinOne(args[i - 1], mixined);
        }
        return mixined ? ObjectUtil.mixinOne(target, mixined) : target;
    }

    /**
     * 
     * @param {Object} target
     * @param {Object}
     * @return {Object}
     */
    static mixinOne(target: Object, mixined: Object): Object {
        for (var i in mixined) {
            target[i] = mixined[i];
        }
        return target;
    }
}
