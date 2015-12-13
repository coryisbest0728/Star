/**
 * @file The interface of the model
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface IModel {

    /**
     * the name of the model
     */
    name: string;

    /**
     * The old value of the model
     */
    oldValue: any;

    /**
     * The new value of the model
     */
    newValue: any;
}