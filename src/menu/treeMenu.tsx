import {MenuItem, TreeProps, WrapperMenuItems} from "./treeProps";
import React, {ReactElement} from "react";
//import './index.css'
import {FixedSizeList, FixedSizeList as List} from 'react-window';


export class TreeMenu extends React.Component<TreeProps, any> {

    static defaultProps: TreeProps = {
        className: 'host-menu',
        marginItem: 25,
    }

    private wrapperItems: Array<WrapperMenuItems>;
    private wrapperItemsCore: Array<WrapperMenuItems> | undefined;
    protected mRewList: React.RefObject<FixedSizeList>
    protected mRewHost: React.RefObject<HTMLDivElement>
    private heightVirtual?: number
    private wightVirtual?: number
    private ListItems: Array<MenuItem> | undefined;



    private startTab: number;

    private accessKey?: string
    private blockKey: boolean = false;
    //private selectHtmlElement?:HTMLElement=undefined


    constructor({props}: { props: Readonly<TreeProps> }) {
        super(props);
        this.mRewList = React.createRef<FixedSizeList>()
        this.mRewHost = React.createRef<HTMLDivElement>();
        this.clickItemNew = this.clickItemNew.bind(this)

        this.keyTabEnter = this.keyTabEnter.bind(this)
        this.itemChecked = this.itemChecked.bind(this)
        this.Row = this.Row.bind(this)

        this.ListItems = [];
        this.wrapperItems = [];
        this.wrapperItemsCore = undefined
        this.startTab = 0;

        //this.scrollPosition = undefined
        this.heightVirtual = 0;
        this.wightVirtual = 0;
        this.accessKey = undefined;

    }

    private itemChecked(e: React.ChangeEvent<HTMLInputElement>) {

        const id = e.target.parentElement!.parentElement!.getAttribute("data-id")
        if (!id) return
        const menu = this.GetMenuItems(id)
        if (!menu) return;
        menu.selected = e.target.checked
        this.recursionSelect(menu, e.target.checked)
        this.mRewList.current?.forceUpdate()
    }

    private wrapperFilter(): Array<WrapperMenuItems> {
        if (!this.wrapperItemsCore) {
            this.wrapperItemsCore = this.wrapperItems.filter(a => a.isVisible)
        }

        return this.wrapperItemsCore;
    }

    private keyTabEnter(e: KeyboardEvent) {
        if (this.blockKey) return;
        if (e.ctrlKey && e.altKey) {
            if (!this.accessKey) this.accessKey = ''
            this.accessKey = this.accessKey + e.key
        }
        if (e.key === 'Control') {
            if (!this.accessKey) return
            this.blockKey = true;
            setTimeout(() => {

                if (this.wrapperItems) {
                    for (let i = 0; i < this.wrapperItems.length; i++) {
                        if (this.wrapperItems[i].item.accessKey === this.accessKey) {
                            this.OpenMenuItemAndClick(this.wrapperItems[i].item.id)
                            break
                        }
                    }
                }
                this.blockKey = false
                this.accessKey = undefined

            }, 10)
        }
        // if(e.key==="Tab"){
        //    const d=e.target as HTMLElement
        //     if(d.getAttribute("data-tree-item")){
        //         this.selectHtmlElement=d;
        //     }else{
        //         this.selectHtmlElement=undefined;
        //     }
        // }
        if(e.key==="Enter"){//&&this.selectHtmlElement
            const  dd=document.activeElement;
            if(dd){
                if(dd.getAttribute("data-tree-item")){
                    const  d=dd as HTMLElement;
                    d.click()
                }
            }
            //this.selectHtmlElement.click()
        }
    }

    private actionWrapper() {

        this.wrapperItems = []
        const THIS = this;

        function actionWrapperRecursion(item: MenuItem, isRoot: boolean, margin: number) {

            margin = margin + 1
            const w = new WrapperMenuItems({margin: margin, item: item, isRoot: isRoot});
            if (isRoot) {
                w.isVisible = true;
            } else {
                w.isVisible = item.___isVisible;
            }
            THIS.wrapperItems.push(w)

            if (isRoot) {
                isRoot = false;
            }
            if (item && item.items && item.items.length > 0) {

                item.items.forEach((a) => {
                    actionWrapperRecursion(a, isRoot, margin)
                })
            }
        }

        this.ListItems?.forEach(a => {
            actionWrapperRecursion(a, true, -1)
        })
    }

