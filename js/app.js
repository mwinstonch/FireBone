// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'bbfire'
import CutiesView from './cutiesView'
import FavesView from './favesView'


function app() {
   // start app
   // new Router()
    var FavCutiesCollection = Backbone.Firebase.Collection.extend({
   		url: "https://congressionalcuties.firebaseio.com/favecuties"
    })

    var CutieModel = Backbone.Model.extend({
    	defaults:{
    		'fave': false
    	}
    })

    var CongressionalCollection = Backbone.Collection.extend ({
      url: 'http://congress.api.sunlightfoundation.com/legislators',
      apiKey:"325ade0da4514bb29ff036144a8bc016",

      parse: function (rawData){
        console.log(rawData)
        return rawData.results
      },

      model: CutieModel,

    })

    var CongressionalRouter = Backbone.Router.extend ({
        routes: {
            "favorites": "handleFaves",
            "*default": "handleCuties"
        },

        handleCuties: function() {
            var cc = new CongressionalCollection()
            var fc = new FavCutiesCollection()
            cc.fetch({
              data:{
                "apikey": cc.apiKey
              }
            }).then(function(){
              DOM.render(<CutiesView cutieType="all" faveColl={fc} congressColl={cc}/>, document.querySelector('.container'))
            })
        },

        handleFaves: function() {
            DOM.render(<CutiesView congressColl={new FavCutiesCollection} cutieType="fave" />, document.querySelector('.container'))
        },

        initialize: function() {
            Backbone.history.start() 
        }
    })

    var cr = new CongressionalRouter()
}

app()