/**
 * @file The skinable ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ISkinable} from 'com/gsx/components/ISkinable';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class SkinableComponent extends UIComponent implements ISkinable {

    private specSkinClass: string = '';

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return '';
    }

    /**
     * Get the original specific skin class name.
     * @return {string} The original specific skin class name.
     */
    protected getOriginSpecSkinClass(): string {
        return '';
    }

    /**
     * @override
     */
    public getSpecSkinClass(): string {
        var node = this.getNode();
        if (node) {
            return this.getSpecSkinClassFromNode();
        } else {
            return this.specSkinClass || this.getOriginSpecSkinClass();
        }
    }

    /**
     * Get the skin class name.
     * @return {string} Get the skin class name.
     */
    public getSkinClass(): string {
        return this.getBaseSkinClass() + ' ' + this.getSpecSkinClass();
    }

    /**
     * Get specific skin class name from component node.
     * @return {string} The specific skin class name.
     */
    private getSpecSkinClassFromNode(): string {
        var classNames = (<HTMLElement>this.getNode()).className.trim().split(' ');
        var baseSkinClasses = this.getBaseSkinClass().trim().split(' ');
        return classNames.filter(function (className) {
            className = className.trim();
            for (var i = 0, j = baseSkinClasses.length; i < j; ++i) {
                var baseSkinClass = baseSkinClasses[i].trim();
                if (baseSkinClass === className) {
                    return false;
                }
            }
            return true;
        }).join(' ');
    }

    /**
     * Set the spec skin class to change the skin style of the button.
     * @param {string} specSkinClass 
     */
    public setSpecSkinClass(specSkinClass: string): void {
        var node = this.getNode();
        if (node) {
            (<HTMLElement>node).className = this.getBaseSkinClass() + ' ' + specSkinClass;
        } else {
            this.specSkinClass = specSkinClass;
        }
    }

    /**
     * @override
     */
    public addSpecSkinClass(skinClass: string): void {
        this.setSpecSkinClass(this.getSpecSkinClass() + ' ' + skinClass);
    }

    /**
     * @override
     */
    public removeSpecSkinClass(skinClass: string): void {
        this.setSpecSkinClass(this.getSpecSkinClass().replace(new RegExp(skinClass, 'g'), '').trim());
    }

    /**
     * @override
     */
    public hasSkinClass(skinClass: string): boolean {
        return new RegExp(skinClass, 'g').test(this.getSkinClass());
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.specSkinClass;
    }
}