    private selectItem(id: string) {
        const nodeList = this.mRewHost.current?.querySelectorAll("[data-tree-item]")
        if (nodeList) {
            nodeList.forEach(a => {
                a.classList.remove('select-tree-item')
            })
        }

        let res: HTMLAnchorElement | undefined = undefined
        const selectTarget = this.mRewHost.current?.querySelectorAll("[id='" + id + "']")
        if (selectTarget) {
            selectTarget.forEach(a => {
                    res = a as HTMLAnchorElement
                    a.classList.add('select-tree-item')
                }
            );
        }
        return res;
    }


    private Row({data, index, style}: { data: Array<WrapperMenuItems>, index: number, style: any }) {
        const w = data[index];
        w.index = index;
        const item = w.item;


        if (w.isRoot) {
            return (
                <div style={style}>
                    {
                        this.renderRoot(item)
                    }

                </div>
            )

        } else {
            if (w.isVisible) {
                return (
                    <div style={style}>
                        {
                            this.renderItem(item, w.margin)
                        }

                    </div>
                )

            } else {
                return null
            }
        }
    };


    private renderRoot(item: MenuItem) {

        const THIS = this

        function getRootElement(item: MenuItem) {
            return <>
                <div
                    className={'inner-div-a-v'}
                    data-root={1}
                    data-id={item.id}
                >
                    {
                        <div className={'tree-menu-item-right-image-v'}>{THIS.renderImageOpen(item)}</div>
                    }

                    {
                        THIS.props.useCheckBox ? (
                            <div className={'tree-menu-check-host-v'} onClick={e => {
                                e.stopPropagation()
                            }}>
                                <input type={"checkbox"} checked={item.selected}
                                       onChange={THIS.itemChecked}/>
                            </div>
                        ) : null

                    }
                    {
                        item.icon ? (
                            <div className={'tree-menu-item-left-image-v'}>{item.icon}</div>
                        ) : null
                    }

                    <div className={'tree-menu-item-text-v t-over'}>{item.content}</div>


                </div>
            </>;
        }

        this.startTab = this.startTab + 1;
        let innerUrl: string | undefined = undefined
        if (item.url) {
            if (typeof (item.url) !== 'function') {
                innerUrl = item.url;
            }
        }


        return (
            <a

                title={item.title}
                style={item.style}
                target={item.target ? item.target : '_self'}
                data-user-tree={item.dataUser}
                data-tree-item={1}
                data-root={!item.icon ? '1' : undefined}
                onDragStart={this.noDrag}
                href={innerUrl}
                tabIndex={this.getTab()}
                data-a-tree={1}
                id={item.id}
                className={item.className ? item.className : 'tree-menu-item-v'}
                onClick={this.clickItemNew}
                key={item.id}>

                {getRootElement(item)}
            </a>

        )
    }


    private clickItemNew(e: React.MouseEvent<HTMLAnchorElement>) {

        function visible(item: MenuItem) {
            item.__wrapper!.isVisible = true;
            if (item.isOpen) {
                if (item.items) {
                    item.items.forEach(a => {
                        visible(a)
                    })
                }
            }


        }

        function notVisible(item: MenuItem) {
            item.__wrapper!.isVisible = false;
            if (item.items) {
                item.items.forEach(a => {
                    notVisible(a)
                })
            }
        }

        e.stopPropagation();
        //this.selectHtmlElement=e.target as HTMLElement


        const id = e.currentTarget.getAttribute('id')
        if (!id) return;
        const menu = this.GetMenuItems(id)
        if (!menu) return
        if (!menu.isOpen) {
            menu.items!.forEach(a => {
                visible(a)
            })
            menu.isOpen = true;
        } else {
            menu.items!.forEach(a => {
                notVisible(a)
            })
            menu.isOpen = false;
        }

        this.wrapperItemsCore = undefined

        this.forceUpdate(() => {
            this.mRewList.current?.forceUpdate(() => {
                const element = this.selectItem(id)
                if (this.props.onClickMenuItem) {
                    this.props.onClickMenuItem(this, {
                        item: this.GetMenuItems(id),
                        path: this.GetPath(id),
                        element: element
                    })
                }
            })
        })
    }

