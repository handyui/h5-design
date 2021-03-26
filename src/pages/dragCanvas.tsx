/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs'
// import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, renderPropsToString, getDragItem, findItemObject, setStorage} from '@/utils'
import 'antd-mobile/dist/antd-mobile.css'
import { Menu, Item, useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { connect, useDispatch} from 'react-redux';
import { setDragDatas, setSelectItem, setConfig} from '@/store/reducers/dragDataReducer';
import styles from '@/assets/style/style.scss'
import componetList from '@/components/componentConfig/config'
import {PlusCircleOutlined, MinusCircleOutlined, RedoOutlined} from '@ant-design/icons'

import {
  Button,
  Tag,
  NavBar,
  Icon,
  InputItem,
  SearchBar,
  Result,
} from 'antd-mobile'
import Banner from '@/components/banner'
import Carousel from '@/components/carousel'
import Module from '@/components/module'

export interface ItemType {
  id:string
  type: string;
  title: string;
  nested?: boolean;
  props?: any;
  children?: any
}

const GlobalComponent:any = {
  Tag,
  Icon,
  InputItem,
  SearchBar,
  Button,
  NavBar,
  Result,
  Banner,
  Carousel,
  Module
}

const renderReactDom = ({antd, componentName, props}:any) => {
  if(antd) {
    const Comp = GlobalComponent[componentName];
    return (
      React.createElement(
        Comp,
        props
      )
    )
  }
}

interface DragCanvasPageProps{
  [key:string]:any
}

const DragCanvasPage: FC<DragCanvasPageProps> = (props) => {
  const {dragDataList} = props
  // const {setDragDatas, isAuth} = props
  // console.log('setDragDatas', setDragDatas)
  const [visible, setVisible] = useState(false)

  const [ranked, setRanked] = useState<ItemType[]>(dragDataList.length>0 ? dragDataList:[]);
  const dispatch = useDispatch()
  const [scaleNum, setScaleNum] = useState(1)

  const handleSetRanked=(newState:any, sortable: any, store: any)=>{
    setRanked(newState)
    dispatch(setDragDatas(newState))  
  }

  // 触发右侧属性编辑板
  const getAttrById=(indexs:any)=>{
    const dragItem = getDragItem(indexs, cloneDeep(dragDataList));
    const componetFromList = findItemObject(componetList, dragItem.type);
    const payload = {
      dragItem,
      arrIndex: indexs,
      propsInfo: dragItem.props,
      propsConfig: componetFromList.config,
      nodePropsInfo: dragItem.nodeProps,
      nodePropsConfig: componetFromList.reactNodeConfig
    }
    dispatch(setSelectItem(dragItem))
    dispatch(setConfig(payload))
  }

  useEffect(()=>{
    setRanked(dragDataList)
    setStorage('dragData', dragDataList)
  },[dragDataList])


  useEffect(()=>{
    if(dragDataList.length>0){
      // 显示右侧编辑板第一个
      getAttrById('0-0')
    }
  },[])
  

  const renderView=(item:any, index:any)=>{
    return ranked.map((item:any, i) => {
      const indexs = index === '' ? `0-${i}` : `${index}-${i}`;
      // 选中时的class
      let isSelectClass = { border: '1px dashed red'}
      if (item.children) {
        let { props: style = {} } = item;
        let draggable = { border: '1px dashed black'};
        let mergestyle = Object.assign({}, style.style, draggable)
        let divprops = {
          style: mergestyle,
          'data-id': indexs,
          key: indexs,
          onContextMenu: (e: React.MouseEvent)=>{
            show(e, {
             props: {
              dataId: indexs,
             },
            })
          }
        }
        return (React.createElement(
          'div',
          divprops,
          // <span>{item.title}</span>
          <ReactSortable
            list={ranked}
            setList={handleSetRanked}
            // clone={handleClone}
            className={'listContainer'}
            group={{
              name: 'rancor',
              pull: false, // 我的不能被拉到其他地方
              put: true,
            }}
            dragClass={'dragged'}
            ghostClass={'ghost'}
            animation={300}
            onAdd={event => onAddItem(event)}
          >
            {item.children.length > 0
              ? renderView(item.children, indexs)
              : null}
          </ReactSortable>
        ))
      }

      const Comp = GlobalComponent[item.type];
      // 具有特殊属性(ReactNode)
      let ReactNodeProps:any = {}
      if (item.nodeProps) {
        const nodeProps = item.nodeProps
        for (const key in nodeProps) {
          // eslint-disable-next-line no-eval
          var func = eval('('+nodeProps[key].renderFunc+')');
          const params = nodeProps[key].params;
          const reactDomParmas = func(params);
          const domContent = renderReactDom(reactDomParmas);
          ReactNodeProps[key] = domContent;
        }
      }

      let props = {
        ...item.props,
        ...ReactNodeProps,
        'data-id': indexs,
        key: indexs,
        onContextMenu: (e: React.MouseEvent)=>{
          show(e, {
           props: {
            dataId: indexs,
           },
          });
        },
        onClick:(evt:any)=>{
          let parent = evt.target;
          getAttrById(indexs)
        }
      };

      if (item.needDiv === true) {
        return (
          <div data-id={indexs} key={indexs}
          { ...props
          }>
            {React.createElement(
              Comp,
              props,
              item.props.content ? item.props.content : null,
            )}
          </div>
        );
      } else {
        let cloneProps = cloneDeep(props);
        return React.createElement(
          Comp,
          cloneProps,
          item.props.content ? item.props.content : null,
        );
      }
      
    })
  }

  const onAddItem = (event:any) => {
    const startIndex = event.newIndex;
    const comNameOrPath = event.clone.dataset.id; 
    const componetFromList = findItemObject(componetList, comNameOrPath);
  }

  

  // 渲染props
  const renderProps = (props:any) => {
    let propsResult = ``;
    for (const key in props) {
      if (props.hasOwnProperty(key) && key !== 'style' && key !== 'content') {
        const value = props[key];
        propsResult += ` ${key}="${value}"`;
      }
    }
    return propsResult;
  };

  // 渲染nodeProps
  const renderNodeProps = (props:any) => {
    let nodePropsResult = ``;
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const value = props[key];
        const template = value.renderString;
        const params = value.params;
        nodePropsResult += `${key}={${renderPropsToString(template, params)}}`;
      }
    }
    return nodePropsResult;
  };

  // 渲染style
  const renderStyle = (style:any) => {
    let styleResult = ``;
    for (const key in style) {
      if (style.hasOwnProperty(key) && key !== 'border' && style[key]) {
        const value = style[key];
        styleResult += `${key}: '${value}'`;
      }
    }
    return styleResult ? `style={{ ${styleResult} }}` : ``;
  };

  // 渲染jsx dom
  const renderDom = (data:any, flag:any) => {
    let result = ``;
    data.forEach((item:any) => {
      if (item.children) {
        result += `
          <${item.type} ${renderStyle(item.props.style)}>
          ${renderDom(item.children, 1)}</${item.type}>
          `;
      } else {
        const { props, nodeProps } = item;
        if (flag) {
          result += `    <${item.type}${renderProps(props)} ${renderNodeProps(
            nodeProps,
          )}${renderStyle(props.style)}>${
            props.content ? props.content : ''
          }</${item.type}>
          `;
        } else {
          result += `<${item.type}${renderProps(props)} ${renderNodeProps(
            nodeProps,
          )}${renderStyle(props.style)}>${
            props.content ? props.content : ''
          }</${item.type}>
          `;
        }
      }
    });
    return result;
  };

  const { show } = useContextMenu({
    id: 'MENU_ID',
  });
  const [hideItems, setHideItems] = useState(false)
  const [animation, setAnimation] = useState(false)

   const indexToArray = (pathStr:any) => `${pathStr}`.split('-').map(n => +n);
  const handleItemClick = (event:any, props:any, type:string) => {
    const newIndex = props.dataId
    let newindexarr = indexToArray(newIndex);
    newindexarr.shift();
    if (type === 'del') {
      ranked.splice(newindexarr[0], 1)
      setRanked([...ranked])
      dispatch(setDragDatas([...ranked]))
    } else if (type === 'copy') {
      const newData = ranked.filter((item:any,index:number)=>{
        return index === newindexarr[0] 
      })
      setRanked([...ranked,...newData])
      dispatch(setDragDatas([...ranked,...newData]))
      dispatch(setConfig({}))
    }
  }

  return (
    <div className={styles.centerArea}>
      <div className={styles.zoomContainer}
        style={{transform: `scale(${scaleNum})`}}
      >
        <div className={styles.phone}></div>
        <ReactSortable
          list={ranked}
          setList={handleSetRanked}
          // clone={handleClone}
          className={styles.dragContainer}
          
          group={{
            name: 'rancor',
            pull: false, // 我的不能被拉到其他地方
            put: true,
          }}
          dragClass={'dragged'}
          ghostClass={'ghost'}
          animation={300}
          onAdd={event => onAddItem(event)}
          setData={(dataTransfer: any, draggedElement:any)=>{
            console.log('交换组件')
            // console.log('setDatasss', dataTransfer, draggedElement)
          }}
        >
          {ranked.length > 0? renderView(ranked, ''):''}
        </ReactSortable>
    </div>
      
      {/* 右键单击 */}
      <div>
        <Menu
          id='MENU_ID'
          // animation={getAnimation() as any}
          // data-test={DATA_TEST.CONTEXT_MENU}
        >
          <Item
            onClick={({event,props}:any)=>handleItemClick(event, props, 'copy')}
            data={{ id: 1 }}
            // data-test={DATA_TEST.MENU_FIRST_ITEM}
            hidden={hideItems}
          >
            复制
          </Item>
          <Item
            onClick={({event,props}:any)=>handleItemClick(event, props, 'del')}
            data={{ id: 2 }}
            // data-test={DATA_TEST.MENU_FIRST_ITEM}
            hidden={hideItems}
          >
            删除
          </Item>
        </Menu>
        </div> 

        <div className={styles.canvasMagnifier}>
          <span onClick={()=>{
            let num = scaleNum+0.2
            if(scaleNum > 1.8) return
            setScaleNum(num)
          }}><PlusCircleOutlined style={{ fontSize: '18px', color: '#6e6e6e' }} /></span>
          <span onClick={()=>{
            let num = scaleNum-0.2
            if(scaleNum < 0.6) return
            setScaleNum(num)
          }}><MinusCircleOutlined style={{ fontSize: '18px', color: '#6e6e6e' }}  /></span>
          <span onClick={()=>setScaleNum(1)}><RedoOutlined  style={{ fontSize: '18px', color: '#6e6e6e' }} /></span>
          <span>{Math.round(scaleNum*100)}%</span>
        </div>
    </div>
  );
}

const mapStateToProps = (state:any) => ({
  dragDataList: state.dragData.dragDataList,
  selectItem: state.dragData.selectItem,
  selectIndex: state.dragData.selectIndex,
  selectReactNodeConfig: state.dragData.selectReactNodeConfig
});

export default connect(mapStateToProps, { })(DragCanvasPage);
