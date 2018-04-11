const $graphic = d3.select('.grid');
const $chart = $graphic.select('.grid_chart');
let chinatowns = null;
let width = $graphic.node().offsetWidth

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function setupGrid(){
	chinatowns.forEach(function(d){
		let bigClass = d.big_category.toLowerCase().replace(/\s/g, "-")
		let $item = $chart.append("div.town-item." + bigClass)
		$item.style.width = width/5 + "px";
		$item.style.height = width/5 + "px";
		$item.append("h3.city").text(d.city)
		$item.append("p.sub_category").text(d.sub_category)
		$item.append("p.status").text(d.status)
		$item.append("div.iconimg." + d.status)
		if (d.status == "present"){
			$item.append("p.start").text(d.start)
		} else {
			$item.append("p.start").text(d.start + " - " + d.end)
		}
		var comment = ""
		if (d.comments != "") { comment = "<br><br><b> More Information: </b><br>" + d.comments}
		$item.append("p.reason").html("<b>Reason for Establishment: </b> <br>" +  d.reason + comment)

		$item.on("mouseover", function() {
        div.style("opacity", 1);
				var comment = ""
				if (d.comments != "") { comment = "<br><br><b> More Information: </b><br>" + d.comments}
        div.html("<b>" + d.city + "<br><br>Reason for Establishment: </b> <br>" +  d.reason + comment)
            .style("left", (d3.event.pageX + 50) + "px")
            .style("top", (d3.event.pageY - 50) + "px");
        })
    .on("mouseout", function() {
        div.style("opacity", 0);
    });
	})

	var showDesc = true;
  d3.select("#descriptions").on("click", function(){
    if (showDesc){
			var item = document.getElementsByClassName(".town-item");
			d3.selectAll(".town-item").style("width", "220px")
			d3.selectAll(".town-item").style("height", "220px")

      d3.selectAll(".reason").style("display", "inline-block")
			d3.selectAll(".comments").style("display", "inline-block")
      showDesc = false
    } else {
			d3.selectAll(".town-item").style("width", "100px")
			d3.selectAll(".town-item").style("height", "100px")

			d3.selectAll(".reason").style("display", "none")
			d3.selectAll(".comments").style("display", "none")
			showDesc = true
    }
		setupIsotope()
  })
}
function setupIsotope(){
	// init Isotope
	var $grid = $('.grid_chart').isotope({
	  itemSelector: '.town-item',
	  layoutMode: 'fitRows',
	  getSortData: {
	    city: '.city',
	    sub_category: '.sub_category',
	    start: '.start parseInt',
			status: '.status'
	  }
	});

	// filter functions
	var filterFns = {
	  // show if number is greater than 50
	  numberGreaterThan50: function() {
	    var number = $(this).find('.number').text();
	    return parseInt( number, 10 ) > 50;
	  },
	  // show if name ends with -ium
	  ium: function() {
	    var name = $(this).find('.name').text();
	    return name.match( /ium$/ );
	  }
	};

	// bind filter button click
	$('#filters').on( 'click', 'button', function() {
	  var filterValue = $( this ).attr('data-filter');
	  // use filterFn if matches value
	  filterValue = filterValue;
	  $grid.isotope({ filter: filterValue });
	});

	// bind sort button click
	$('#sorts').on( 'click', 'button', function() {
	  var sortByValue = $(this).attr('data-sort-by');
	  $grid.isotope({ sortBy: sortByValue });
	});

	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
	  var $buttonGroup = $( buttonGroup );
	  $buttonGroup.on( 'click', 'button', function() {
	    $buttonGroup.find('.is-checked').removeClass('is-checked');
	    $( this ).addClass('is-checked');
	  });
	});
}

function updateGrid(){

}

function updateDimensions() {
	width = $graphic.node().offsetWidth
}

function resize() {
	updateDimensions();
	updateGrid()
}

function init() {
	const path = 'assets/data';
	const files = ['chinatowns_world'].map(d => `${path}/${d}.csv`);

	d3.loadData(...files, (err, response) => {
		chinatowns = response[0];
		chinatowns.sort(function(a,b){
			if (a.start < b.start)
			  return -1
				if (a.start > b.start)
			  return 1
			return 0
		})
		setupGrid();
		setupIsotope();
		resize();
	})

}

export default { init, resize };
