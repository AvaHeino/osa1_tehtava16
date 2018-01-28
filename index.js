import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props){
		super(props)
		this.state={
			hyva: 0,
			neutraali: 0,
			huono: 0
		}
	}

	clikHyva = () => {
		this.setState({ hyva: this.state.hyva+1})
	}
	clickNeutraali = () => {
		this.setState({ neutraali: this.state.neutraali+1})
	}
	clickHuono = () => {
		this.setState({ huono: this.state.huono+1})
	}

	buttonClick = (arvo) => {
		let uusiArvo = this.state[arvo]+1
		if (arvo === 'hyva') {
			return () => {
				this.setState({hyva: uusiArvo})
				}
		}
		if (arvo === 'neutraali') {
			return () => {
				this.setState({neutraali: uusiArvo})
				}
		}
		return () => {
			this.setState( {huono: uusiArvo})
	    }
    }

	render(){
		
		let stats = [this.state.hyva,  this.state.neutraali, this.state.huono]
		
		return (
			<div>
				<h1>Anna Palautetta</h1>
				<Button handleClick={this.buttonClick('hyva')} text="Hyva" />
				<Button handleClick={this.clickNeutraali} text="Neutraali" />
				<Button handleClick={this.clickHuono} text="Huono" />
				<h2>Statistiikka</h2>
				<Statistics arvot={stats} />
			</div>
			)
	}

}

const Statistics = (props) => {
	const hyva = props.arvot[0]
	const neutraali = props.arvot[1]
	const huono = props.arvot[2]
	const keskiarvo = (hyva-huono)/(hyva+neutraali+huono)
	const positiivisia = hyva/(hyva+neutraali+huono)
	if (hyva+huono+neutraali === 0){
		return (
			<div>
				<p>Ei yhtaan palautetta annettu </p>
			</div>
			)
	}
	return(
		<table>
			<tbody>
				<Statistic nimi="Hyva" arvo={hyva} />
				<Statistic nimi="Neutraali" arvo={neutraali} />
				<Statistic nimi="Huono" arvo={huono} />
				<Statistic nimi="Keskiarvo" arvo={keskiarvo} />
				<Statistic nimi="Positiivisia" arvo={positiivisia} />
			</tbody>
		</table>
		)
	

}

const Statistic = (props) =>  {
	return(
		<tr>
			<td>{props.nimi} </td>
			<td> {props.arvo}</td>
		</tr>
		)
}

const Button = ({handleClick,text}) => (
	<button onClick = {handleClick}>
		{text}
	</button>

	)

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

