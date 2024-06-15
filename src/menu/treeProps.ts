import {v4 as uuidv4} from 'uuid';
import {TreeMenu} from "./treeMenu";
import React from 'react'

export class MenuItem {

    /**
     * Unique identifier, required
     */
    public id: string = uuidv4();
    /**
     * Menu content
     */
    public content?: any = undefined;
    /**
     * The title global attribute  contains text representing advisory information
     */
    public title?: string | undefined = undefined
    /**
     * Item icon ( use optional)
     */
    public icon?: any = undefined

    /**
     * children items ( use optional)
     */
    public items?: Array<MenuItem> = []

    /**
     * Status open submenu
     */
    public isOpen?: boolean = false

    /**
     * url link (use optional)
     */
    public url?: (()=>void) | string

    public style?: React.CSSProperties;
    public className?: string;
    public dataUser?:string
    public target?:string='_self'
    public selected?:boolean=false;
    /**
     * For internal use
     */
    public ___isVisible?:boolean = false;
    public accessKey?: string;
    constructor(content?: any,icon?:any) {
        this.content = content;
        this.icon = icon;
        this.items=[];

    }
    public static CreateInstanceItem(
        {id,content,title,icon,isOpen,url,style,className,dataUser,target,selected,accessKey,items}:
            {
                id?:string,
                content?:any,
                title?:string,
                icon?:any,
                isOpen?:boolean,
                url?:(()=>void) | string,
                style?: React.CSSProperties,
                className?: string,
                dataUser?:string,
                target?:string,
                selected?:boolean,
                accessKey?: string,
                items?: Array<MenuItem>
            }):MenuItem{
        const m=new MenuItem();
        m.id=id??uuidv4();
        m.content=content;
        m.title=title;
        m.icon=icon;
        m.isOpen=isOpen??false;
        m.target=target??'_self'
        m.url=url;
        m.style=style;
        m.className=className;
        m.dataUser=dataUser;
        m.selected=selected??false;
        m.accessKey=accessKey;
        m.items=items??[];


        return m;
    }

    public AddItem(...menuItem: MenuItem[]) {
        this.items!.push(...menuItem)
        return this
    }

    /**
     * For internal use
     */
    public __wrapper?:WrapperMenuItems=undefined;
}
 export type ParamsClick={
    path?:Array<MenuItem>
    items?: MenuItem
    element?:HTMLAnchorElement
}


export type TreeProps = {

    /**
     * Approximate height of element item default 35
     */
    itemSize?:number
    /**
     * Root items array
     */
    items?: Array<MenuItem>,

    /**
     * style item
     */
    style?: React.CSSProperties,

    /**
     * css class item
     */
    className?: string;
    /**
     * Function for getting fixed dimensions of a tree panel
     */
    callbackVirtualSize?:()=>VirtualSize

    /**
     * Use a checkBox
     */
    useCheckBox?:boolean

    /**
     * Tree panel height, callbackVirtualSize alternative
     */
    height?:number;

    /**
     * Tree panel wight, callbackVirtualSize alternative
     */
    wight?:number;

    /**
     * Icon for open item
     */
    iconOpen?: any,

    /**
     * Icon for close item
     */
    iconClose?: any,

    /**
     * Icon for child item
     */
    iconTree?: any,

    /**
     * Margin value for child item
     */
    marginItem:number;

    /**
     * Item click event
     * @param sender MenuTree
     * @param obj ParamsClick
     */
    onClickMenuItem?:(sender:InstanceType<typeof TreeMenu>,obj:ParamsClick)=>void
}
export class WrapperMenuItems{
    public margin:number;
    public item:MenuItem;
    public index:number=-1;
    public isVisible?:boolean;
    public isRoot:boolean=false;
    constructor({item,margin,isRoot}:{item:MenuItem,margin:number,isRoot:boolean}) {
        this.margin=margin;
        this.item=item;
        this.isRoot=isRoot;
        this.isVisible=false;
        item.__wrapper=this;
    }
}
export type VirtualSize={
    height:number,
    wight:number;
}
