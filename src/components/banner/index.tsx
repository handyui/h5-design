/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC } from 'react';
import styles from './index.scss'

interface BannerPageProps{
  [key:string]:any
}

const BannerPage: FC<BannerPageProps> = (props) => {
  const {title, message1, message2, type} = props
  return (
    <div className={styles.mHead}>
        <div className={styles.banner} style={{backgroundImage: `url(${require(`@/assets/images/${type}.png`).default})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
            <h1>{title}</h1>
            <p>{message1}</p>
            <p>{message2}</p>
            <button className={styles.btn}>免费咨询</button>
        </div>
    </div>
  );
}

export default BannerPage
