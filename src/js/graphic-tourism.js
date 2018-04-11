const $seattle = d3.select('.seattle-reasons-descriptions');
const $reasons = $seattle.select('.reasons');
const $mentions = $seattle.select('.mentions');
const $descriptions = $seattle.select('.descriptions');
const $improvements = $seattle.select('.improvements');

const $singapore = d3.select('.singapore-statements');
const $statements = $singapore.select('.statements');

const $residents = d3.select('.resident-interviews');
const $interviews = $residents.select('.interviews');

let seattle_reasons = null;
let seattle_mentions = null;
let seattle_descriptions = null;
let salinas_improvements = null;
let singapore_survey = null;

let width = $seattle.node().offsetWidth
let width3 = width/2;
if (width < 600) { width3 = width }
let padding = 10
let height = 270

let reasonViz = $reasons.append("svg")
	.at("width", width3)
	.at("height", height)

let mentionViz = $mentions.append("svg")
	.at("width", width3)
	.at("height", height)

let descriptionViz = $descriptions.append("svg")
	.at("width", width3)
	.at("height", height/2)

let improvementViz = $improvements.append("svg")
	.at("width", width3)
	.at("height", height/2)

let xScale = d3.scaleLinear()
	.domain([0, 100])

let xWidth = d3.scaleLinear()
	.domain([0, 100])

let x0 = 100

let yScale1 = d3.scaleBand()
let yScale2 = d3.scaleBand()
let yScale3 = d3.scaleBand()
let yScale4 = d3.scaleBand()

let yAxis1, yAxis2, yAxis3, yAxis4
let yG1, yG2, yG3, yG4

