import React, {FC, useState} from 'react';
import { ReactSortable } from 'react-sortablejs'
import componentList from '../components/componentConfig/config'
import { ItemType } from './dragCanvas'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import styles from '@/assets/style/style.scss'
import { Popover } from 'antd'

const ComponentList: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const udatas:any=[
    // {
    //   id:'',
    //   type: 'div11',
    //   title:'222',
    //   nested: true,
    //   props: {
    //     style: {
    //       border: '1px solid red',
    //       width: '200px',
    //       minHeight:'100px'
    //     },
    //   },
    //   children: [],
    // },
    ...componentList
  ]
  const [unranked, setUnranked] = useState<ItemType[]>(udatas);
  const handleSetUnranked=(newState:any, sortable: any, store: any)=>{
    setUnranked(newState)
  }

  const renderComponent = (data:any) => {
    return data.map((item:any) => {
      const img = require(`@/assets/components/${item.src}`);
      return (
        <div data-id={item.type} className={styles.item} key={item.type}>
          <img src={img.default} width="200px"  alt=''/>
          <span>{item.title}</span>
        </div>
      )
    })
  }

  return (
    <div style={{
      display: 'flex'
    }}>
      <div className={styles.leftNav} onClick={()=>setCollapsed(!collapsed)}>
        <Popover placement="right" content={collapsed ?'展开':'收起'}>
          <p>  { collapsed ? <MenuUnfoldOutlined />:<MenuFoldOutlined /> }</p>  
        </Popover>
        </div>
       <div
       // className="dragContainer"
       className={styles.leftPanel}
       style={{
        transition: 'all ease-in-out 0.5s',
        // position: 'fixed',
        width: collapsed ? '0' : '304px',
        // zIndex: 200,
        boxShadow: 'none',
        height: '100%',
      }}
     >
      <div className={styles.toolPanel}>
       <ReactSortable
           list={unranked}
           setList={handleSetUnranked}
           className={styles.listContainer}
           group={{
             name: 'rancor',
             pull: 'clone', // 拉 true 表示我可以被拉到其他地方
             put: false, // 放 false 表示其他item不能放入我这里
             // revertClone: true
           }}
           dragClass={'dragged'}
           ghostClass={'ghost'}
           animation={300}
           sort={false}
          //  draggable='.item'
         >
           {/* {unranked.map(item => (
              <div key={item.type}>
              {item.title}
            </div>
           ))} */}
           {renderComponent(unranked)}
         </ReactSortable>
       </div>
        
      </div>
   
    </div >
  );
}

export default ComponentList

 