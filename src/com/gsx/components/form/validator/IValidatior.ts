/**
 * @file The interface of validator
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface IValidatior {

    /**
     * Validating the spec ui component.
     * @return {boolean}
     */
    validate(): boolean;
}