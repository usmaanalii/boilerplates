import { select as d3select } from 'd3-selection';
import domtoimage from 'dom-to-image';
import { generateData, wagonWheel } from './wagonWheelChart';
import data from './data';

const wagonData = generateData(data);

wagonWheel(wagonData, 'runs_off_bat');

document.querySelector('input[type="button"]').addEventListener('click', () => {
  const node = [...document.querySelectorAll('.wagon-wheel__container')][0];

  setTimeout(() => {
    domtoimage.toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }, 2000);
});
