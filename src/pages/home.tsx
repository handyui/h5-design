/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react';
import { DeleteOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from '@/assets/style/style.scss'
import img from '@/assets/images/logo.png'

const HomePage: FC = (props) => {
  const {children} = props
  const history = useHistory()
  const [currentIndex, setCurrentIndex ] = useState(0)
  const [nav, setNav ] = useState([
    {
      icon: <AppstoreOutlined />,
      title: '工作台',
      url: '/'
    },
    {
      icon: <DeleteOutlined />,
      title: '回收站',
      url: '/trash'
    }
  ])

  return (
    <div className={styles.workspacePage}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={img} alt='' />
          </div>
          <ul className={styles.nav}>
            {
              nav.map((item:any, index:number)=>
                <li key={item.title} onClick={()=>{ 
                  history.push(item.url)
                  setCurrentIndex(index)
                }} 
                style={{
                  color: currentIndex===index? '#187cea':'#333', 
                  background: currentIndex===index? '#fff':''
                }}
                >
                  {/* <AppstoreOutlined /> */}
                  <i>{item.icon}</i>
                  <span>{item.title}</span>
                </li>
              )
            }
          </ul>
        </div>
        <div className={styles.right}>
          <div className={styles.nav}>
            <div className={styles.login} >
              <img src="https://avatars.githubusercontent.com/u/36528063?v=4" className={styles.avatar}  alt='' />
            </div>
            </div>
          <div className={styles.workList}>
            {children}
            {/* */}
          </div>
        </div>
    </div>
  );
}

export default HomePage
