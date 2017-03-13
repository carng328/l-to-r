$(function updateClock() {

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


var elem = document.getElementById('time');
//           // Sets the elements inner HTML value to our clock data
elem.innerHTML = dateTime;
});

// HUFFINGTON POST
$(function getHuffPost() {
        var statement = "select * from feed where url='http://www.huffingtonpost.com/feeds/verticals/politics/index.xml'";
        $.queryYQL(statement, "json", undefined, function (data) {
          // do something with "data".
          console.log(data.query.results.item);
          
          //THIS IS THE LINE THAT GETS YOU THE FIRST OBJECT IN THE ARRAY
          console.log(data.query.results.item[0]);
          var firstObjectHuffPost = data.query.results.item[0];
          
          $("#col1").append("<h1 id='huffingtonpost'>" + firstObjectHuffPost.title + "</h1>");
          $("#col1").append("<h4 id='huffingtonpost'> Published by The Huffington Post <br/>"  + firstObjectHuffPost.pubDate + "</h4>"); 
          
          //Search for the top post referencing that headline on Reddit
          $(function getHuffPostReddit() {
          var newStatement = encodeURIComponent(firstObjectHuffPost.title).replace(/'/g , "%27");
          var statement = "select * from feed where url='https://www.reddit.com/search.xml?q=" + newStatement + "&sort=comments'";
          $.queryYQL(statement, "json", undefined, function (data) {

          console.log(statement);
          console.log(data);
            // Get first entry's (which is the entry with the most comments) rss feed containing comments
              var firstHuffPostEntry = data.query.results.entry[0];
              console.log("select * from feed where url='" + firstHuffPostEntry.link.href + ".rss");
                
                // Erase end of URL that's not needed
                var firstHuffPostEntryLink = firstHuffPostEntry.link.href;
                firstHuffPostEntryLink = firstHuffPostEntryLink.substring(0, firstHuffPostEntryLink.indexOf('?'));
                console.log(firstHuffPostEntryLink)
                     //Create a dynamic rss feed based on link to first entry; this is where the comments will come from.
                    $(function getHuffPostRedditComments() {
                    var statement = "select * from feed where url='" + firstHuffPostEntryLink + ".rss'" ;
                    $.queryYQL(statement, "json", undefined, function (data) {

                    console.log(data.query.results.entry);
                     //Start with the 4th comment; since the first 3 comments are auto moderator
                    for (var i = 2; i < data.query.results.entry.length; i++) {
                    console.log(data.query.results.entry[i].content.content);
                    $("#col1 #comment-box").append("<div id='comment'>" + data.query.results.entry[i].content.content + "</div>")
                    }           
 
          });   
        }); 
      });           
    }); 
  });                  
});  


// FOX NEWS
$(function getFoxNews() {
        var statement = "select * from feed where url='http://feeds.foxnews.com/foxnews/politics'";
        $.queryYQL(statement, "json", undefined, function (data) {
          // do something with "data".
          console.log(data.query.results.item);
          
          //THIS IS THE LINE THAT GETS YOU THE FIRST OBJECT IN THE ARRAY
          console.log(data.query.results.item[0]);
          var firstObjectFoxNews = data.query.results.item[0];
          
          $("#col2").append("<h1 id='fox'>" + firstObjectFoxNews.title + "</h1>");
          $("#col2").append("<h4 id='fox'> Published by CNN <br/>"  + firstObjectFoxNews.pubDate + "</h4>"); 
          
          //Search for the top post referencing that headline on Reddit
          $(function getFoxReddit() {
          var newStatement = encodeURIComponent(firstObjectFoxNews.title).replace(/'/g , "%27");
          var statement = "select * from feed where url='https://www.reddit.com/search.xml?q=" + newStatement + "&sort=comments'";
          $.queryYQL(statement, "json", undefined, function (data) {

          console.log(statement);
          console.log(data);
            // Get first entry's (which is the entry with the most comments) rss feed containing comments
              var firstFoxEntry = data.query.results.entry[0];
              console.log("select * from feed where url='" + firstFoxEntry.link.href + ".rss");
                
                // Erase end of URL that's not needed
                var firstFoxEntryLink = firstFoxEntry.link.href;
                firstFoxEntryLink = firstFoxEntryLink.substring(0, firstFoxEntryLink.indexOf('?'));
                console.log(firstFoxEntryLink)

                     //Create a dynamic rss feed based on link to first entry; this is where the comments will come from.
                    $(function getFoxRedditComments() {
                    var statement = "select * from feed where url='" + firstFoxEntryLink + ".rss'" ;
                    $.queryYQL(statement, "json", undefined, function (data) {

                    console.log(data.query.results.entry);
                     //Start with the 4th comment; since the first 3 comments are auto moderator
                    for (var i = 2; i < data.query.results.entry.length; i++) {
                    console.log(data.query.results.entry[i].content.content);
                    $("#col2 #comment-box").append("<div id='comment'>" + data.query.results.entry[i].content.content + "</div>")
                    }
             
          });   
        }); 
      });           
    }); 
  });                  
});              
        
//CNN
$(function getCNNNews() {
        var statement = "select * from feed where url='http://rss.cnn.com/rss/cnn_allpolitics.rss'";
        $.queryYQL(statement, "json", undefined, function (data) {
          // do something with "data".
          console.log(data.query.results.item);
          
          //THIS IS THE LINE THAT GETS YOU THE FIRST OBJECT IN THE ARRAY
          console.log(data.query.results.item[0]);
          var firstObjectCNN = data.query.results.item[0];
          
          $("#col3").append("<h1 id='cnn'>" + firstObjectCNN.title + "</h1>");
          $("#col3").append("<h4 id='cnn'> Published by Fox News <br/>"  + firstObjectCNN.pubDate + "</h4>"); 
          
          //Search for the top post referencing that headline on Reddit
          $(function getCNNReddit() {
          var newStatement = encodeURIComponent(firstObjectCNN.title).replace(/'/g , "%27");
          var statement = "select * from feed where url='https://www.reddit.com/search.xml?q=" + newStatement + "&sort=comments'";
          $.queryYQL(statement, "json", undefined, function (data) {

          console.log(statement);
          console.log(data);
            // Get first entry's (which is the entry with the most comments) rss feed containing comments
              var firstCNNEntry = data.query.results.entry[0];
              console.log("select * from feed where url='" + firstCNNEntry.link.href + ".rss");
                
                // Erase end of URL that's not needed
                var firstCNNEntryLink = firstCNNEntry.link.href;
                firstCNNEntryLink = firstCNNEntryLink.substring(0, firstCNNEntryLink.indexOf('?'));
                console.log(firstCNNEntryLink)

                     //Create a dynamic rss feed based on link to first entry; this is where the comments will come from.
                    $(function getCNNRedditComments() {
                    var statement = "select * from feed where url='" + firstCNNEntryLink + ".rss'" ;
                    $.queryYQL(statement, "json", undefined, function (data) {

                    console.log(data.query.results.entry);
                     //Start with the 4th comment; since the first 3 comments are auto moderator
                    for (var i = 2; i < data.query.results.entry.length; i++) {
                    console.log(data.query.results.entry[i].content.content);
                    $("#col3 #comment-box").append("<div id='comment'>" + data.query.results.entry[i].content.content + "</div>")
                    }
             
          });   
        }); 
      });           
    }); 
  });                  
});
//BREITBART
$(function getBreitbart() {
        var statement = "select * from feed where url='http://feeds.feedburner.com/breitbart?format=xml'";
        $.queryYQL(statement, "json", undefined, function (data) {
          // do something with "data".
          console.log(data.query.results.item);
          
          //THIS IS THE LINE THAT GETS YOU THE FIRST OBJECT IN THE ARRAY
          console.log(data.query.results.item[0]);
          var firstObjectBreitbart = data.query.results.item[0];
          
          $("#col4").append("<h1 id='breitbart'>" + firstObjectBreitbart.title + "</h1>");
          $("#col4").append("<h4 id='breitbart'> Published by Breitbart <br/>"  + firstObjectBreitbart.pubDate + "</h4>"); 
          
          //Search for the top post referencing that headline on Reddit
          $(function getBreitbartReddit() {
          var newStatement = encodeURIComponent(firstObjectBreitbart.title).replace(/'/g , "%27");
          var statement = "select * from feed where url='https://www.reddit.com/search.xml?q=" + newStatement + "&sort=comments'";
          $.queryYQL(statement, "json", undefined, function (data) {

          console.log(statement);
          console.log(data);
            // Get first entry's (which is the entry with the most comments) rss feed containing comments
              var firstBreitbartEntry = data.query.results.entry[0];
              console.log("select * from feed where url='" + firstBreitbartEntry.link.href + ".rss");
                
                // Erase end of URL that's not needed
                var firstBreitbartEntryLink = firstBreitbartEntry.link.href;
                firstBreitbartEntryLink = firstBreitbartEntryLink.substring(0, firstBreitbartEntryLink.indexOf('?'));
                console.log(firstBreitbartEntryLink)

                     //Create a dynamic rss feed based on link to first entry; this is where the comments will come from.
                    $(function getBreitbartRedditComments() {
                    var statement = "select * from feed where url='" + firstBreitbartEntryLink + ".rss'" ;
                    $.queryYQL(statement, "json", undefined, function (data) {

                    console.log(data.query.results.entry);
                     //Start with the 4th comment; since the first 3 comments are auto moderator
                    for (var i = 2; i < data.query.results.entry.length; i++) {
                    console.log(data.query.results.entry[i].content.content);
                    $("#col4 #comment-box").append("<div id='comment'>" + data.query.results.entry[i].content.content + "</div>")
                    }
             
          });   
        }); 
      });           
    }); 
  });                  
});  

// $(document ).ready(function() {
//     	ReloadData()
//     	setInterval(function(){ReloadData()}, 60000);
// 	});

// function ReloadData(){
// 		  $("body").load(function getNYT() {}); 
//      	console.log("Updated NYT");  

//      	$("body").load(function getNYT() {}); 
//      	console.log("Updated NYT ");

//      	$("body").load(function getCNN() {}); 
//      	console.log("Updated CNN");  

//      	$("body").load(function getCNN() {}); 
//      	console.log("Updated CNN ");

//      	$("body").load(function getFoxNews() {}); 
//      	console.log("Updated Fox");  

//      	$("body").load(function getFoxNews() {}); 
//      	console.log("Updated Fox ");

//      	$("body").load(function getNationalReview() {}); 
//      	console.log("Updated TNR");  

//      	$("body").load(function getNationalReview() {}); 
//      	console.log("Updated TNR"); 


// }


