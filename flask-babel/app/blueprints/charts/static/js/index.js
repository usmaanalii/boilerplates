import { generateData, wagonWheel } from './wagonWheelChart';
import data from './data';

const wagonData = generateData(data);

wagonWheel(wagonData, 'runs_off_bat');
