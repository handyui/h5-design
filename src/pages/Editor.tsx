/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react'
import ComponentList from './leftPanel'
import DragCanvas from './dragCanvas'
import AttrSetting from './attrSetting'
import styles from '@/assets/style/style.scss'
import {
  DownloadOutlined,
  SaveOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import CodePreview from './codePreview'
import { connect} from 'react-redux';
import { Modal, message } from 'antd';
import { useHistory } from 'react-router-dom'
import img from '@/assets/images/logo.png'

interface EditorPageProps{
    [key:string]:any
}

const EditorPage: FC<EditorPageProps> = (props) => {
  const {dragDataList} = props
  const [visible, setVisible] = useState(false)
  const history = useHistory()

    return (
        <div className={styles.editor}>
          <div className={styles.topPane}>
          <div className={styles.brandLogo} onClick={()=>history.push('/')}><img className={styles.logo} src={img}  alt=''/></div>
          <div className={styles.rightArea}>
           <ul>
              <li onClick={()=>{history.push('/')}}>
                <SaveOutlined />
                <span>工作台</span>
              </li>
              <li onClick={()=>{
                  if(dragDataList&&dragDataList.length>0){
                    setVisible(true)
                  }else{
                    message.warning('暂无代码');
                  }
                }}>
                <InstagramOutlined />
                <span>代码</span>
              </li>
              <li onClick={()=> message.warning('功能开发中...')}>
                <SaveOutlined />
                <span>保存</span>
              </li>
              <li onClick={()=> message.warning('功能开发中...')}>
                <DownloadOutlined />
                <span>导出</span>
              </li>
            </ul>
          </div>
          <div className={styles.login} >
            <img src="https://avatars.githubusercontent.com/u/36528063?v=4" className={styles.avatar}  alt=''/>
          </div>
           
          </div>
          <div className={styles.mainContent}>
            <ComponentList />
            <DragCanvas />
            <AttrSetting /> 
            {/* dragItem={dragItem} callback={configCallback} */}
            <Modal
              title="React开发规范"
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1000}
            >
              <CodePreview />
            </Modal>
          </div>
        </div>
    );
}

const mapStateToProps = (state:any) => {
  return {
      dragDataList: state.dragData.dragDataList,
      selectItem: state.dragData.selectItem,
      selectIndex: state.dragData.selectIndex
  }
};
  
export default connect(mapStateToProps,{})(EditorPage);
  