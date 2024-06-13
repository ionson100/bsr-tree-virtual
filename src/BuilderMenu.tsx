import {MenuItem} from "./menu/treeProps";
import {CgMenuRound} from "react-icons/cg";

export function GetListItem(): Array<MenuItem>{
    let list:Array<MenuItem>=[]

    {
        const m= new MenuItem('test');
        m.style={color:"red",fontWeight:"bold"}
        m.AddItem(new MenuItem('sub_test')
            .AddItem(new MenuItem('sub_sub_test')
                .AddItem(new MenuItem('final')
                    .AddItem(new MenuItem('sub_final')
                        .AddItem(new MenuItem('45'))))));

        m.AddItem(new MenuItem('sub_test')
            .AddItem(new MenuItem('sub_sub_test')
                .AddItem(new MenuItem('final')
                    .AddItem(new MenuItem('sub_final')
                        .AddItem(new MenuItem('45'))))));

        m.AddItem(new MenuItem('sub_test')
            .AddItem(new MenuItem('sub_sub_test')
                .AddItem(new MenuItem('final')
                    .AddItem(new MenuItem('sub_final')
                        .AddItem(new MenuItem('45'))))));
        m.accessKey="22"
        //list.push(m)
    }

    const dd=5;
    for (let i = 0; i < dd; i++) {
        const m= new MenuItem();
        m.content="root  : "+i;
        m.accessKey="3"
        // eslint-disable-next-line react/jsx-no-undef
       m.icon= <CgMenuRound color={"yellow"} size={20} style={{background:"green",borderRadius:"50%"}}/>
        m.url="#id="+m.id


        const list2:Array<MenuItem>=[]
        for (let j = 0; j < dd; j++) {
            const m1= new MenuItem();
            m1.accessKey="33"

            //m1.className='tree-menu-item2'
            m1.content="sub_root: "+i +" "+j;
            m1.url="#id="+m1.id
            list2.push(m1)
            const list3:Array<MenuItem>=[]
            for (let k = 0; k < dd; k++) {
                const m11= new MenuItem();
                if(i===5&&j===2&&k===2){
                    m11.id='65785a8c-f1a8-4ac4-8cc5-bb9897127cbd' ;
                    m11.content="sub_root: "+i +" "+j+" "+k+" -----------------";
                }
                m11.accessKey='333'
                m11.url="#id="+m11.id
                m11.content="sub_root: "+i +" "+j+" "+k+"";
                list3.push(m11)
                m1.items=list3
            }
        }
        m.items=list2
        list.push(m)
    }


    //list=[]

    const m= new MenuItem('test');
    m.style={color:"red",fontWeight:"bold"}
    m.AddItem(new MenuItem('sub_test')
    .AddItem(new MenuItem('sub_sub_test')
    .AddItem(new MenuItem('final')
    .AddItem(new MenuItem('sub_final')
    .AddItem(new MenuItem('45'))))));

    m.AddItem(new MenuItem('sub_test')
    .AddItem(new MenuItem('sub_sub_test')
    .AddItem(new MenuItem('final')
    .AddItem(new MenuItem('sub_final')
    .AddItem(new MenuItem('45'))))));

    m.AddItem(new MenuItem('sub_test')
    .AddItem(new MenuItem('sub_sub_test')
    .AddItem(new MenuItem('final')
    .AddItem(new MenuItem('sub_final')
    .AddItem(new MenuItem('45'))))));
    m.accessKey="22"



    // m.url=()=>{
    //    window.location.href='#id='+m.id;
    // }

    //m.url=undefined

    list.push(m)

    return list;

}
