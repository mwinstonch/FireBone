import React, {Component} from 'react'
import Header from './header'

var FavesView = React.createClass ({
	render: function() {
		return (
			<div className="favesView">
				<Header />
				<p>Now Viewing All Your Fave Cuties</p>
			</div>
			)
	}
})

export default FavesView