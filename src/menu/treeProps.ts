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
    public icon?: any = undefined
    public items?: Array<MenuItem> = []
    public isOpen?: boolean = false
    public isShow?: boolean = true;
    public url?: (()=>void) | string
    public style?: React.CSSProperties;
    public className?: string;
    public dataUser?:string
    public target?:string='_self'
    public selected?:boolean=false;
    public ___isVisible?:boolean = false;
    public accessKey?: string;
    constructor(content?: string,icon?:any) {
        this.content = content;
        this.icon = icon;
        this.items=[];

    }
    public AddItem(menuItem: MenuItem) {
        this.items!.push(menuItem)
        return this
    }
    public __wrapper?:WrapperMenuItems=undefined;
}
 export type ParamsClick={
    path?:Array<MenuItem>
    items?: MenuItem
    element?:HTMLAnchorElement
}


export type TreeProps = {
    items?: Array<MenuItem>,
    style?: React.CSSProperties,
    className?: string;
    callbackVirtualSize?:()=>VirtualSize

    useCheckBox?:boolean
    height?:number;
    wight?:number;
    iconOpen?: any,
    iconClose?: any,
    iconTree?: any,
    marginItem:number;
    onChangeMenuWidth?:(width:number) => void
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
