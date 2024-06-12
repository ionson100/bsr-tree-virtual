import React, {useRef} from 'react';
import './App.css';
import {TreeMenu} from "./menu/treeMenu";
import './menu/index.css'
import {MenuItem} from "./menu/treeProps";
import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";

import {GetListItem} from "./BuilderMenu";
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";





function App() {
    const mResDiv = useRef<HTMLDivElement>(null)
    const mResLabel = useRef<HTMLLabelElement>(null)
    const menu = useRef<InstanceType<typeof TreeMenu>>(null)
    const input = useRef<HTMLInputElement>(null)
    return (
        <div style={{display: "flex", height: "100%"}} ref={mResDiv}>
            <TreeMenu



                useCheckBox={true}
                ref={menu}
                marginItem={20}
                callbackVirtualSize={()=>{
                    return{
                        wight:1000,
                        height:window.innerHeight
                    }
                }}

                iconTree={<MdOutlineSubdirectoryArrowRight size={20}/>}
                iconClose={<FaRegPlusSquare size={20}/>}
                iconOpen={<FaRegMinusSquare size={20}/>}

                items={GetListItem()}
                onClickMenuItem={(menu, obj) => {
                    mResLabel.current!.innerText = JSON.stringify({
                        id: obj.items?.id,
                        text: obj.items?.content,
                        isOpen: obj.items?.isOpen,
                        url: obj.items?.url
                    })
                    setTimeout(() => {
                        input.current!.value = obj.items!.id
                    })
                }}

            />
            <div style={{padding: 10}}>
                <label ref={mResLabel}>3434</label>
                <br/>
                <input ref={input} type={"text"} style={{width: 400}}/>
                <br/>
                <button style={{margin: 10}} onClick={() => {
                    menu.current!.Expand()
                }}>Expand
                </button>

                <button onClick={() => {
                    menu.current!.Collapse()
                }} style={{margin: 10}}>Collapse
                </button>


                <button onClick={() => {
                    const m = new MenuItem('test');
                    m.style = {color: "red", fontWeight: "bold"}
                    m.AddItem(new MenuItem('sub_test').AddItem(new MenuItem('sub_sub_test').AddItem(new MenuItem('final').AddItem(new MenuItem('sub_final').AddItem(new MenuItem('45'))))));
                    menu.current!.GetListItems()?.push(
                        m
                    )

                    menu.current!.RefreshMenu()
                }} style={{margin: 10}}> add
                </button>

                <button onClick={() => {


                    menu.current!.OpenMenuItemAndClick(input.current!.value)

                }} style={{margin: 10}}>open id
                </button>

                <button onClick={() => {

                    const m = new MenuItem('test');
                    m.style = {color: "red", fontWeight: "bold"}
                    m.AddItem(new MenuItem('sub_test').AddItem(new MenuItem('sub_sub_test').AddItem(new MenuItem('final').AddItem(new MenuItem('sub_final').AddItem(new MenuItem('45'))))));

                    const m1 = new MenuItem('test22');
                    m1.style = {color: "red", fontWeight: "bold"}
                    m1.AddItem(new MenuItem('sub_test').AddItem(new MenuItem('sub_sub_test').AddItem(new MenuItem('final').AddItem(new MenuItem('sub_final').AddItem(new MenuItem('45'))))));

                    const array = [m, m1]

                    menu.current!.AddItems(...array)

                }} style={{margin: 10}}>Add Item
                </button>

                <button onClick={() => {

                    menu.current!.DeleteAllItems()

                }} style={{margin: 10}}>Delete item
                </button>
                <button onClick={() => {



                    menu.current!.RewriteItems(...GetListItem())

                }} style={{margin: 10}}>Rewrite
                </button>
            </div>
        </div>

    );
}

export default App;
