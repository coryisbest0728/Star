/**
 * @file Skin ability interface.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface ISkinable {
    /**
     * Get base skin class name.
     */
    getBaseSkinClass(): string;

    /**
     * Get the spec skin class name.
     */
    getSpecSkinClass(): string;

    /**
     * Add the skin class name.
     */
    addSpecSkinClass(skinClass: string): void;

    /**
     * remove the skin class name.
     */
    removeSpecSkinClass(skinClass: string): void;

    /**
     * The given skin class has existed or not.
     * @return {boolean} exist or not.
     */
    hasSkinClass(skinClass: string): boolean;
}
