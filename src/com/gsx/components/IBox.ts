/**
 * @file As box, it include width, height, x coordinate and y coordinate.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface IBox {
    /**
     * Get the width of this box instance.
     * Unit is pixel
     *
     * @return {number} The width of box.
     */
    getWidth(): number;

    /**
     * Get the height of this box instance.
     * Unit is pixel
     *
     * @return {number} The height of box.
     */
    getHeight(): number;

    /**
     * Get the x coordinate of this box instance.
     *
     * @return {number} The x coordinate of box.
     */
    getX(): number;

    /**
     * Get the y coordinate of this box instance.
     *
     * @return {number} The y coordinate of box.
     */
    getY(): number;
}