    componentDidMount() {
        window.addEventListener("keyup", this.keyTabEnter) //todo remove
        setTimeout(()=>{
            this.ListItems = this.props.items;
            this.actionWrapper()
            if (this.props.callbackVirtualSize) {
                const vz = this.props.callbackVirtualSize()
                this.wightVirtual = vz.wight;
                this.heightVirtual = vz.height
            }
            if (this.props.height) {
                this.heightVirtual = this.props.height
            }
            if (this.props.wight) {
                this.wightVirtual = this.props.wight
            }
            this.wrapperItemsCore = undefined;
            this.forceUpdate()
        })



    }

    private getTab() {
        return this.startTab = this.startTab + 1;
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.keyTabEnter)
    }

    public RefreshMenu(callback?: () => void): void {
        if(!this.wrapperItems||!this.wrapperItemsCore) return
        this.wrapperItems.forEach(a=>{
            a.item.___isVisible=false;
        })
        this.wrapperItemsCore.forEach(a => {
            a.item.___isVisible = true
        })
        this.actionWrapper()
        this.wrapperItemsCore = undefined;
        //this.mRewList.current!.forceUpdate()
        this.forceUpdate(callback)
    }

    private renderImageOpen(item: MenuItem) {
        if (item.items && item.items.length > 0) {
            if (item.isOpen) {
                return this.props.iconOpen
            } else {
                return this.props.iconClose
            }

        }
    }

    private noDrag(e: React.DragEvent) {
        e.preventDefault()
    }

    private OpenMenuItem(id: string | undefined | null, isClick?: boolean, isSimple?: boolean) {
        if (!id) return [];
        if (!this.ListItems) return [];
        let stop: boolean = false;

        function openVirtual(item: MenuItem) {
            item.isOpen = true;
            item.__wrapper!.isVisible = true;
            if (item.items) {
                item.items.forEach(a => {
                    a.__wrapper!.isVisible = true;
                })
            }
        }

        function recursionOpen(id: string, list: Array<MenuItem> | undefined, listPath: Array<MenuItem>) {
            if (stop) return
            const listInner: Array<MenuItem> = []
            if (list) {
                list.forEach(a => {
                    if (a.id === id) {
                        listPath.push(a)
                        stop = true;

                    } else {

                        if (!stop) {
                            listPath.push(a)
                            recursionOpen(id, a.items, listInner)
                            if (stop) {
                                listPath.push(...listInner)
                            } else {
                                listPath.pop()

                            }
                        }

                    }
                })

            }

        }

        const listPath: Array<MenuItem> = [];

        recursionOpen(id, this.ListItems, listPath)

        if (isSimple) {
            return listPath;
        }


        listPath.forEach(a => {
            openVirtual(a);
        })

        this.wrapperItemsCore = undefined
        this.forceUpdate(() => {


            if (this.wrapperItemsCore) {
                for (let i = 0; i < this.wrapperItemsCore.length; i++) {
                    if (this.wrapperItemsCore[i].item.id === id) {
                        this.mRewList.current!.scrollToItem(i, 'center')
                        break
                    }
                }
            }
            setTimeout(() => {
                const element = this.selectItem(id)
                if (isClick && element && this.props.onClickMenuItem) {
                    this.props.onClickMenuItem(this, {
                        element: element,
                        path: listPath,
                        item: listPath[listPath.length - 1]
                    })
                }

            }, 50)
        });

        return listPath;

    }

    public Expand(callback?: () => void) {
        this.wrapperItems.forEach(a => {
            a.isVisible = true;
            a.item.isOpen = true;
        })
        this.wrapperItemsCore = undefined;
        this.forceUpdate((() => {
            this.mRewList.current?.scrollTo(0)
            if (callback) {
                callback()
            }

        }))

    }

    private renderItem(item: MenuItem, padding: number): ReactElement {

        const THIS = this;

        function getItemElement(item: MenuItem) {

            return <div className={'inner-div-a-v'} data-root={0} data-id={item.id}>
                {
                    THIS.props.iconTree ? (
                        <div className={'tree-menu-item-icon-tree-v'}>{THIS.props.iconTree}</div>
                    ) : null
                }
                {
                    <div className={'tree-menu-item-right-image-v'}>{THIS.renderImageOpen(item)}</div>
                }
                {
                    THIS.props.useCheckBox ? (
                        <div className={'tree-menu-check-host-v'} onClick={e => {
                            e.stopPropagation()
                        }}>
                            <input type={"checkbox"} checked={item.selected}
                                   onChange={THIS.itemChecked}/>
                        </div>
                    ) : null


                }
                {
                    item.icon ? (
                        <div className={'tree-menu-item-left-image-v'}>{item.icon}</div>
                    ) : null
                }

                <div className={'tree-menu-item-text-v'}>{item.content}</div>


            </div>;
        }

        // if ((!item.items || item.items.length ===1)&&this.props.iconTree) {
        //     padding = 0
        // }

        let curStyle: React.CSSProperties | undefined
        curStyle = {marginLeft: padding * this.props.marginItem}
        if (item.style) {

            curStyle = item.style
            if (!curStyle.marginLeft) {
                curStyle.marginLeft = padding * this.props.marginItem
            }
        }

        let innerUrl: string | undefined = undefined
        if (item.url) {
            if (typeof (item.url) !== 'function') {
                innerUrl = item.url;
            }
        }

        return (
            <a

                title={item.title}
                style={curStyle}
                target={item.target ? item.target : '_self'}
                data-user-tree={item.dataUser}
                onDragStart={this.noDrag}
                href={innerUrl}
                data-tree-item={1}
                tabIndex={this.getTab()} data-a-tree={1}
                id={item.id}
                data-root={0}
                className={item.className ? item.className : 'tree-menu-item-v'}
                onClick={this.clickItemNew}
                key={item.id}>

                {getItemElement(item)}
            </a>
        )
    }


    private recursionSelect(menu: MenuItem, value: boolean) {
        menu.selected = value;
        if (menu) {
            menu.items!.forEach(a => {

                this.recursionSelect(a, value)
            })
        }

    }

    render() {

        return (
            <div ref={this.mRewHost} className={'tree-menu-host-v'}>
                <List
                    style={this.props.style}
                    ref={this.mRewList}
                    itemData={this.wrapperFilter()}
                    height={this.heightVirtual ?? 1000}
                    itemCount={this.wrapperFilter().length}
                    itemSize={this.props.itemSize??35}
                    width={this.wightVirtual ?? 1000}
                >
                    {this.Row}
                </List>
            </div>
        )
    }


    public Collapse(callback?: () => void) {
        if (!this.ListItems) return
        this.wrapperItems.forEach(a => {
            a.isVisible = false;
            a.item.isOpen = false;
        })
        this.ListItems.forEach(a => {
            a.__wrapper!.isVisible = true;
        })

        this.wrapperItemsCore = undefined;
        this.forceUpdate(() => {
            this.mRewList.current?.scrollTo(0)
            if (callback) {
                callback()
            }
        })

    }

    public GetListItems() {
        return this.ListItems;
    }

    public OpenMenuItemOnly(id?: string) {
        return this.OpenMenuItem(id);
    }

    public OpenMenuItemAndClick(id?: string) {
        return this.OpenMenuItem(id, true);
    }

    public GetPath(id?: string) {
        return this.OpenMenuItem(id, false, true)
    }

    public AddItems(...items: MenuItem[]) {
        if (!this.ListItems) {
            this.ListItems = [];
        }
        this.ListItems.push(...items)
        this.RefreshMenu()
    }


    public GetMenuItems(id?: string): MenuItem | undefined {
        let menuItem: MenuItem | undefined = undefined;

        function recursionSearchById(id: string, items: Array<MenuItem> | undefined) {

            if (!items) return
            items.forEach(a => {
                if (a.id === id) {
                    menuItem = a;
                } else {
                    recursionSearchById(id, a.items)
                }
            })

        }

        if (!id || !this.ListItems || this.ListItems.length === 0) {
            return menuItem;
        }
        this.ListItems.forEach(a => {
            if (a.id === id) {
                menuItem = a;
            } else {
                recursionSearchById(id, a.items)
            }
        })
        return menuItem;
    }


    public DeleteAllItems(callback?: () => void) {
        this.ListItems = [];
        this.RefreshMenu(callback)
    }

    public RewriteItems(...items: MenuItem[]) {
        this.ListItems = [];
        this.ListItems.push(...items)
        this.RefreshMenu()
    }

    public DeleteItems(id: string) {

        function recursionDelete(items: MenuItem[]|undefined) {

            if(!items||items.length===0) return
            let index=-1
            for (let i = 0; i < items.length; i++) {
                if(items[i].id===id){
                    index=i;
                    break;
                }
            }
            if(index!==-1){

                items.splice(index,1)
            }else{
                items.forEach(a=>{
                    recursionDelete(a.items)
                })
            }
        }
        recursionDelete(this.ListItems)

        this.RefreshMenu()
    }


}
