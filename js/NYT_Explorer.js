class Top20 extends React.Component{
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
	  <Top20 />,
	  document.getElementById('root')
	);

