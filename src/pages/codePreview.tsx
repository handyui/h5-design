/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { renderPropsToString } from '@/utils'
import { connect } from 'react-redux';

interface CodePreviewProps{
    [key:string]:any
}

const CodePreview: FC<CodePreviewProps> = (props) => {
    const {dragDataList} = props

    const options = {
        selectOnLineNumbers: true,
        theme: 'vs',// 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        roundedSelection: false,// 右侧不显示编辑器预览框
        // autoIndent: true // 自动缩进
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

  // 得到依赖组件
  const dependComponents = () => {
    // console.log('currentView', currentView)
    // 得到对象数组
    const stringCurrentView = JSON.stringify(dragDataList);
    // 正则
    var regex = /\"type\":\"\w+\"/g;
    // 匹配到所有相关字符串数组
    const StringArr:any = stringCurrentView.match(regex);
    const newarr = StringArr.map((item:any) => {
      return item.replace(/\"type\":\"(.*?)\"/g, '$1');
    });
    // 数组去重
    const components = [...new Set(newarr) as any];
    // 当前的依赖list
    const componentsList = [
      'Tag',
      'Button',
      'Div',
      'InputItem',
      'NavBar',
      'Result',
      'Banner',
      'Carousel',
      'Module',
    ];
    // 过滤
    const dependComponents = components.filter(item => {
      return componentsList.includes(item);
    });
    return dependComponents;
  };

  // 渲染成jsx
  const renderJSONtoJSX = () => {
    const arr = dependComponents();
    const dependCom =
      arr.length > 0 ? `import { Icon, ${arr.join(', ')} } from 'antd-mobile';` : '';
    return `
    import React, { Component } from 'react';
    ${dependCom}
  
    class Index extends Component {
      constructor () {
        super();
      }
      render(){
        return (
          <>
              ${renderDom(dragDataList, 0)}
          </>
        )
      }
    }
    export default Index;
    `;
  };

    return (
        <>
            <MonacoEditor
                width="100%"
                height="400"
                language="javascript"
                theme="vs-light"
                value={dragDataList.length>0? renderJSONtoJSX(): ''}
                options={options}
            />
        </>
    );
}


const mapStateToProps = (state:any) => {
    return {
        dragDataList: state.dragData.dragDataList,
        selectItem: state.dragData.selectItem,
        selectIndex: state.dragData.selectIndex
    }
  };
    
  export default connect(mapStateToProps,{})(CodePreview);
    
