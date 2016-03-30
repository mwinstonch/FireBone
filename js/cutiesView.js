import React, {Component} from 'react'
import Header from './header'


var CutiesView = React.createClass({

	componentDidMount: function() {
		var self = this 
		this.props.congressColl.on('sync', function() {self.forceUpdate()})
	},

    render: function () {
    	console.log(this.props.congressColl.models)
        return (
            <div className="cutiesView">
            <p>Now viewing {this.props.cutieType} cuties</p>
                <Header />
                <CutiesList faveColl={this.props.faveColl} cutiesColl={this.props.congressColl.models} /> 
            </div>
        )
    }
})

var CutiesList = React.createClass ({
	_update: function() {
		this.setState({
			cutiesColl: this.state.cutiesColl
		})
	},

	_makeCutieComponent: function (model, i) { 
		return <Cutie faveColl={this.props.faveColl} cutieData={model} key={i} update={this._update} />
	},

	getInitialState: function() {
		return {
			cutiesColl: this.props.cutiesColl
		}
	},

	render: function () {
		return(
			<div className='cutiesList'>
				{this.props.cutiesColl.map(this._makeCutieComponent)}
			</div>
		)	
	}
})

var Cutie = React.createClass ({

	_addToFave: function(event) {
		this.props.cutieData.set({fave: true})
		this.props.faveColl.add(this.props.cutieData.attributes)
		console.log('touched heart')
		this.props.update()
	},

	render: function(){

		var styleObject = {
			textDecoration: "none"
		}

		if(this.props.cutieData.get('fave')) {
			styleObject.backgroundColor= 'red'
			styleObject.color= 'white'
		}

		return (
			<div className='cutie'>
				<p> {this.props.cutieData.get('first_name')} 
					<button style={styleObject} onClick={this._addToFave}>{`\u2661`}</button>
				</p>
			</div>
		)
	}
})
export default CutiesView