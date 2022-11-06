import { useState, useRef, useEffect } from 'react'
import styles from './App.module.less'

function App() {

  const loveRef = useRef<HTMLCanvasElement>(null);

  const initialLoveAnimation = (ele: HTMLCanvasElement) => {
    // console.log(ele.getBoundingClientRect())
    const {width, height} =ele.getBoundingClientRect()
    const ctx: CanvasRenderingContext2D |null  = ele.getContext('2d');
    if(ctx){
       ctx.lineWidth = 2
       ctx.resetTransform()
       ctx.translate(width/ 2, height /2);
       beginDraw(ctx)
    }
   
  }

  const beginDraw = (ctx: CanvasRenderingContext2D) =>{
      // 弧度
      let t=0;
      // 每次增长多少弧度
      let vt = 0.01;
      // 最大弧度
      let maxt = 2*Math.PI;
      // 根据增长弧度得循环次数
      let maxi = Math.ceil(maxt/vt);
      let pointArr: number[][]=[];
      // 步长越大，画的形状越大
      let size = 15;
      let x=0;
      let y=0;
      for(let i=0;i<=maxi;i++){
          // x=16 * (sin(t)) ^ 3;
          let x = 16 * Math.pow(Math.sin(t),3);
          // y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
          let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) -2 * Math.cos(3 * t)- Math.cos(4 * t);
          t+=vt;
          pointArr.push([x*size,-y*size]);
      }
      ctx.moveTo(pointArr[0][0],pointArr[0][1]);
  
      let idx = 2;
      ctx.fillStyle='#c00';
      ctx.strokeStyle='#c00';
      let timer: number;
  
       drawPoint();

      function drawPoint() {
        console.log('drawing');
        
          x = pointArr[idx][0];
          y = pointArr[idx][1];
          ctx.lineTo(x,y);
          if(idx+1 >= pointArr.length){
            ctx.fill();
            ctx.resetTransform()
              clearTimeout(timer);
          } else {
              idx++;
              clearTimeout(timer);
              timer = setTimeout(()=>drawPoint(),16.66666667);
              ctx.stroke();
          }
      }
  }
  useEffect(() => {
    loveRef.current && initialLoveAnimation(loveRef.current)
  }, [loveRef])

  return (
    <div className={styles.app}>
      <canvas id={styles['canvas-love']}width="700px" height="700px" ref={loveRef}></canvas>
    </div>
  )
}

export default App
