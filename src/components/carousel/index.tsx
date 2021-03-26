/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC, useState } from 'react'
import styles from './index.scss'
import { Carousel } from 'antd-mobile'

interface CarouselPageProps{
  [key:string]:any
}

const CarouselPage: FC<CarouselPageProps> = (props) => {
  const {title, message1, message2, url1, des1, url2, des2, type, imgHeight} = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    data: [{
      title: des1,
      url: url1
    }, {
      title: des2,
      url: url2
    }],
  } as any)

  return (
    <div className={styles.carousel} style={{background:type}}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.des}>{message1}</p>
      <p className={styles.des}>{message2}</p>

      <Carousel
        autoplay={false}
        infinite
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
        dotStyle={{ borderRadius: 0, width: '20px', height: '5px', position: 'relative', top:'10px',background: '#517bfc'}}
        dotActiveStyle={{ borderRadius: 0, width: '20px', height: '5px', position: 'relative', top:'10px',background: '#517bfc',  opacity:'0.3'}}
      >
        {state.data.map((val:any, index:number) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={val}
            style={{ display: 'flex', flexDirection: 'column',width: '100%', height: parseInt(imgHeight) }}
          >
            <img
              src={val.url}
              alt=""
              style={{ height: '100%', verticalAlign: 'top' }}
              // onLoad={() => {
              //   // fire window resize event to change height
              //   window.dispatchEvent(new Event('resize'));
              //   setState({ imgHeight: 'auto' });
              // }}
            />
          <span className={styles.tit}>{val.title}</span>   
          </a>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselPage
