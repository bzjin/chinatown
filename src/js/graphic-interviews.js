const $graphic = d3.select('.resident-interviews');
const $interviews = $graphic.select('.interviews');

let ct_interviews = null;

let width = d3.select('.prose-text').node().offsetWidth
let width3 = width/3;
if (width < 450) { width3 = width }

function setupChart(){
	for (let i = 0; i < ct_interviews.length; i++){
		let $note = $interviews.append("div.note")
		$note.append("p").html('"' + ct_interviews[i].statement + '"<br>&mdash; <b>' + ct_interviews[i].name + ",</b> <em>" + ct_interviews[i].title + " </em>")
	}
}

function updateCharts(){

}

function updateDimensions() {
	width = $interviews.node().offsetWidth
}

function resize() {
	updateDimensions();
	updateCharts()
}

function init() {
	const path = 'assets/data';
	const files = ['resident_interviews'].map(d => `${path}/${d}.csv`);

	d3.loadData(...files, (err, response) => {
		ct_interviews = response[0];

		setupChart();
		resize();
	})

}

export default { init, resize };
