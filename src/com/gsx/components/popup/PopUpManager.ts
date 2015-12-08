/**
 * @file
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IContainer} from '../IContainer';
import {PopUp} from './PopUp';
import {UIComponent} from '../UIComponent';
import {UIComponentContainer} from '../UIComponentContainer';

export abstract class PopUpManager {

    /**
     * The pop up map.
     * The key is the poped up component.
     * The value is the pop up.
     */
    static popUpMap: Object = {};

    static zIndex: number = 10;

    /**
     * Pops up a top-level component.
     * @param {UIComponent} popupComponent
     * @param {UIComponent} parent
     * @param {boolean} modal
     */
    static addPopUp(popupComponent: UIComponent, parent: IContainer, modal: boolean = false): void {
        PopUpManager.popUpMap[popupComponent.getId()] = PopUpManager.createPopUp(popupComponent, parent, modal);
    }

    /**
     * Makes sure a popup component is higher than other objects in its child list,
     * but otherwise you have to take care of this yourself.
     * @param {UIComponent} popupComponent
     */
    static bringToFront(popupComponent: UIComponent): void {
        (<PopUp>PopUpManager.popUpMap[popupComponent.getId()]).setZIndex(zIndex++);
    }

    /**
     * Creates a top-level component and places it above other windows in the z-index.
     * @param {UIComponent} popupComponent
     * @param {UIComponent} parent
     * @param {boolean} modal
     */
    static createPopUp(popupComponent: UIComponent, parent: IContainer, modal: boolean = false): UIComponent {
        return new PopUp({
            popupComponent: popupComponent,
            parent: parent,
            modal: modal,
            zIndex: zIndex++
        });
    }

    /**
     * Removes a popup component popped up by the createPopUp() or addPopUp() method.
     * @param {UIComponent} popupComponent
     */
    static removePopUp(popupComponent: UIComponent): void {
        PopUpManager.popUpMap[popupComponent.getId()].destroy();
        delete PopUpManager.popUpMap[popupComponent.getId()];
    }
}
