import { useState, useRef, useEffect } from "react";
import styles from "./App.module.less";
// import  {raf} from 'utils/shared'
import { Garden } from "./utils/garden";
import { fabric } from "fabric";
function App() {
  const loveRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
  const [instance, setInstance] = useState(null);
  function init() {
    const loveHeart = document.querySelector("#loveHeart");

    const gardenCanvas: HTMLCanvasElement | null =
      document.querySelector("#canvas-love");
    let garden;
    if (gardenCanvas) {
      const width = loveHeart?.getBoundingClientRect().width || 1000;
      const height = loveHeart?.getBoundingClientRect().height || 600;
      gardenCanvas.width = width;
      gardenCanvas.height = height;
      const gardenCtx = gardenCanvas.getContext("2d");
      if (gardenCtx) {
        setCtx(gardenCtx);
        gardenCtx.translate(width / 2, height / 2);
        gardenCtx.globalCompositeOperation = "lighter";
        garden = new (Garden as any)(gardenCtx, gardenCanvas);
        setInstance(garden);
        setInterval(function () {
          garden?.render();
        }, Garden.options.growSpeed);
      }
      function getHeartPoint(c) {
        var b = c / Math.PI;
        var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
        var d =
          -20 *
          (13 * Math.cos(b) -
            5 * Math.cos(2 * b) -
            2 * Math.cos(3 * b) -
            Math.cos(4 * b));
        return [a, d];
      }

      function startHeartAnimation() {
        var c = 50;
        var d = 10;
        var b = [];

        var a = setInterval(function () {
          var h = getHeartPoint(d);
          var e = true;
          for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var j = Math.sqrt(
              Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2)
            );
            if (j < Garden.options.bloomRadius.max * 1.3) {
              e = false;
              break;
            }
          }
          if (e) {
            b.push(h);
            garden.createRandomBloom(h[0], h[1]);
          }
          if (d >= 30) {
            clearInterval(a);
            // showMessages()
          } else {
            d += 0.2;
          }
        }, c);
      }
      startHeartAnimation();
    }
  }
  useEffect(() => {
    loveRef.current && init();
  }, [loveRef.current]);
  useEffect(() => () =>instance&& instance.clear(), [instance]);
  return (
    <div className={styles.app}>
      <div id="loveHeart">
        <canvas
          id="canvas-love"
          ref={loveRef}
          width={900}
          height={900}
        ></canvas>
      </div>
    </div>
  );
}

export default App;
