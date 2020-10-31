// Prerequisite modules
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')

var app = express()
var router = express.Router()
var session

var root = {root: path.join(__dirname, './views')}

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

/**
 * All Dependencies goes here
 *
 * @param
 * @returns
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(sessions({
  secret: '*&%^&Q^#$#*)(!*)Lkljlaksdf',
  resave: false,
  saveUnitialized: true
}))

/**
 * Public folder reference
 *
 * @param
 * @returns
 */
app.use('/styles', express.static(path.join(__dirname, '/public/css/')))

app.get('/', function(req, res){
  // Do Something...
  res.sendFile('index.html', root);
})

/**
 * All routing stuff goes here
 *
 * @param
 * @returns
 */
app.get('/scraphandphone', function (req, res) {

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
    
    for (var i = 1; i < test; i++) {
      // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-tubuh-2311?page='+i+'&sizes%5Bgeneral%5D=140020&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/makeup?page='+i+'&sizes%5Bgeneral%5D=262753&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-wajah?page='+i+'&sizes%5Bgeneral%5D=146272&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      request('https://www.bukalapak.com/c/handphone/hp-smartphone?page='+i+'&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10&view_mode=list', function (error, response, html) {
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
            // res.end(results);
            fs.writeFile('handphone.csv', arrays, function (err){
              // Do something ...
              if (err) throw err;
              res.end('Successfully scraped');
            })
            
          });
        }
      });
    }

  });
  
  scrapper.getReview = function (callback) {
    request('https://www.bukalapak.com/c/sepeda?from=category-popular-homepage-1', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var pageNum = $('span.last-page').text();
        return callback(pageNum);
      }
    });
  }

  /**
   * Passing the value into asyncronous function
   * 
   * @param {any} value
   * @returns
   */
  function store(value) {
    return value;
  }
})

app.get('/scrapparfum', function(req, res){
  // Do Something...
  
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
      // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
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
            // res.end(results);
            fs.writeFile('parfum.csv', arrays, function (err){
              // Do something ...
              if (err) throw err;
              res.end('Successfully scraped');
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
})

app.get('/scrapperawatantubuh', function(req, res){
  // Do Something...
  
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
      // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-tubuh-2311?page='+i+'&sizes%5Bgeneral%5D=140020&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
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
            // res.end(results);
            fs.writeFile('perawatantubuh.csv', arrays, function (err){
              // Do something ...
              if (err) throw err;
              res.end('Successfully scraped');
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
})

app.get('/scrappelangsing', function(req, res){
  // Do Something...
  
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
      // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
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
            // res.end(results);
            fs.writeFile('pelangsing.csv', arrays, function (err){
              // Do something ...
              if (err) throw err;
              res.end('Successfully scraped');
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
})

app.get('/scrapperawatanwajah', function(req, res){
  // Do Something...
  
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
      // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-tubuh-2311?page='+i+'&sizes%5Bgeneral%5D=140020&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/makeup?page='+i+'&sizes%5Bgeneral%5D=262753&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-wajah?page='+i+'&sizes%5Bgeneral%5D=146272&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
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
            // res.end(results);
            fs.writeFile('perawatanwajah.csv', arrays, function (err){
              // Do something ...
              if (err) throw err;
              res.end('Successfully scraped');
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
})

app.get('/scrapmakeup', function(req, res){
  // Do Something...
  
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
      // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-tubuh-2311?page='+i+'&sizes%5Bgeneral%5D=140020&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
      request('https://www.bukalapak.com/c/perawatan-kecantikan/makeup?page='+i+'&sizes%5Bgeneral%5D=262753&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
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
            // res.end(results);
            fs.writeFile('test.csv', arrays, function (err){
              // Do something ...
              if (err) throw err;
              res.end('Successfully scraped');
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
})

/**
 * Port listener
 *
 * @param
 * @returns
 */
app.listen(3001, function () {
  console.log('Listening on port 3000')
})



// /**
//  * Get Page Number and save the review into database
//  * 
//  * @param {any} callback
//  */
// scrapper.getReview = function (callback) {
//   request('https://www.bukalapak.com/c/handphone/hp-smartphone?page=1&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10', function (error, response, html) {
//     if (!error && response.statusCode == 200) {
//       var $ = cheerio.load(html);
//       var pageNum = $('span.last-page').text();
//       return callback(pageNum);
//     }
//   });
// }



// // Run getReview method
// scrapper.getReview(function (val) {
  
//   var test = parseInt(store(val));

//   console.log(test);
  
//   for (var i = 1; i < 11; i++) {
//     // request('https://www.bukalapak.com/c/handphone/virtual-reality?page='+i+'&sizes%5Bgeneral%5D=10438&sizes%5Bsem%5D=5', function (error, response, html) {
//     request('https://www.bukalapak.com/c/perawatan-kecantikan/pelangsing?page='+i+'&sizes%5Bgeneral%5D=12090&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
//     // request('https://www.bukalapak.com/c/perawatan-kecantikan/parfum?page='+i+'&sizes%5Bgeneral%5D=88437&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
//     // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-tubuh-2311?page='+i+'&sizes%5Bgeneral%5D=140020&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
//     // request('https://www.bukalapak.com/c/perawatan-kecantikan/makeup?page='+i+'&sizes%5Bgeneral%5D=262753&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
//     // request('https://www.bukalapak.com/c/perawatan-kecantikan/perawatan-wajah?page='+i+'&sizes%5Bgeneral%5D=146272&sizes%5Bsem%5D=5&view_mode=list', function (error, response, html) {
//     // request('https://www.bukalapak.com/c/handphone/hp-smartphone?page='+i+'&sizes%5Bgeneral%5D=126048&sizes%5Bsem%5D=10&view_mode=list', function (error, response, html) {
//       if (!error && response.statusCode == 200) {
//         var $ = cheerio.load(html);

//         $('div.product__rating').each(function (i, element){
//           // Do something ...
//           rating = $(this).children().children().text();
//         });
        
//         $('h5.user__name').each(function (i, element){
//           // Do something ...
//           pelapak = $(this).children().text().replace(',','');
//         });  

//         $('div.product-list-item').each(function(i, element){
//           pName = $(this).children().children().next().next().children().children().first();
//           productName = pName.text().replace(',','');
//           gambarProduk = $(this).children().children().children().children().attr('src');
//           mataUang = $(this).children().children().next().next().children().next().next().children().children().text().replace('?','');
//           link = 'https://www.bukalapak.com'+pName.attr('href');
//           var results = '\n' + productName + ',' + pelapak + ',' + rating + ',' + gambarProduk + ',' + mataUang + ',' + link;

//           console.log(results);
//           arrays.push(results);
          
//           fs.writeFile('vrreality.csv', arrays, function (err){
//             // Do something ...
//             if (err) throw err;
//             console.log('Successfully scraped!');
//           })
          
//         });
//       }
//     });
//   }

// });



// /**
//  * Passing the value into asyncronous function
//  * 
//  * @param {any} value
//  * @returns
//  */
// function store(value) {
//   return value;
// }
