var url = "https://api.nytimes.com/svc/archive/v1/2002/1.json";
url += '?' + $.param({
  'api-key': "51e7864a4e7c4a2b990dd8e41f131457"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  // console.log(result);
  var top20 = result.response.docs.slice(0,20);
  for (var i = 0; i < 20; i++) {
  	var doc = top20[i];
  	console.log(doc.web_url);
  }

	ReactDOM.render(
	  <h1>Hello, world!</h1>,
	  document.getElementById('root')
	);

  // console.log(result.response.docs[1].web_url);
}).fail(function(err) {
  throw err;
});
