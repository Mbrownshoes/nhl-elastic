/**
 *
 * Created by shelbysturgis on 1/23/14.
 */
var dataset;

define(['https://cdnjs.cloudflare.com/ajax/libs/d3/4.8.0/d3.js', 'scripts/elasticsearch'], function (d3, elasticsearch) {


"use strict";
var client = new elasticsearch.Client({
    host: 'localhost:9200'});



client.search({
    index: 'logstash-2017.04.22',
    size: 900,
    body: {
        // Begin query.
        query: {"match_all": {}},
        sort:
            { "points": "desc" }
            
        }
}).then(function (resp) {
    dataset = resp.hits.hits
    // console.log(resp);
    var stats=resp.hits.hits;
    console.log(stats);


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
        


});

});

