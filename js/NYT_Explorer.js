// function search(event){
// 	event.preventDefault();
// 	let form=document.getElementById('msg').value;
// 	console.log(form)
// }
class Form extends React.Component{
	constructor(props){
		super(props)
		this.state={
			value: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	handleSubmit(event){
		console.log(this.state.value);
		event.preventDefault();
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					<input type="month" value={this.state.value} onChange={this.handleChange} />
					<button></button>
				</label>
			</form>
			);
	}
}
ReactDOM.render(
	<Form />, document.getElementById('root')
	);



class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list: []
		}
		this.setData=this.setData.bind(this)

	}

	setData(result){
		this.setState({list: result})
	}

	componentDidMount(){
		$.ajax({
		  url: "https://api.nytimes.com/svc/archive/v1/2002/1.json",
		  method: 'GET',
		  data:{
		  	'api-key':"51e7864a4e7c4a2b990dd8e41f131457"
		  },
		  success:this.setData
		  	// console.log(result)

		  	// var top20 = result.response.docs.slice(0,20);
		  	// for (var i = 0; i < 20; i++) {
		  	// var doc = top20[i];
		  	// console.log(doc.web_url);
		  
		  // console.log(result.response.docs[1].web_url);
		  })
	}

	render(){
		var top20 = this.state.list.response ? this.state.list.response.docs.slice(0,20):[];


		return(
			<div>
				{
					top20.map(
						(link, index)=>(
							<div key= {index}>
							<a href={link.web_url}>{link.headline.main}</a>
							</div>
						)
					)
				}
			</div>
			)
	}
}


ReactDOM.render(
	  <App />,
	  document.getElementById('root')
	);

