import { useState, useRef, useEffect } from 'react'
import styles from './App.module.less'
// import  {raf} from 'utils/shared'
function App() {

  const loveRef = useRef<HTMLCanvasElement>(null);

  const initialLoveAnimation = () => {
    const ele = loveRef.current as HTMLCanvasElement | null
    console.log(ele?.getBoundingClientRect())
    const { innerWidth, innerHeight } = window
    if (ele) {
      ele.width = innerWidth
      ele.height = innerHeight
      const ctx: CanvasRenderingContext2D | null = ele.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 2
        ctx.resetTransform()
        ctx.translate(innerWidth / 2, innerHeight / 2);
        beginDraw(ctx)
      }
    }


  }
  const beginDraw = (ctx: CanvasRenderingContext2D) => {
    // 弧度
    let t = 0;
    // 每次增长多少弧度 
    let vt = 0.01;
    // 最大弧度
    let maxRadian = 2 * Math.PI;
    // 根据增长弧度得循环次数
    let max = Math.ceil(maxRadian / vt);
    let pointArr: number[][] = [];
    // 倍数
    let size = 15;
    let coordinateX = 0; 
    let coordinateY = 0;
    for (let i = 0; i <= max; i++) {
      // x=16 * (sin(t)) ^ 3;
      let x = 16 * Math.pow(Math.sin(t), 3);
      // y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
      let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      t += vt;
      pointArr.push([x * size, -y * size]);
    }
    // console.log(pointArr);

    ctx.moveTo(pointArr[0][0], pointArr[0][1]);

    let idx = 2;
    ctx.fillStyle = '#c00';
    ctx.strokeStyle = '#c00';
    let timer: number;

    drawPoint();

    function drawPoint() {
      console.log('drawing');

      coordinateX = pointArr[idx][0];
      coordinateY = pointArr[idx][1];
      ctx.lineTo(coordinateX, coordinateY);
      if (idx + 1 >= pointArr.length) {
        ctx.fill();
        ctx.resetTransform()
        cancelAnimationFrame(timer);
      } else {
        idx++;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(drawPoint);
        ctx.stroke();
      }
    }
  }
  useEffect(() => {
    initialLoveAnimation()
    window.addEventListener('resize', initialLoveAnimation)
    return () => window.removeEventListener('resize', initialLoveAnimation)
  }, [loveRef.current])

  return (
    <div className={styles.app}>
      <canvas id={styles['canvas-love']} ref={loveRef} ></canvas>

    </div>
  )
}

export default App
