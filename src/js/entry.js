// D3 is included by globally by default
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import tourism from './graphic-tourism';
import interviews from './graphic-interviews';
import cities from './graphic-cities';
import businesses from './graphic-businesses';
import grid from './graphic-grid';

const bodySel = d3.select('body');
let previousWidth = 0;

function resize() {
	const width = bodySel.node().offsetWidth;
	if (previousWidth !== width) {
		previousWidth = width;
		tourism.resize();
		interviews.resize();
		cities.resize();
		businesses.resize();
		grid.resize();
	}
}

function init() {
	// add mobile class to body tag
	bodySel.classed('is-mobile', isMobile.any());
	// setup resize event
	window.addEventListener('resize', debounce(resize, 150));
	// kick off graphic code
	tourism.init();
	interviews.init();
	cities.init();
	businesses.init();
	grid.init();
}

init();
