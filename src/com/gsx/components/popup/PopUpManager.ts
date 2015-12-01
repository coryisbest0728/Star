/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IContainer} from 'com/gsx/components/IContainer';
import {PopUp} from 'com/gsx/components/popup/PopUp';
import {UIComponent} from 'com/gsx/components/UIComponent';
import {UIComponentContainer} from 'com/gsx/components/UIComponentContainer';

export abstract class PopUpManager {

    /**
     * The pop up map.
     * The key is the poped up component.
     * The value is the pop up.
     */
    static popUpMap: Object = {};

    /**
     * Pops up a top-level component.
     * @param {UIComponent} popupComponent
     * @param {UIComponent} parent
     * @param {boolean} modal
     */
    static addPopUp(popupComponent: UIComponent, parent: IContainer, modal: boolean = false): void {
        var popUp: UIComponent = PopUpManager.createPopUp(popupComponent, parent, modal);
    }

    /**
     * Makes sure a popup component is higher than other objects in its child list,
     * but otherwise you have to take care of this yourself.
     * @param {UIComponent} popupComponent
     */
    static bringToFront(popupComponent: UIComponent): void {
        
    }

    /**
     * Creates a top-level component and places it above other windows in the z-index.
     * @param {UIComponent} popupComponent
     * @param {UIComponent} parent
     * @param {boolean} modal
     */
    static createPopUp(popupComponent: UIComponent, parent: IContainer, modal: boolean = false): UIComponent {
        var popUp: UIComponentContainer = new PopUp({
            popupComponent: popupComponent,
            parent: parent,
            modal: modal
        });
        PopUpManager.popUpMap[popupComponent.getId()] = popUp;
        return popUp;
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