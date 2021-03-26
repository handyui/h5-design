/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Input, Select, Collapse, Switch } from 'antd';
import { cloneDeep, itemUpdateInfo } from '@/utils'
import { connect, useDispatch} from 'react-redux';
import { setDragDatas, setConfig } from '@/store/reducers/dragDataReducer'
import styles from '@/assets/style/style.scss'
import Color from '../components/picker'

const { Panel } = Collapse

interface AttrSettingProps{
    [key:string]:any
}

interface ConfigType{
  text:string
  children: any[]
}

const AttrSetting = forwardRef<any, AttrSettingProps>((props, ref) => {
    const {dragDataList, selectIndex, selectItem, selectReactNodeConfig, config} = props
    const [toggle, setToggle] = useState(true)
    const dispatch = useDispatch()

    // const changeToggle=(val:any)=>{
    //     setToggle(!toggle)
    // }

    useImperativeHandle(ref, () => ({
        changeToggle:()=>{
            if(!toggle) setToggle(true)
        }
    }))

    const changeValue=(targetValue:any, key:any)=>{
      const { dragItem, arrIndex, propsInfo } = config;
        const data = cloneDeep(propsInfo)
        let configInfo = data
        if(key.indexOf('.') !== -1) { // 有style.width
          const keyarr = key.split('.');
          keyarr.forEach((item:any, index:number) => {
            if (index === keyarr.length - 1) {
              configInfo[item] = targetValue;
            } else {
              configInfo = configInfo[item];
            }
          });
        } else {
          configInfo[key] = targetValue;
        }
        const payload = {
          ...config,
          propsInfo: data,
        }
        dispatch(setConfig(payload))

        dragItem.props = data
        const oldData = cloneDeep(dragDataList);
        const newdata = itemUpdateInfo(arrIndex, oldData, dragItem);
        dispatch(setDragDatas(newdata))
    
      }

  // 改变input配置项触发的函数(nodeProps)
  // key 所对应到的属性名称 e.g:props.content -> content
  const changeReactNodeValue = (targetValue:any, key:any) => { 
    const { nodePropsInfo, dragItem, arrIndex } = config;

    let data = cloneDeep(nodePropsInfo);
    let configInfo = data;
    // 分解key
    const valuearr = key.split('.');
    const objkey = valuearr[0];
    const params = valuearr[1];
    // 赋值给config里对应的key
    configInfo[objkey].params[params] = targetValue;


    const payload = {
      ...config,
      nodePropsInfo: data,
    }
    dispatch(setConfig(payload))

    // 对应渲染到页面上
    dragItem.nodeProps = data;
    const newdata = itemUpdateInfo(arrIndex,  cloneDeep(dragDataList),   dragItem);

    dispatch(setDragDatas(newdata))
  };
    
      const changeValueParent = (type:any, targetValue:any, key:any) => {
        if (type === 'props') {
          return changeValue(targetValue, key);
        }
        if (type === 'reactNodeProps') {
          return changeReactNodeValue(targetValue, key);
        }
      };
    
      const renderValue=( { text: title, field: value, type, data }:any, propsType:string)=>{
        let valueInfo = propsType === 'props' ? config.propsInfo : config.nodePropsInfo;
        if (propsType === 'props') {
          if (value.indexOf('.') !== -1) {
            const valuearr = value.split('.');
            // console.log('valuearr', valuearr)
            valuearr.forEach((item:any, index:number) => {
              if (index === valuearr.length - 1) {
                valueInfo = valueInfo[item];
              } else {
                 valueInfo = valueInfo[item];
              }
            });
          } else {
            valueInfo = valueInfo[value];
          }
        } else {
          // reactnodeinofo;
          // 特殊处理,key,只有.的参数
          const valuearr = value.split('.');
          const key = valuearr[0];
          const params = valuearr[1];
          valueInfo = valueInfo[key].params[params];
        }
    
        if (type === 'string') {
          return (
            <>
              <span>{title}</span>
              <Input
                value={valueInfo}
                style={{ width: '50%' }}
                onChange={e => changeValueParent(propsType, e.target.value, value)}
              />
            </>
          );
        }
        if (type === 'array') {
          if(typeof valueInfo !== 'string') {
            valueInfo = '' + valueInfo;
          }
          return (
            <>
              <span>{title}</span>
              <Select
                defaultValue={valueInfo}
                style={{ width: '50%' }}
                onChange={v => {
                  changeValueParent(propsType, v, value);
                }}
              >
                {data.map((item:any, index:number) => {
                  return (
                    <Select.Option value={item.value} key={index}>
                      {item.text}
                    </Select.Option>
                  );
                })}
              </Select>
            </>
          );
        }
        if (type === 'color') {
          return (
            <span style={{ display:'flex', alignItems: 'center'}}>
              <span style={{marginRight: '5px'}}>{title}</span>
              <Color
                color={valueInfo}
                style={{ width: '50%' }}
                onChange={(color:any) => changeValueParent(propsType, color, value)}
              />
            </span>
          );
        }
    
        if (type === 'boolean') {
          return (<>
            <span>{title}</span>
            <Switch
              defaultChecked={valueInfo}
              style={{ width: '50%' }}
              onChange={v => {
                changeValueParent(propsType, v, value);
              }}
            />
          </>);
        }
        return <div>other</div>;
      };
    
      // 配置项的渲染组件  data 该配置项的数据结构
      const renderConfig = (data:ConfigType[], type:string) => {
        if (JSON.stringify(data) !== '[]' && data) {
          return data.map((item:ConfigType, index:number) => {
            return (
              <Panel header={item.text} key={item.text}>
                <ul className={styles.panelContent} key={index}>
                  {/* <div>
                  <h3>{item.text}</h3>
                </div> */}
                    {item.children.map((item, index) => {
                      return <li key={index}>{renderValue(item, type)}</li>;
                    })}
                </ul>
              </Panel>
            )
          })
        }
      }
    
    return (
      <>
        <div 
          className={styles.attrSetting}
          // style={{
          //   transition: 'all ease-in-out 0.5s',
          //   transform: toggle ? 'translate(0,0)':'translate(100%,0)' ,
          // }}
        >
          { dragDataList.length>0 && config ?     
              <Collapse defaultActiveKey={['样式', '主题', '文字内容']}>
                {renderConfig(config.propsConfig, 'props')}
                {renderConfig(config.nodePropsConfig, 'reactNodeProps')}
              </Collapse>
            :'' }
      </div>
      {/* <div
        className={styles.toggleBtn}
        style={{
          position: 'absolute',
          right: toggle ? '304px':0,
          transform: 'translate(0,-50%)',
          transition: 'all ease-in-out 0.5s',
        }}
        onClick={changeToggle}
      >
        {toggle ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div> */}
      </>
    );
})

const mapStateToProps = (state:any) => {
  return {
      dragDataList: state.dragData.dragDataList,
      selectItem: state.dragData.selectItem,
      selectIndex: state.dragData.selectIndex,
      selectConfig: state.dragData.selectConfig,
      selectReactNodeConfig: state.dragData.selectReactNodeConfig,
      config: state.dragData.config,
  }
};
  
export default connect(mapStateToProps,{})(AttrSetting);
  