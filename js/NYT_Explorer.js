var url = "https://api.nytimes.com/svc/archive/v1/2002/1.json";
url += '?' + $.param({
  'api-key': "51e7864a4e7c4a2b990dd8e41f131457"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  // console.log(result);
  console.log(result.response.docs[0].web_url);
  // console.log(result.response.docs[1].web_url);
}).fail(function(err) {
  throw err;
});
