/**
 * @file The pop up component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ArrayUtil} from '../../utils/ArrayUtil';
import {IContainer} from '../IContainer';
import {PositionType} from '../PositionType';
import {UIComponent} from '../UIComponent';
import {UIComponentContainer} from '../UIComponentContainer';

export class PopUp extends UIComponentContainer {

    /**
     * The params of inital.
     */
    private params: PopUpParams;

    private positionTypeKeys: string[];
    private positionSkins: {};

    constructor(params?: PopUpParams) {
        this.positionTypeKeys = ['CENTER', 'TOP', 'RIGHT', 'BOTTOM', 'LEFT', 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT',
            'BOTTOM_RIGHT'];
        this.positionSkins = {};
        this.positionTypeKeys.forEach(function (positionTypeValue: string): void {
            this.positionSkins[PositionType[positionTypeValue]] = positionTypeValue.toLowerCase().replace('_', '-');
        }, this);
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplate(): string {
        return '<div class="' + this.getSkinClass() + '"></div>';
    }

    /**
     * @override
     */
    public getContainerNode(): Node {
        return this.getNode();
    }

    /**
     * @override
     */
    public postCreate(): void {
        super.postCreate();
        var popupComponent: UIComponent = this.params.popupComponent;
        popupComponent && this.addChild(popupComponent);
        if (this.params.positionType !== undefined && this.params.positionType !== null) {
            this.setPosition(this.params.parent, this.params.aroundComponent, this.params.positionType);
        }
        if (this.params.zIndex) {
            this.setZIndex(this.params.zIndex);
        }
    }

    /**
     * Set the position type
     * @overload
     * @see com/gsx/components/PositionType
     * @param {IContainer} parent
     * @param {UIComponent} aroundComponent
     * @param {PositionType} positionType
     */
    public setPosition(parent: IContainer, aroundComponent: UIComponent, positionType: PositionType): void;

    /**
     * Set the position type
     * @overload
     * @see com/gsx/components/PositionType
     * @param {IContainer} parent
     * @param {PositionType} positionType
     */
    public setPosition(parent: IContainer, positionType: PositionType): void;

    /**
     * @overload
     */
    public setPosition(param: any, param2nd: any, param3rd?: any): void {
        var parent: IContainer;
        var aroundComponent: UIComponent;
        var positionType: PositionType;
        if (param2nd instanceof UIComponent) {
            parent = param;
            aroundComponent = param2nd;
            positionType = param3rd;
        } else {
            parent = param;
            positionType = param2nd;
        }
        this.setParent(parent);
        if (aroundComponent) { // around
            this.position(aroundComponent, positionType);
        } else { // inner the parent
            this.innerPosition(positionType);
        }
    }

    /**
     * @override
     */
    public setParent(parent: IContainer): void {
        super.setParent(parent);
        if (parent) {
            var parentElement: Element = <Element>parent.getContainerNode();
            if (!parentElement.classList.contains('pop-up-parent')) {
                parentElement.classList.add('pop-up-parent');
            }
        }
    }

    /**
     * Position in the parent.
     * @param {PositionType} positionType
     */
    protected innerPosition(positionType: PositionType): void {
        var positionTypes: PositionType[] = this.getPositionTypes(positionType);
        var element: Element = <Element>this.getNode();
        for (var key in this.positionSkins) {
            var skin: string = this.positionSkins[key];
            element.classList.contains(skin) && element.classList.remove(skin);
        }
        element.classList.add(this.positionSkins[positionTypes[positionTypes.length - 1]]);
    }

    /**
     * Position around the spect ui component in the parent.
     * @param {UIComponent} aroundComponent
     * @param {PositionType} positionType
     */
    protected position(aroundComponent: UIComponent, positionType: PositionType): void {
        var positionTypes: PositionType[] = this.getPositionTypes(positionType);
        var parentX: number = 0;
        var parentY: number = 0;
        var parentWidth: number = 0;
        var parentHeight: number = 0;
        var parent: UIComponentContainer = <UIComponentContainer>this.getParent();
        if (parent) {
            parentX = parent.getX();
            parentY = parent.getY();
            parentWidth = parent.getWidth();
            parentHeight = parent.getHeight();
        } else {
            parentWidth = document.documentElement.clientWidth;
            parentHeight = document.documentElement.clientHeight;
        }
        var leftSpace: number = aroundComponent.getX() - parentX;
        var rightSpace: number = parentWidth + parentX - aroundComponent.getWidth() - aroundComponent.getX();
        if (leftSpace >= rightSpace) { // left
            this.setX(aroundComponent.getX() - this.getWidth());
        } else { // right
            this.setX(aroundComponent.getX() + aroundComponent.getWidth());
        }
        if (ArrayUtil.contain(positionTypes, PositionType.LEFT)
            || ArrayUtil.contain(positionTypes, PositionType.RIGHT)) {
            this.setY(aroundComponent.getY() - (this.getHeight() - aroundComponent.getHeight()) / 2);
        }
        if (ArrayUtil.contain(positionTypes, PositionType.TOP_LEFT)
            || ArrayUtil.contain(positionTypes, PositionType.TOP_RIGHT)) {
            this.setY(aroundComponent.getY() + aroundComponent.getHeight() - this.getHeight());
        }
        if (ArrayUtil.contain(positionTypes, PositionType.BOTTOM_LEFT)
            || ArrayUtil.contain(positionTypes, PositionType.BOTTOM_RIGHT)) {
            this.setY(aroundComponent.getY());
        }
    }

    /**
     * Get position types.
     * @param {number} positionType The set of position type.
     *     For instance: PositionType.CENTER | PositionType.LEFT
     * @return {Array<PositionType>}
     */
    private getPositionTypes(positionType: PositionType): PositionType[] {
        var positionTypes: PositionType[] = [];
        this.positionTypeKeys.forEach(function (attr: string): void {
            var typeItem: PositionType = PositionType[attr];
            if ((positionType & PositionType[attr]) === PositionType[attr]) {
                positionTypes.push(typeItem);
            }
        });
        return positionTypes;
    }

    /**
     * Set the z-order index.
     * @param {number} zIndex
     */
    public setZIndex(zIndex: number): void {
        (<HTMLElement>this.getNode()).style.zIndex = zIndex + '';
    }

    /**
     * Set the x number.
     * @param {number} x
     */
    public setX(x: number): void {
        (<HTMLElement>this.getNode()).style.left = x + 'px';
    }

    /**
     * Set the y number;
     * @param {number} y
     */
    public setY(y: number): void {
        (<HTMLElement>this.getNode()).style.top = y + 'px';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'pop-up';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
        delete this.positionTypeKeys;
        delete this.positionSkins;
    }
}

interface PopUpParams {
    /**
     * The poped up component
     */
    popupComponent?: UIComponent;

    /**
     * The component witch poped up arounding
     */
    parent?: IContainer;

    /**
     * The component witch poped up around
     */
    aroundComponent?: UIComponent;

    /**
     * The position type.
     * @see com/gsx/components/PositionType
     */
    positionType?: PositionType;

    /**
     * The modal style or not
     */
    modal?: boolean;

    /**
     * The z-index order of this pop up.
     */
    zIndex?: number;
}
