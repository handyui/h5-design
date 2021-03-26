import React, { FC } from 'react';
import img from '@/assets/images/icon_noData.png'
import styles from '@/assets/style/style.scss'

const TrashPage: FC = (props) => {

  return (
    <div className={styles.TrashPage}>
      <div className={styles.noData}>
        <img src={img} alt='' />
        <span>回收站内没有文件</span>
      </div>
    </div>
  );
}

export default TrashPage
