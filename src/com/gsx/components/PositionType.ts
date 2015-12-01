/**
 * @file The Position Type.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export enum PositionType {
    CENTER = 1,

    TOP = 2,
    RIGHT = 4,
    BOTTOM = 8,
    LEFT = 16,

    TOP_LEFT = 32,
    TOP_RIGHT = 64,
    BOTTOM_LEFT = 128,
    BOTTOM_RIGHT = 256
}