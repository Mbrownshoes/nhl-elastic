/**
 *
 * Created by shelbysturgis on 1/23/14.
 */

define(['https://cdnjs.cloudflare.com/ajax/libs/d3/4.8.0/d3.js', 'scripts/elasticsearch'], function (d3, elasticsearch) {

    "use strict";
    var client = new elasticsearch.Client({
        host: 'localhost:9200'});

    client.search({
        index: 'logstash-2017.04.22',
        size: 5,
        body: {
            // Begin query.
            query: {"match_all": {}},
            sort:
                { "points": "desc" }
                

            }
    }).then(function (resp) {
            console.log(resp);


    });

    });

