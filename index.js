// Prerequisite modules
var request = require('request');
var cheerio = require('cheerio');
var mysql   = require('mysql');
var fs = require('fs');

// Scrapper Global Variable
var scrapper = {};
var productName;
var gambarProduk;
var hargaAwal;
var hargaDiskon;
var sisaStok;
var detailBarang;
var peminat;
var dilihat;
var updateTerakhir;
var terjual;
var deskripsiBarang;
var catatanPelapak;
var rating;
var link;
var results;
var arrays = ['Nama Product, Pelapak, Rating, Gambar Produk, Harga Barang, Detail Barang\n'];

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
 * @param {any} callback
 */
scrapper.getReview = function (callback) {
  request('https://www.bukalapak.com/c/handphone/hp-smartphone?page=1&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var pageNum = $('span.last-page').text();
      return callback(pageNum);
    }
  });
}

// Run getReview method
scrapper.getReview(function (val) {
  
  var test = parseInt(store(val));

  console.log(test);
  
  for (var i = 1; i < 11; i++) {
    request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
    // request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
    // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-tubuh-2311?page='+i+'&sizes%5Bgeneral%5D=140020&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
    // request('https://www.bukalapak.com/c/perawatan-kecantikan/makeup?page='+i+'&sizes%5Bgeneral%5D=262753&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
    // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-wajah?page='+i+'&sizes%5Bgeneral%5D=146272&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
    // request('https://www.bukalapak.com/c/handphone/hp-smartphone?page='+i+'&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10&view_mode=list', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('div.product__rating').each(function (i, element){
          // Do something ...
          rating = $(this).children().children().text();
        });
        
        $('h5.user__name').each(function (i, element){
          // Do something ...
          pelapak = $(this).children().text().replace(',','');
        });  

        $('div.product-list-item').each(function(i, element){
          pName = $(this).children().children().next().next().children().children().first();
          productName = pName.text().replace(',','');
          gambarProduk = $(this).children().children().children().children().attr('src');
          mataUang = $(this).children().children().next().next().children().next().next().children().children().text().replace('?','');
          link = 'https://www.bukalapak.com'+pName.attr('href');
          var results = '\n' + productName + ',' + pelapak + ',' + rating + ',' + gambarProduk + ',' + mataUang + ',' + link;

          console.log(results);
          arrays.push(results);
          
          fs.writeFile('pelangsing.csv', arrays, function (err){
            // Do something ...
            if (err) throw err;
            console.log('Successfully scraped!');
          })
          
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
