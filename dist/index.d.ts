import React from 'react';
import { FixedSizeList } from 'react-window';

type ParamsItems = {
    id?: string;
    content?: any;
    title?: string;
    icon?: any;
    isOpen?: boolean;
    url?: (() => void) | string;
    style?: React.CSSProperties;
    className?: string;
    dataUser?: string;
    target?: string;
    selected?: boolean;
    accessKey?: string;
    items?: Array<MenuItem>;
};
declare class MenuItem {
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
    static CreateInstanceItem(p: ParamsItems): MenuItem;
    AddItem(...menuItem: MenuItem[]): this;
    /**
     * For internal use
     */
    __wrapper?: WrapperMenuItems;
}
type ParamsClick = {
    path?: Array<MenuItem>;
    items?: MenuItem;
    element?: HTMLAnchorElement;
};
type TreeProps = {
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
declare class WrapperMenuItems {
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
type VirtualSize = {
    height: number;
    wight: number;
};

declare class TreeMenu extends React.Component<TreeProps, any> {
    static defaultProps: TreeProps;
    private wrapperItems;
    private wrapperItemsCore;
    protected mRewList: React.RefObject<FixedSizeList>;
    protected mRewHost: React.RefObject<HTMLDivElement>;
    private heightVirtual?;
    private wightVirtual?;
    private ListItems;
    private startTab;
    private accessKey?;
    private blockKey;
    constructor({ props }: {
        props: Readonly<TreeProps>;
    });
    private itemChecked;
    private wrapperFilter;
    private keyTabEnter;
    private actionWrapper;
    private selectItem;
    private Row;
    private renderRoot;
    private clickItemNew;
    componentDidMount(): void;
    private getTab;
    componentWillUnmount(): void;
    RefreshMenu(callback?: () => void): void;
    private renderImageOpen;
    private noDrag;
    private OpenMenuItem;
    Expand(callback?: () => void): void;
    private renderItem;
    private recursionSelect;
    render(): React.JSX.Element;
    Collapse(callback?: () => void): void;
    GetListItems(): MenuItem[] | undefined;
    OpenMenuItemOnly(id?: string): MenuItem[];
    OpenMenuItemAndClick(id?: string): MenuItem[];
    GetPath(id?: string): MenuItem[];
    AddItems(...items: MenuItem[]): void;
    GetMenuItems(id?: string): MenuItem | undefined;
    DeleteAllItems(callback?: () => void): void;
    RewriteItems(...items: MenuItem[]): void;
    DeleteItems(id: string): void;
}

export { MenuItem, type ParamsClick, type ParamsItems, TreeMenu, type VirtualSize, WrapperMenuItems };
