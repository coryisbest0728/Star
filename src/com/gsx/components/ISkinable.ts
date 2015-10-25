/**
 * @file Skin ability interface.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface ISkinable {
    /**
     * 获取基础皮肤类型。
     */
    getBaseSkinClass(): string;

    /**
     * 获取特定皮肤类型。
     */
    getSpecSkinClass(): string;
}
