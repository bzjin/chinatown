const $graphic = d3.select('.cities2');
const $cities = $graphic.select('.biz-div');

const $businesses = $cities.select('.businesses');
const $cuisines = $cities.select('.cuisines');

$businesses.append("h4").html("Businesses")
$businesses.append("p.key").html("<span class='darkred square bizkey'> &#x25FC;</span> Small businesses <br> <span class='lightred square bizkey'> &#x25FC;</span> Local chains <br><span class='darkyellow square bizkey'> &#x25FC;</span> National chains")

$cuisines.append("h4").html("Cuisines")
$cuisines.append("p.key").html("<span class='darkred square bizkey'> &#x25FC;</span> Chinese cuisine <br> <span class='lightred square bizkey'> &#x25FC;</span> Non-Chinese Asian cuisine <br><span class='darkyellow square bizkey'> &#x25FC;</span>Asian cuisine")

let ct_biz = null;

let width = d3.select('.prose-text').node().offsetWidth
let width2 = width/2;
let height = 250;
if (width < 450) { width2 = width }

let cities = ["boston", "manhattan", "philadelphia"]
let biz = ["small_biz", "local_chains", "national_chains"]
let cuiz = ["chinese", "asian", "nonasian"]

let xScale = d3.scaleBand()
	.domain(cities)

let xAxis = d3.axisBottom(xScale)
let xGbiz, xGcuiz

let yScale = d3.scaleLinear()
	.domain([0,100])

let yHeight = d3.scaleLinear()
	.domain([0,100])

let businesses = $businesses.append("svg")
	.at("width", width2)
	.at("height", height)

let cuisines = $cuisines.append("svg")
	.at("width", width2)
	.at("height", height)

function setupChart(){
	xScale.range([40, width2 - 40 ])
	yScale.range([height- 40, 20])
	yHeight.range([0, height- 60])

	xGbiz = businesses.append("g")
		.at("class", "axis")
		.at("transform", "translate(0," + (height - 40) + ")")
		.call(xAxis)

	xGcuiz = cuisines.append("g")
		.at("class", "axis")
		.at("transform", "translate(0," + (height - 40) + ")")
		.call(xAxis)

	for (let i = 0; i < 3; i++){
		var bizPerc = 0
		for (let j = 0; j < 3; j++){
			bizPerc += +ct_biz[i][biz[j]]
			businesses.append("rect")
				.at("class", biz[j])
				.at("width", 20)
				.at("height", yHeight(ct_biz[i][biz[j]]))
				.at("x", xScale(ct_biz[i].city) + 30)
				.at("y", yScale(bizPerc))
		}
	}

	for (let i = 0; i < 3; i++){
		var cuizPerc = 0
		for (let j = 0; j < 3; j++){
			cuizPerc += +ct_biz[i][cuiz[j] + "_cuisine"]
			cuisines.append("rect")
				.at("class", cuiz[j])
				.at("width", 20)
				.at("height", yHeight(ct_biz[i][cuiz[j] + "_cuisine"]))
				.at("x", xScale(ct_biz[i].city) + 30)
				.at("y", yScale(cuizPerc))
		}
	}


}

function updateCharts(){

}

function updateDimensions() {
	width = $cities.node().offsetWidth
}

function resize() {
	updateDimensions();
	updateCharts()
}

function init() {
	const path = 'assets/data';
	const files = ['chinatown_businesses'].map(d => `${path}/${d}.csv`);

	d3.loadData(...files, (err, response) => {
		ct_biz = response[0]

		setupChart();
		resize();
	})

}

export default { init, resize };
