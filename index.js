// Prerequisite modules
var request = require('request');
var cheerio = require('cheerio');
var mysql   = require('mysql');

// Scrapper Global Variable
var scrapper = {};
var productName;
var customerName;
var reviewDate;
var reviewTitle;
var reviewDetails;
var verifiedPurchase;
var reviewSentiment;
var reviewRatings;


// Mysql Configuration
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bukalapak'
});


/**
 * Get Page Number and save the review into database
 * 
 * @param {any} sentiment
 * @param {any} callback
 */
scrapper.getReview = function (sentiment,callback) {
  request('https://www.bukalapak.com/c/handphone/hp-smartphone?page=1&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var pageNum = $('span.last-page').text();
      return callback(pageNum);
    }
  });
}

// Run getReview method
scrapper.getReview(sen,function (val) {
  
  var test = parseInt(store(val));
//   replace(/,/g, ''));
  
  console.log(test);
  
  for (var i = 1; i < 3; i++) {
    request('https://www.bukalapak.com/c/handphone/hp-smartphone?page='+i+'&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        
        // Get Review Title
        $('a.product__name').each(function(i, element){

          productName = $(this).text();
        //   customerName = $(this).parent().next().children().children().next().next().text();
        //   reviewDate = $(this).parent().next().children().next().next().next().text().substr(3);
        //   reviewTitle = $(this).text();
        //   reviewDetails = $(this).parent().next().next().next().children().text();
        //   verifiedPurchase = $(this).parent().next().next().children().next().next().children().children().text();
        //   reviewSentiment = sen;
        //   reviewRatings = $(this).prev().prev().children().children().text().substr(0,1);

          // console.log(productName + ' - ' + customerName + ' - ' + reviewDate + ' - ' + reviewTitle + ' - ' + verifiedPurchase + ' - ' + reviewSentiment + ' - ' + reviewRatings);
          console.log(productName);
          // Query
        //   connection.query('INSERT INTO `review`(`review_id`, `product_name`, `customer_name`, `review_date`, `review_title`, `review_detail`, `verified_purchase`, `review_sentiment`, `review_ratings`)' + 
        //                    'VALUES (NULL,'+mysql.escape(productName)+','+mysql.escape(customerName)+','+mysql.escape(reviewDate)+','+mysql.escape(reviewTitle)+','+mysql.escape(reviewDetails)+','+mysql.escape(verifiedPurchase)+','+mysql.escape(reviewSentiment)+','+mysql.escape(reviewRatings)+')', function(err, result) {
        //     if (err) throw err;
        //     console.log(reviewTitle + ' has been inserted into database successfully.');
        //   });
          
        });
      }
    });
  }

});

/**
 * Passing the value into asyncronous function
 * 
 * @param {any} value
 * @returns
 */
function store(value) {
  return value;
}
