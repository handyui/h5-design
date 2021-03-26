/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC } from 'react'
import styles from './index.scss'
interface BannerPageProps{
  [key:string]:any
}

const BannerPage: FC<BannerPageProps> = (props) => {
  const {title, message1, message2, url, type, imgHeight} = props

  return (
    <div className={styles.carousel} style={{background:type}}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.des}>{message1}</p>
      <p className={styles.des}>{message2}</p>

      <div style={{ height: parseInt(imgHeight)}}>
        <img src={url} alt="" style={{ height: '100%', verticalAlign: 'top' }}/>
      </div>
    </div>
  );
}

export default BannerPage
