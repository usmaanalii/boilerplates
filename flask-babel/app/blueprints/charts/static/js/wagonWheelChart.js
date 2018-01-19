/* eslint func-names: 0 */
/* eslint no-param-reassign: 1 */
/* eslint array-callback-return: 0 */
/* eslint max-len: 1 */
import { select as d3select } from 'd3-selection';
import { transition as d3transition } from 'd3-transition';
import { arc as d3arc, pie as d3pie } from 'd3-shape';
import { normalize, round, randomArraySelection } from '../../../common/static/js/helpers';
import style from '../css/wagonWheelChart.css';

const baseURL = window.location.origin;
const fetchOptions = { credentials: 'include' };

const generateData = (data, columnName) => {
  const incompleteData = data.length < 8;
  if (incompleteData) {
    const zoneNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const zonesReturned = [...data.map(zone => zone.field_zone)];
    const missingZones = [...zoneNumbers.filter(x => !zonesReturned.includes(x))];
    // TODO: Make this dynamic
    const zoneObjectTemplate = {
      balls_faced: 0,
      batting_average: 0,
      batting_boundary_percent: 0,
      batting_dot_percent: 0,
      batting_strike_rate: 0,
      dots: 0,
      field_zone: 0,
      fives: 0,
      fours: 0,
      innings: 0,
      matches: 0,
      ones: 0,
      runs_off_bat: 0,
      seven_plus: 0,
      sixes: 0,
      span: '2017-2017',
      striker_wickets: 0,
      threes: 0,
      twos: 0,
      variable: 0,
    };
    const filledData = [...missingZones.map(zone =>
      Object.assign(zoneObjectTemplate, { field_zone: zone })),
    ];
    data = [...data, ...filledData];
  }

  const totalRunsOffBat = data.map(zone => zone.runs_off_bat)
    .reduce((a, b) => a + b, 0);

  // Adds a value property to each zone object
  // This is a constant, since we want each slice to be equal width
  data.map((zone) => {
    zone.value = 20;
    zone.percentage_runs = round((zone.runs_off_bat / totalRunsOffBat) * 100, 1) || 0;
    zone.scoring_percentage = round(100 - zone.batting_dot_percent, 1) || 0;
    zone.boundaries = zone.sixes + zone.fours;
  });

  // Sorts the list data by the field_zone key value
  data.sort((a, b) => {
    const zoneA = a.field_zone;
    const zoneB = b.field_zone;
    if (zoneA < zoneB) {
      return -1;
    } else if (zoneA > zoneB) {
      return 1;
    }
    return 0;
  });

  return data;
};

const wagonWheel = (dataset, columnName) => {

  // Chart dimensions
  const width = 300;
  const height = 300;
  const margin = {
    top: 80,
    right: 20,
    left: 20,
  };
  const outerRadius = Math.min(width, height) / 2;
  // + 2 -> Used to prevent the edges of the central rectangle from touching
  // the inner radius
  const innerRadius = (outerRadius / (width / 75)) + 2;

  // Positioning and dimensional set up for the SVG
  const svg = d3select('.wagon-wheel__container')
    .append('svg')
    .attr('class', 'wagon-wheel__component')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top);

  const wagonWheelSvg = svg
    .append('g')
    .attr('class', 'wagon-wheel__graph')
    .attr('transform', `translate(${((width + (2 * margin.left)) / 2)}, ${((height + margin.top) / 2) + 20})`);

  // logo
  svg
    .append('svg:image')
    .attr('xlink:href', 'static/img/chart-logo.png')
    .attr('y', 275)
    .attr('x', 255)
    .attr('opacity', 0.5)
    .attr('height', 340 / 2)
    .attr('width', 156 / 2);

  const update = (data, column) => {
    const arc = d3arc()
      .innerRadius(0)
      .outerRadius(outerRadius);

    const pie = d3pie()
      .value(d => d.value)
      .sort(null);

    // Paths represent the slices
    const slices = wagonWheelSvg.selectAll('path')
      .data(pie(data));

    const text = wagonWheelSvg.selectAll('text')
      .data(pie(data));

    const t = d3transition()
      .duration(1000);

    slices
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('id', (d, i) => `zone_${i}`)
      .attr('class', 'wagon-wheel__section')
      .merge(slices)
      .transition(t)
      .attr('fill', d => `rgba(175, 11, 36, ${normalize(data, d.data[column], column)})`)
      .transition(t)
      .attr('fill', d => `rgba(175, 11, 36, ${normalize(data, d.data[column], column)})`);

    text
      .enter()
      .append('text')
      .attr('transform', (d) => {
        // set the label's origin to the center of the arc
        // we have to make sure to set these before calling arc.centroid
        const centroid = arc.centroid(d).map(value => value * 1.3);
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .attr('class', 'wagon-wheel__text wagon-wheel__annotation')
      .merge(text)
      .text(d => d.data[column] || 0); // get the label from our original data array

    slices.exit().remove();
    text.exit().remove();
  };

  update(dataset, columnName);
  const button = document.querySelector('input[type="button"]');
  button.addEventListener('click', () => update(dataset, randomArraySelection(Object.keys(dataset[0]))));

  const pitchDimensions = {
    width: margin.right + ((innerRadius) / 4),
    height: margin.top - (innerRadius / 4),
    x: ((margin.right + (innerRadius / 4)) / 2) * -1,
    y: ((margin.top - (innerRadius / 4)) / 5) * -1,
  };

  // Ellipse at the center of the wagon wheel
  wagonWheelSvg
    .append('ellipse')
    .attr('cx', 0)
    .attr('cy', 20)
    .attr('rx', 27)
    .attr('ry', 50)
    .attr('fill', 'white');

  // Pitch (in the middle of the wagon wheel)
  wagonWheelSvg
    .append('g')
    .attr('class', 'wagon-wheel__pitch')
    .append('rect')
    .attr('width', pitchDimensions.width)
    .attr('height', pitchDimensions.height)
    .attr('x', pitchDimensions.x)
    .attr('y', pitchDimensions.y)
    .attr('fill', 'rgba(43, 140, 17, 0.6)')
    .on('click', function () {
      this.closest('svg').remove();
    });

  const pitchLine = (x1, x2, y1, y2) =>
    wagonWheelSvg
      .append('line')
      .attr('x1', x1)
      .attr('x2', x2)
      .attr('y1', y1)
      .attr('y2', y2)
      .attr('stroke-width', 1.5)
      .attr('stroke', 'white');

  // Stumps crease
  pitchLine((pitchDimensions.width / 3.5) * -1, (pitchDimensions.width / 3.5), pitchDimensions.y + 6, pitchDimensions.y + 6);
  // Popping crease
  pitchLine((pitchDimensions.width / 2) * -1, (pitchDimensions.width / 2), pitchDimensions.y + 14, pitchDimensions.y + 14);
  // Right Vertical
  pitchLine((pitchDimensions.width / 3.5), (pitchDimensions.width / 3.5), pitchDimensions.y, pitchDimensions.y + 14);
  // Left Vertical
  pitchLine((pitchDimensions.width / 3.5) * -1, (pitchDimensions.width / 3.5) * -1, pitchDimensions.y, pitchDimensions.y + 14);

  const stumpsDot = cx =>
    wagonWheelSvg
      .append('circle')
      .attr('cx', cx)
      .attr('cy', pitchDimensions.y + 6)
      .attr('r', 0.5)
      .attr('fill', 'rgba(175, 11, 36, 1)');

  stumpsDot(-2);
  stumpsDot(0);
  stumpsDot(2);
};

export { generateData, wagonWheel };
