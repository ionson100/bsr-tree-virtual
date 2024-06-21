# bsr-tree-virtual

> React component tree menu

[![NPM](https://img.shields.io/npm/v/bsr-tree-virtual.svg)](https://www.npmjs.com/package/bsr-tree-virtual) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bsr-tree-virtual
```

## Usage

```jsx
import React from 'react';
import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";
import {TreeMenu, MenuItem} from "bsr-tree-virtual"
import "bsr-tree-virtual/dist/index.css"

const listItem= []

const m = new MenuItem('Root');
m.AddItem(new MenuItem('sub_root')
    .AddItem(new MenuItem('sub_sub_root')
        .AddItem(new MenuItem('sub_sub_sub_root')
            .AddItem(new MenuItem('pre_final')
                .AddItem(new MenuItem('final'))))));
listItem.push(m)

function App() {
    return (

        <TreeMenu
            iconTree={<MdOutlineSubdirectoryArrowRight size={20}/>}
            iconClose={<FaRegPlusSquare size={20}/>}
            iconOpen={<FaRegMinusSquare size={20}/>}
            wight={1000}
            height={1000}
            items={listItem}
            marginItem={20}
            itemSize={33}
            onClickMenuItem={(tree,ob)=>{
                console.log({
                    text:ob.item.content,
                    id:ob.item.id,
                    isOpen:ob.item.isOpen,
                    isFinal:!ob.item.items||ob.item.items.length===0
                })
            }}
        />

    );
}

export default App;
```

## License

MIT © [ionson100](https://github.com/ionson100)

[Props, Function](https://ionson100.github.io/wwwroot/index.html#page=bsrtree).

[Examples, Help pages](https://ionson100.github.io/wwwroot/index.html#page=5-1).
