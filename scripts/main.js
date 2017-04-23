
var dataset;

define(['https://cdnjs.cloudflare.com/ajax/libs/d3/4.8.0/d3.js', 'scripts/elasticsearch'], function(d3, elasticsearch) {


    "use strict";
    var client = new elasticsearch.Client({
        host: 'localhost:9200'
    });



    client.search({
        index: 'logstash-2017.04.22',
        size: 900,
        body: {
            // Begin query.
            query: {
                "match_all": {}
            },
            sort: {
                "points": "desc"
            }

        }
    }).then(function(resp) {
        dataset = resp.hits.hits
        // console.log(resp);
        var stats = resp.hits.hits;
        // console.log(stats);

        chart(stats);
        // console.log(stats)
        graph(stats);


    });

    function chart(stats) {

        var smallDat = []
        $.each(stats, function(key, value) {
            // console.log(value._source)
            smallDat.push({
                Name: value._source['playerName'],
                Points: value._source['points'],
                Goals: value._source['goals'],
                Assists: value._source['assists'],
                Games: value._source['gamesPlayed'],
                Position: value._source['playerPositionCode'],
                // url1: value['URL1'],
                // url2: value['URL2']
            })
            //     if (value == 'name'){
            //     console.log(value['sector'])
            // }
        })
        $(function() {
            // console.log(smallDat)
            $('#orders-table').bootstrapTable({
                data: smallDat
            });
        });

    };
    // console.log(stats)

    function graph(stats) {
        // test=stats;
        var svg = d3.select("svg"),
            margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 90
            },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
        var tooltip = d3.select("body").append("div").attr("class", "toolTip");

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleBand().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // d3.json("data.json", function(error, data) {
        // if (error) throw error;
        // console.log(stats)
        var data = stats.slice(0, 10);
        data.sort(function(a, b) {
            return a._source['points'] - b._source['points'];
        });

        // console.log(d3.max(data, function(d) {
        //     // console.log(d._source['points'])

        //  return d._source['points']; }))
        x.domain([0, d3.max(data, function(d) {
            // console.log(d._source['points'])

            return d._source['points'];
        })]);

        y.domain(data.map(function(d) {
            return d._source['playerName'];
        })).padding(0.1);

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) {
                // console.log(parseInt(d / 1000)) 
                return d;
            }).tickSizeInner([-height]));

        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function(d) {
                return y(d._source['playerName']);
            })
            .attr("width", function(d) {
                return x(d._source['points']);
            })
        // .on("mousemove", function(d){
        //     tooltip
        //       .style("left", d3.event.pageX - 50 + "px")
        //       .style("top", d3.event.pageY - 70 + "px")
        //       .style("display", "inline-block")
        //       .html((d.area) + "<br>" + "£" + (d._source['points']));
        // })
        //     .on("mouseout", function(d){ tooltip.style("display", "none");});
        // });



    }


});