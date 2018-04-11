const $cities = d3.select('.cities');
const $demographics = $cities.select('.demographics');
const $ages= $cities.select('.age');

const $cities1 = d3.select('.cities1');
const $income = $cities1.select('.income');
const $rent = $cities1.select('.rent');

var tk = d3.format(".2s")

let ct_incomes = null;
let ct_areas = null;
let ct_ages = null;
let ct_rent = null;

let width = d3.select('.prose-text').node().offsetWidth
let width3 = width/3;
if (width < 450) { width3 = width - 20 }

let xScale = d3.scaleLinear()
	.domain([1990,2010])

let xAxis = d3.axisBottom(xScale).tickValues([2010, 2000, 1990]).tickFormat(d3.format("d"))
let xG

let cities = ["boston", "manhattan", "philadelphia"]
let abbrev = ["bos", "nyc", "phi"]
let names = ["Boston Chinatown", "Manhattan Chinatown", "Phildelphia Chinatown"]
let demo = ["api", "white", "latino", "black", "other"]
let demo4 = ["api", "white", "latino", "black"]
let year = [1990, 2000, 2010]
let ages = [17, 24, 64, 65]

let xIncome = d3.scaleLinear()
	.domain([0, 80000])

let incomeAxis = d3.axisBottom(xIncome).tickValues([0, 20000, 40000, 60000, 80000]).tickSize(-(width3 - 70)).tickFormat(d3.format(".1s"))
let incomeG

let xRent = d3.scaleLinear()
	.domain([0, 15000])

let rentAxis = d3.axisBottom(xRent).tickValues([0, 5000, 10000, 15000]).tickSize(-(width3 - 70)).tickFormat(d3.format(".2s"))
let rentG

let yScale = d3.scaleLinear()
	.domain([0,100])

let yIncome = d3.scaleBand()
		.domain(demo4)

let incomeY = d3.axisLeft(yIncome)
let incomeYG

let yYear = d3.scaleBand()
	.domain([1990, 2000, 2010])

let yearAxis = d3.axisLeft(yYear)
let yearG

