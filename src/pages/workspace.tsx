import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styles from '@/assets/style/style.scss'
import img from '@/assets/images/examples_01.png'

const WorkspacePage: FC = (props) => {
    const history = useHistory()
    return (
        <>
            <div className={styles.cardListPanel}>
                {/* <div className={styles.add}  onClick={()=>{history.push('/editor?id=666')}}>
                    <PlusOutlined style={{ fontSize: '34px', color: '#08c' }} />
                    <span>创建新文件</span>
                </div> */}
                <div className={styles.item} onClick={()=>{history.push('/editor?id=123')}}>
                <div className={styles.top}><img src={img} alt=''/></div>
                <div className={styles.bot}>
                    <h1>示例文件</h1>
                    <span>昨天13:07</span>
                </div>
                </div>
            </div> 
        </>
    )
}

export default WorkspacePage
