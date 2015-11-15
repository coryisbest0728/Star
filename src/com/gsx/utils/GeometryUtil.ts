/**
 * @file The geometry util.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IBox} from 'com/gsx/components/IBox';

export abstract class GeometryUtil {
    /**
     * Get the box node, include x, y, width, height.
     * @param {Element} element
     */
    static getBox(element: HTMLElement): IBox {
        var computedStyle: CSSStyleDeclaration = element.ownerDocument.defaultView.getComputedStyle(element, null);
        var marginExtents: IBoxExtents = GeometryUtil.getMarginExtents(element);
        var x: number = element.offsetLeft - marginExtents.left;
        var y: number = element.offsetTop - marginExtents.top;
        var styleLeft: number = parseFloat(computedStyle.left);
        var styleTop: number = parseFloat(computedStyle.top);
        if (!isNaN(styleLeft) && !isNaN(styleTop)) {
            x = styleLeft;
            y = styleTop;
        } else {
            var parentElement: HTMLElement = <HTMLElement>element.parentNode;
            if (parentElement && parentElement.style) {
                var parentComputedStyle: CSSStyleDeclaration = 
                    parentElement.ownerDocument.defaultView.getComputedStyle(parentElement, null);
                if (parentComputedStyle.overflow !== 'visible') {
                    x += parseFloat(parentComputedStyle.borderLeftWidth) || 0;
                    y += parseFloat(parentComputedStyle.borderTopWidth) || 0;
                }
            }
        }
        
        return new Box(
            x, y,
            element.offsetWidth + marginExtents.width,
            element.offsetHeight + marginExtents.height
        );
    }

    /**
     * Returns object with special values specifically useful for node fitting.
     * @param {HTMLElement} element
     * @return {Object}
     */
    static getPadExtents(element:  HTMLElement): IBoxExtents {
        var computedStyle: CSSStyleDeclaration = element.ownerDocument.defaultView.getComputedStyle(element, null);
        var left: number = parseFloat(computedStyle.paddingLeft) || 0;
        var top: number = parseFloat(computedStyle.paddingTop) || 0;
        var right: number = parseFloat(computedStyle.paddingRight) || 0;
        var bottom: number = parseFloat(computedStyle.paddingBottom) || 0;
        return {
            left: left,
            top: top,
            right: right,
            bottom: bottom,
            width: left + right,
            height: top + bottom
        };
    }

    /**
     * Returns object with properties useful for box fitting with regards to box margins (i.e., the outer-box).
     * @param {HTMLElement} element
     * @return {Object}
     */
    static getMarginExtents(element: HTMLElement): IBoxExtents {
        var computedStyle: CSSStyleDeclaration = element.ownerDocument.defaultView.getComputedStyle(element, null);
        var left: number = parseFloat(computedStyle.marginLeft) || 0;
        var top: number = parseFloat(computedStyle.marginTop) || 0;
        var right: number = parseFloat(computedStyle.marginRight) || 0;
        var bottom: number = parseFloat(computedStyle.marginBottom) || 0;
        return {
            left: left,
            top: top,
            right: right,
            bottom: bottom,
            width: left + right,
            height: top + bottom
        };
    }

    /**
     * Returns an object with properties useful for noting the border dimensions.
     * @param {HTMLElement} element
     * @return {Object}
     */
    static getBorderExtents(element: HTMLElement): IBoxExtents {
        var computedStyle: CSSStyleDeclaration = element.ownerDocument.defaultView.getComputedStyle(element, null);
        var left: number = parseFloat(computedStyle.borderLeftStyle) || 0;
        var top: number = parseFloat(computedStyle.borderTopStyle) || 0;
        var right: number = parseFloat(computedStyle.borderRightStyle) || 0;
        var bottom: number = parseFloat(computedStyle.borderBottomStyle) || 0;
        return {
            left: left,
            top: top,
            right: right,
            bottom: bottom,
            width: left + right,
            height: top + bottom
        };
    }
}

class Box implements IBox {
    constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {}

    /**
     * @override
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * @override
     */
    public getHeight(): number {
        return this.height;
    }

    /**
     * @override
     */
    public getX(): number {
        return this.x;
    }

    /**
     * @override
     */
    public getY(): number {
        return this.y;
    }
}

interface IBoxExtents {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}