function setupChart(){
	xScale.range([40, width3 - 40 ])
	yScale.range([width3 - 40, 30])
	xIncome.range([40, width3 - 40 ])
	yIncome.range([width3 - 40, 30])
	xRent.range([40, width3 - 40])
	yYear.range([width3 - 40, 30])

	//DEMOGRAPHICS
	for (var i = 0; i<3; i++){
		var city = cities[i]
		$demographics.append("div." + city)

		var temp = $demographics.select("." + city).append("svg")
			.at("class", "demo_" + city)
			.at("width", width3)
			.at("height", width3)

		temp.append("text")
			.at("class", "chart-label")
			.at("x", width3/2)
			.at("y", 10)
			.text(names[i])

		temp.append("text")
			.at("class", "chart-label")
			.at("x", width3/2)
			.at("y", width3 - 3)
			.text("Year")

		xG = temp.append("g")
			.at("class", "axis")
			.at("transform", "translate(0," + (width3 - 40) + ")")
			.call(xAxis)

		var g = temp.append("g")
			.at("class", "axis")

		for (var j = 0; j<5; j++){
			var area = d3.area()
			    .x(function(d, i) { return xScale(d.year); })
					.y0(function(d) {
						var bot = 0
						if (j > 0) {
							for (var k = 0; k<j; k++){
								bot += +d[abbrev[i] + "_" + demo[k]]
						}}
						return yScale(bot); })
					.y1(function(d) {
						var top = 100
						if (j == 0){
							top = +d[abbrev[i] + "_" + demo[j]]
						} else if (j > 4) {
							for (var k = 0; k <= j; k++){
								top += +d[abbrev[i] + "_" + demo[k]]
						}}
						return yScale(top); })

			g.append("path")
				.datum(ct_areas)
						.at("class", d => demo[j])
						.at("stroke-width", 1)
						.at("fill-opacity", .2)
						.at("d", area)

			g.append("text")
				.datum(ct_areas)
						.at("class", demo[j])
						.at("x", d => xScale(2020))
						.at("y", 0)
						.text(demo[j])
		}
	}// End DEMOGRAPHICS

	//ages
	for (var i = 0; i<3; i++){
		var city = cities[i]
		$ages.append("div." + city)

		var temp = $ages.select("." + city).append("svg")
			.at("class", "age_" + city)
			.at("width", width3)
			.at("height", width3)

		temp.append("text")
			.at("class", "chart-label")
			.at("x", width3/2)
			.at("y", 10)
			.text(names[i])

		temp.append("text")
			.at("class", "chart-label")
			.at("x", width3/2)
			.at("y", width3 -3)
			.text("Year")

		xG = temp.append("g")
			.at("class", "axis")
			.at("transform", "translate(0," + (width3 - 40) + ")")
			.call(xAxis)

		var g = temp.append("g")
			.at("class", "axis")

		for (var j = 0; j<5; j++){
			var area = d3.area()
			    .x(function(d, i) { return xScale(d.year); })
					.y0(function(d) {
						var bot = 0
						if (j > 0) {
							for (var k = 0; k<j; k++){
								bot += +d[abbrev[i] + "_" + ages[k]]
						}}
						return yScale(bot); })
					.y1(function(d) {
						var top = 100
						if (j == 0){
							top = +d[abbrev[i] + "_" + ages[j]]
						} else if (j > 4) {
							for (var k = 0; k <= j; k++){
								top += +d[abbrev[i] + "_" + ages[k]]
						}}
						return yScale(top); })


			g.append("path")
				.datum(ct_ages)
						.at("class", d => "age" + ages[j])
						.at("stroke-width", 0)
						.at("d", area)
		}
	}// End AGES

	//INCOME
	for (var i = 0; i<3; i++){
		var city = cities[i]
		$income.append("div." + city)

		var temp = $income.select("." + city).append("svg")
			.at("class", "income_" + city)
			.at("width", width3)
			.at("height", width3)

		temp.append("text")
			.at("class", "chart-label")
			.at("x", width3/2)
			.at("y", 10)
			.text(names[i])

		temp.append("text")
			.at("class", "chart-label")
			.at("x", width3/2)
			.at("y", width3 - 10)
			.text("Income")

		incomeG = temp.append("g")
			.at("class", "axis")
			.at("transform", "translate(0," + (width3 - 40) + ")")
			.call(incomeAxis)

		incomeYG = temp.append("g")
			.at("class", "axis")
			.at("transform", "translate(" + 40 + ",0)")
			.call(incomeY)

		temp.selectAll("line.income" + j)
			.data(ct_incomes)
			.enter()
				.append("line")
				.at("class", d => d.demo)
				.at("x1", d => xIncome(d.income))
				.at("x2", d => xIncome(d.context))
				.at("y1", d => yIncome(d.demo) + 20)
				.at("y2", d => yIncome(d.demo) + 20)
				.at("stroke-width", function(d){
					if (d.city == "boston" && (d.demo == "black" || d.demo == "latino")) { return 0 }
					else if (d.city == cities[i]) { return 1}
					else {return 0}
				})
				.at("stroke","black")
				.style("stroke-dasharray", "3,3")

		temp.selectAll("circle.income-" + j)
			.data(ct_incomes)
			.enter()
				.append("circle")
				.at("class", d => d.demo + " context")
				.at("cx", d => xIncome(d.context))
				.at("cy", d => yIncome(d.demo) + 20)
				.at("r", function(d){
					if (d.city == cities[i]) { return 5}
					else {return 0}
				})

		temp.selectAll("circle.income" + j)
			.data(ct_incomes)
			.enter()
				.append("circle")
				.at("class", d => d.demo + " chinatown")
				.at("cx", d => xIncome(d.income))
				.at("cy", d => yIncome(d.demo) + 20)
				.at("r", function(d){
					if (d.city == "boston" && (d.demo == "black" || d.demo == "latino")) { return 0 }
					else if (d.city == cities[i]) { return 5}
					else {return 0}
				})

		temp.selectAll("text.income" + j)
			.data(ct_incomes)
			.enter()
				.append("text")
				.at("class", "income fact_chinatown")
				.at("x", function(d) {
					if (+d.income < +d.context) { return xIncome(d.income) - 10 }
					else { return xIncome(d.income) + 10 }
				})
				.at("y", d => yIncome(d.demo) + 23)
				.style("text-anchor", function(d){
					if (+d.income< +d.context) { return "end"}
					else { return "start"}
				})
				.text(function(d){
					if (d.city == "boston" && (d.demo == "latino" || d.demo == "black")){
						return ""
					} else if (d.city == cities[i]) { return (tk(d.income))}
					else {return ""}
				})

		temp.selectAll("text.income-" + j)
			.data(ct_incomes)
			.enter()
				.append("text")
				.at("class", "income fact_context")
				.at("x", function(d) {
					if (+d.income < +d.context) { return xIncome(d.context) + 10 }
					else { return xIncome(d.context * 12) - 10 }
				})
				.at("y", d => yIncome(d.demo) + 23)
				.style("text-anchor", function(d){
					if (+d.income < +d.context) { return "start"}
					else { return "end"}
				})
				.text(function(d){
					if (d.city == cities[i]) { return (tk(d.context))}
					else {return ""}
				})

	} //end Income


		//RENT
		for (var i = 0; i<3; i++){
			var city = cities[i]
			$rent.append("div." + city)

			var temp = $rent.select("." + city).append("svg")
				.at("class", "rent_" + city)
				.at("width", width3)
				.at("height", width3)

			temp.append("text")
				.at("class", "chart-label")
				.at("x", width3/2)
				.at("y", 10)
				.text(names[i])

			temp.append("text")
				.at("class", "chart-label")
				.at("x", width3/2)
				.at("y", width3 - 10)
				.text("Rent ($ Per Year)")

			rentG = temp.append("g")
				.at("class", "axis")
				.at("transform", "translate(0," + (width3 - 40) + ")")
				.call(rentAxis)

			yearG = temp.append("g")
				.at("class", "axis")
				.at("transform", "translate(" + 40 + ",0)")
				.call(yearAxis)

			temp.selectAll("line.rent" + j)
				.data(ct_rent)
				.enter()
					.append("line")
					.at("class", d => d.demo)
					.at("x1", d => xRent(d.rent * 12))
					.at("x2", d => xRent(d.context * 12))
					.at("y1", d => yYear(d.year) + 25)
					.at("y2", d => yYear(d.year) + 25)
					.at("stroke-width",function(d){
						if (d.city == cities[i]) { return 1}
						else {return 0}
					})
					.at("stroke","black")
					.style("stroke-dasharray", "3,3")

			temp.selectAll("circle.rent-" + j)
				.data(ct_rent)
				.enter()
					.append("circle")
					.at("class", d => d.demo + " context")
					.at("cx", d => xRent(d.context * 12))
					.at("cy", d => yYear(d.year) + 25)
					.at("r", function(d){
						if (d.city == cities[i]) { return 5}
						else {return 0}
					})

			temp.selectAll("circle.rent" + j)
				.data(ct_rent)
				.enter()
					.append("circle")
					.at("class", d => d.demo + " chinatown")
					.at("cx", d => xRent(d.rent * 12))
					.at("cy", d => yYear(d.year) + 25)
					.at("r", function(d){
						if (d.city == cities[i]) { return 5}
						else {return 0}
					})

			temp.selectAll("text.rent" + j)
				.data(ct_rent)
				.enter()
					.append("text")
					.at("class", "rent fact_chinatown")
					.at("x", function(d) {
						if (+d.rent < +d.context) { return xRent(d.rent * 12) - 10 }
						else { return xRent(d.rent * 12) + 10 }
					})
					.at("y", d => yYear(d.year) + 28)
					.style("text-anchor", function(d){
						if (+d.rent < +d.context) { return "end"}
						else { return "start"}
					})
					.text(function(d){
						if (d.city == cities[i]) { return (tk(d.rent * 12))}
						else {return ""}
					})

			temp.selectAll("text.rent-" + j)
				.data(ct_rent)
				.enter()
					.append("text")
					.at("class", "rent fact_context")
					.at("x", function(d) {
						if (+d.rent < +d.context) { return xRent(d.context * 12) + 10 }
						else { return xRent(d.context * 12) - 10 }
					})
					.at("y", d => yYear(d.year) + 28)
					.style("text-anchor", function(d){
						if (+d.rent < +d.context) { return "start"}
						else { return "end"}
					})
					.text(function(d){
						if (d.city == cities[i]) { return (tk(d.context * 12))}
						else {return ""}
					})

		} //end RENT

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
	const files = ['chinatown_income', 'BNP_demographics', 'BNP_ages', 'BNP_rent'].map(d => `${path}/${d}.csv`);

	d3.loadData(...files, (err, response) => {
		ct_incomes = response[0];
		ct_areas = response[1];
		ct_ages = response[2];
		ct_rent = response[3];

		setupChart();
		resize();
	})

}

export default { init, resize };
