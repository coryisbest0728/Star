/**
 * @file 被装载物接口。
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface IContained {
    /**
     * 获取其父亲。
     */
    getParent(): IContained;
}
