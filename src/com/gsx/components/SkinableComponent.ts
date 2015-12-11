/**
 * @file The skinable ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventDispatcher} from '../events/EventDispatcher';
import {IDestroyable} from './IDestroyable';
import {ISkinable} from './ISkinable';

export abstract class SkinableComponent extends EventDispatcher implements ISkinable, IDestroyable {

    private specSkinClass: string = '';

    /**
     * Get the skinable node.
     * @return {Node}
     */
    abstract getNode(): Node;

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
        var node: Node = this.getNode();
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
        var classNames = (<Element>this.getNode()).className.trim().split(' ');
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
        if (!this.hasSkinClass(skinClass)) {
            (<Element>this.getNode()).classList.add(skinClass);
        }
    }

    /**
     * @override
     */
    public removeSpecSkinClass(skinClass: string): void {
        if (this.hasSkinClass(skinClass)) {
            (<Element>this.getNode()).classList.remove(skinClass);
        }
    }

    /**
     * @override
     */
    public hasSkinClass(skinClass: string): boolean {
        return (<Element>this.getNode()).classList.contains(skinClass);
    }

    /**
     * @override
     */
    public destroy(): void {
        delete this.specSkinClass;
    }
}
