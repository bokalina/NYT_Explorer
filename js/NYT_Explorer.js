function search(event){
	event.preventDefault();
	// let form=document.getElementById('msg').value;
	// console.log(form)

	// console.log(window.app);
	app.componentDidMount();
}
// class Form extends React.Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			value: ''
// 		}
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	handleChange(event){
// 		this.setState({value: event.target.value});
// 	}

// 	handleSubmit(event){
// 		console.log(this.state.value);
// 		event.preventDefault();
// 	}

// 	render(){
// 		return(
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					<input type="month" value={this.state.value} onChange={this.handleChange} />
// 					<button></button>
// 				</label>
// 			</form>
// 			);
// 	}
// }
// ReactDOM.render(
// 	<Form />, document.getElementById('root')
// 	);



class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list: [],
			selectedArticle: null
		}
		this.setData=this.setData.bind(this)
		this.handleArticleClick=this.handleArticleClick.bind(this)

	}

	handleArticleClick(item){
                console.log("HandleArticleClick!");
                // console.log(JSON.stringify(item));
                console.log(JSON.stringify(item,null,2));
                this.setState({selectedArticle: item})
            }

	setData(result){
		this.setState({list: result})
		console.log(result)
		// console.log(result.response.docs[1].word_count)
	}

	componentDidMount(){

	// console.log("App:componentDidMount")
	// let date=Number(document.getElementById('date').value);
	// let month=Number(document.getElementById('month').value);
	// let year=document.getElementById('year').value;

	let form =document.getElementById('msg').value;
	var newform = form.split("-");
	var year=newform[0];
	var month=Number(newform[1]);
	// console.log("Selected y-m-d: " + year + month + date)
	console.log("Selected y-m:" + form)

		$.ajax({
		  url: "https://api.nytimes.com/svc/archive/v1/" +year+"/"+month+".json",
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
			<div className="row">
			<div className="column" id="articles">
				{
					top20.map(
						(link, index)=>(

							<ArticlePreview  key= {index}  web_url={link.web_url} item={link} clickHandler={this.handleArticleClick}/>

				
							// <div key= {index}>
							// <a href={link.web_url}>{link.headline.main}</a>
							// </div>
						)
					)
				}
			</div>
			<div className="column1" id="details">
                <ArticleDetails
                    article={this.state.selectedArticle}/>
            </div>
            </div>
			)
	}
}

class ArticlePreview extends React.Component{

	constructor(props){
		super(props)

		this.state={
			linkPreview: {}
		}

		this.setData=this.setData.bind(this)
	}


	setData(result){
		console.log(result);

		this.setState({linkPreview: result})

	}

	componentDidMount(){
		console.log("App:componentDidMount")
		$.ajax({
			// url: 'https://api.linkpreview.net/?key=5a8c62dd15c2c14a495f407b8ad447785894dd86df624&q=' + this.props.web_url,
			url: 'https://api.linkpreview.net/?key=123456&q=https://www.google.com',
			success: this.setData
			// 	function(answer) {
			// 	console.log(answer);
			// }
		})

	}

	render(){

		const link= this.state.linkPreview;
		const article = this.props.item;
		const clickHandler = this.props.clickHandler;
		
		// const link = {
  //  				"title":"Google",
  //  				"description":"Search webpages, images, videos and more.",
  //  				"image":"https:\/\/www.google.com\/images\/logo.png",
  //  				"url":"https:\/\/www.google.com"
		// };
		return(
			<div className="container">
			<div className ="card" onClick={() => clickHandler(article)}>
				<img className="picture" src={link.image}/>
				<h3 className="articleTitle">{link.title}</h3>
				<p className="artDescription">{link.description}</p>
			</div>

			</div>
		);
	}
}

function ArticleDetails(props) {
    const article = props.article;
    // debugger;
    if(article){
    	return (
        <div className="details">
        	
            <ul>
                <li>Title: {article.hasOwnProperty('headline') ? article.headline.main : ''}</li>
                <li>Website: {article.web_url}</li>
                <li>Number of words: {article.word_count}</li>
                <li>Type: {article.document_type}</li>
                <li>Published: {article.pub_date}</li>
                <li>Section: {article.section_name}</li>
                <li>Author: {article.byline.original}</li>
            </ul>
        </div>

    );
    } else {
    	return <p>:)</p>
    }

    
}


var app = ReactDOM.render(
	  <App />,
	  document.getElementById('root')
	);

