# bsr-tree-virtual

> React component tree menu

[![NPM](https://img.shields.io/npm/v/bsr-tree-virtual.svg)](https://www.npmjs.com/package/bsr-tree-virtual) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bsr-tree-virtual
```

## Usage

```tsx
import React from 'react';
import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";
import {TreeMenu, MenuItem} from "bsr-tree-virtual"
import "bsr-tree-virtual/dist/index.css"

const listItem: Array<MenuItem> = []

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
            onClickMenuItem={(target,ob)=>{
                console.log({
                    text:ob.items!.content,
                    id:ob.items!.id,
                    isOpen:ob.items!.isOpen,
                    isFinal:!ob.items!.items||ob.items!.items.length===0
                })
            }}
        />

    );
}

export default App;
```

## License

MIT © [ionson100](https://github.com/ionson100)
