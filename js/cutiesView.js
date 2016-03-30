import React, {Component} from 'react'
import Header from './header'

var CutiesView = React.createClass ({
	render: function() {
		return (
			<div className="cutiesView">
				<Header />
				<p>Now Viewing All Cuties</p>
			</div>
			)
	}
})

export default CutiesView