import { MenuItem, TreeProps } from "./treeProps";
import React from "react";
import { FixedSizeList } from 'react-window';
export declare class TreeMenu extends React.Component<TreeProps, any> {
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