function setupChart(){
	reasonViz.append("text")
		.at("class", "chart-title")
		.at("x", width3/2)
		.at("y", 10)
		.text("Reasons for Visit")

	mentionViz.append("text")
		.at("class", "chart-title")
		.at("x", width3/2)
		.at("y", 10)
		.text("Visited Locations Mentioned")

	descriptionViz.append("text")
		.at("class", "chart-title")
		.at("x", width3/2)
		.at("y", 10)
		.text("Descriptions of Visit")

	improvementViz.append("text")
		.at("class", "chart-title")
		.at("x", width3/2)
		.at("y", 10)
		.text("Mentions of Improvements")

	xScale.range([x0 + 50, width3 - padding])
	xWidth.range([0, width3 - x0 - 50 - padding])

	if (width < 768) { width3 = width }
	let all_reasons = seattle_reasons.map(a => a.reason)
	let all_mentions = seattle_mentions.map(a => a.mention)
	let all_descriptions = seattle_descriptions.map(a => a.description)
	let all_improvements = salinas_improvements.map(a => a.improvement)

	let sg_statements = []
	let sg_questions = []
	for (let i = 0; i < singapore_survey.length; i++){
		if (singapore_survey[i].type == "statement") { sg_statements.push(singapore_survey[i])}
		else { sg_questions.push(singapore_survey[i])}
	}

	let color = d3.scaleQuantize()
		.domain([4,5])
		.range(["#fee08b","#ffffbf","#d9ef8b","#a6d96a"])

	yScale1.domain(all_reasons)
		.range([30, 30 + all_reasons.length * 14])

	yScale2.domain(all_mentions)
		.range([30, 30 + all_mentions.length * 14])

	yScale3.domain(all_descriptions)
		.range([30, 30 + all_descriptions.length * 14])

	yScale4.domain(all_improvements)
		.range([30, 30 + all_improvements.length * 14])

	yAxis1 = d3.axisLeft(yScale1).tickSizeInner(0).tickSizeOuter(0)
	yG1 = reasonViz.append("g")
		.at("transform", "translate(" + (x0 + 45) + ",0)")
		.call(yAxis1)

	yAxis2 = d3.axisLeft(yScale2).tickSizeInner(0).tickSizeOuter(0)
	yG2 = mentionViz.append("g")
	.at("transform", "translate(" + (x0 + 45) + ",0)")
		.call(yAxis2)

	yAxis3 = d3.axisLeft(yScale3).tickSizeInner(0).tickSizeOuter(0)
	yG3 = descriptionViz.append("g")
	.at("transform", "translate(" + (x0 + 45) + ",0)")
		.call(yAxis3)

	yAxis4 = d3.axisLeft(yScale4).tickSizeInner(0).tickSizeOuter(0)
	yG4 = improvementViz.append("g")
	.at("transform", "translate(" + (x0 + 45) + ",0)")
		.call(yAxis4)

	reasonViz.selectAll("rect.reason_data")
		.data(seattle_reasons)
		.enter()
		.append("rect")
			.at("class", d => "reason_data " + d.association)
			.at("height", 12)
			.at("y", d => yScale1(d.reason))
			.at("width", d => xWidth(d.percent))
			.at("x", d => xScale(0))

	reasonViz.selectAll("text.reason_data")
		.data(seattle_reasons)
		.enter()
		.append("text")
			.at("class", d => "percent-label")
			.at("y", d => yScale1(d.reason) + 9.5)
			.at("x", d => xScale(d.percent) + 5)
			.text(d => d.percent + "%")

	mentionViz.selectAll(".mention_data")
		.data(seattle_mentions)
		.enter()
		.append("rect")
			.at("class", d => "mention_data " + d.association)
			.at("height", 12)
			.at("y", d => yScale2(d.mention))
			.at("width", d => xWidth(d.percent))
			.at("x", d => xScale(0))

	mentionViz.selectAll("text.mention_data")
		.data(seattle_mentions)
		.enter()
		.append("text")
			.at("class", d => "percent-label")
			.at("y", d => yScale2(d.mention) + 9.5)
			.at("x", d => xScale(d.percent) + 5)
			.text(d => d.percent + "%")

	descriptionViz.selectAll(".description_data")
		.data(seattle_descriptions)
		.enter()
		.append("rect")
			.at("class", d => "description_data " + d.association)
			.at("height", 12)
			.at("y", d => yScale3(d.description))
			.at("width", d => xWidth(d.percent))
			.at("x", d => xScale(0))

	descriptionViz.selectAll("text.description_data")
	.data(seattle_descriptions)
		.enter()
		.append("text")
			.at("class", d => "percent-label")
			.at("y", d => yScale3(d.description) + 9.5)
			.at("x", d => xScale(d.percent) + 5)
			.text(d => d.percent + "%")

	improvementViz.selectAll(".improvement_data")
		.data(salinas_improvements)
		.enter()
		.append("rect")
			.at("class", d => "improvement_data " + d.association)
			.at("height", 12)
			.at("y", d => yScale4(d.improvement))
			.at("width", d => xWidth(d.percent))
			.at("x", d => xScale(0))

	improvementViz.selectAll("text.improvement_data")
	.data(salinas_improvements)
		.enter()
		.append("text")
			.at("class", d => "percent-label")
			.at("y", d => yScale4(d.improvement) + 9.5)
			.at("x", d => xScale(d.percent) + 5)
			.text(d => d.percent + "%")

}

function updateCharts(){
	let width3 = width/2;
	if (width < 600) { width3 = width }

	xScale.range([x0 + 50, width3 - padding])
	xWidth.range([0, width3 - x0 - 50 - padding])

	reasonViz.selectAll(".reason_data")
	.at("width", d => xWidth(d.percent))

	mentionViz.selectAll(".mention_data")
	.at("width", d => xWidth(d.percent))

	descriptionViz.selectAll(".description_data")
	.at("width", d => xWidth(d.percent))

	descriptionViz.selectAll(".improvement_data")
	.at("width", d => xWidth(d.percent))
}

function updateDimensions() {
	width = $seattle.node().offsetWidth
}

function resize() {
	updateDimensions();
	updateCharts()
}

function init() {
	const path = 'assets/data';
	const files = ['seattle_reasons', 'seattle_mentions', 'seattle_descriptions', 'salinas_improvements', 'singapore_survey'].map(d => `${path}/${d}.csv`);

	d3.loadData(...files, (err, response) => {
		seattle_reasons = response[0];
		seattle_mentions = response[1];
		seattle_descriptions = response[2];
		salinas_improvements = response[3];
		singapore_survey = response[4];

		setupChart();
		resize();
	})

}


function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
        	words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

export default { init, resize };
