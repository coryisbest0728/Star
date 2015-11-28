/**
 * @file The interface of templated.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface ITemplated {
    /**
     * Get renderred template string.
     * @return {string}
     */
    getTemplate(): string;

    /**
     * Build render from template.
     */
    buildRendering(): void;

    /**
     * Get element by the value of "data-element-id" attr in the template.
     * This method must excute after buildRendering().
     * @param {string} elementId
     * @return {Element}
     */
    getTemplatedElementById(elementId: string): Element
}
