/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface IBox {
    /**
     * 获取盒子的宽度。
     * 单位pixel
     *
     * @return {number} 盒子的宽度。
     */
    getWidth(): number;

    /**
     * 获取盒子的高度。
     * 单位pixel
     *
     * @return {number} 盒子的高度。
     */
    getHeight(): number;

    /**
     * 获取盒子的x轴坐标。
     *
     * @return {number} x轴坐标。
     */
    getX(): number;

    /**
     * 获取盒子的y轴坐标。
     *
     * @return {number} y轴坐标。
     */
    getY(): number;
}
