import { TreeMenu } from "./treeMenu";
import React from 'react';
export declare class MenuItem {
    /**
     * Unique identifier, required
     */
    id: string;
    /**
     * Menu content
     */
    content?: any;
    /**
     * The title global attribute  contains text representing advisory information
     */
    title?: string | undefined;
    /**
     * Item icon ( use optional)
     */
    icon?: any;
    /**
     * children items ( use optional)
     */
    items?: Array<MenuItem>;
    /**
     * Status open submenu
     */
    isOpen?: boolean;
    /**
     * url link (use optional)
     */
    url?: (() => void) | string;
    style?: React.CSSProperties;
    className?: string;
    dataUser?: string;
    target?: string;
    selected?: boolean;
    /**
     * For internal use
     */
    ___isVisible?: boolean;
    accessKey?: string;
    constructor(content?: any, icon?: any);
    static CreateInstanceItem({ id, content, title, icon, isOpen, url, style, className, dataUser, target, selected, accessKey, items }: {
        id: string;
        content: any;
        title?: string;
        icon: any;
        isOpen?: boolean;
        url?: (() => void) | string;
        style?: React.CSSProperties;
        className?: string;
        dataUser?: string;
        target?: string;
        selected?: boolean;
        accessKey?: string;
        items?: Array<MenuItem>;
    }): MenuItem;
    AddItem(...menuItem: MenuItem[]): this;
    /**
     * For internal use
     */
    __wrapper?: WrapperMenuItems;
}
export type ParamsClick = {
    path?: Array<MenuItem>;
    items?: MenuItem;
    element?: HTMLAnchorElement;
};
export type TreeProps = {
    /**
     * Approximate height of element item default 35
     */
    itemSize?: number;
    /**
     * Root items array
     */
    items?: Array<MenuItem>;
    /**
     * style item
     */
    style?: React.CSSProperties;
    /**
     * css class item
     */
    className?: string;
    /**
     * Function for getting fixed dimensions of a tree panel
     */
    callbackVirtualSize?: () => VirtualSize;
    /**
     * Use a checkBox
     */
    useCheckBox?: boolean;
    /**
     * Tree panel height, callbackVirtualSize alternative
     */
    height?: number;
    /**
     * Tree panel wight, callbackVirtualSize alternative
     */
    wight?: number;
    /**
     * Icon for open item
     */
    iconOpen?: any;
    /**
     * Icon for close item
     */
    iconClose?: any;
    /**
     * Icon for child item
     */
    iconTree?: any;
    /**
     * Margin value for child item
     */
    marginItem: number;
    /**
     * Item click event
     * @param sender MenuTree
     * @param obj ParamsClick
     */
    onClickMenuItem?: (sender: InstanceType<typeof TreeMenu>, obj: ParamsClick) => void;
};
export declare class WrapperMenuItems {
    margin: number;
    item: MenuItem;
    index: number;
    isVisible?: boolean;
    isRoot: boolean;
    constructor({ item, margin, isRoot }: {
        item: MenuItem;
        margin: number;
        isRoot: boolean;
    });
}
export type VirtualSize = {
    height: number;
    wight: number;
};
