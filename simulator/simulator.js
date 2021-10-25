const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const e = require("express");
const {redis} = require("./redis")
const c = require("config");

let items_data = fs.readFileSync('./redis/package_details.json');
let items = JSON.parse(items_data);

module.exports.sim = (publish) => {
    const from_arr = ["paris", "new york", "barcelona","rome","berlin","luxembourg","bruxelles","amsterdam","rabat"];
    const dest_arr = ["17, yaffo, tel aviv","5, rotchild, jerusalem","2 ben gurion, ramat gan","7 hagolan, haifa","8 haavoda, givat shmuel","2 hamelonot, eilat","3, nahman, ariel","6 mamilla jerusalem"]    
    const uoid =0;
    
    setInterval(function () {
        var total_price;//total price in accordance to the items
        var NumOfItems = Math.floor(Math.random() * 19) + 1;
        var temp_sec_arrive = Math.floor(Math.random() * 50000) + 1;//how much time till it arrive
        var from_package = from_arr[Math.floor(Math.random() * 9)];// from where
        var dest = dest_arr[Math.floor(Math.random() * 8)];// destination in israel
        var temp_size;// size of package
        var temp_hour = Math.floor(Math.random() * 25).toString() + ":" + Math.floor(Math.random() * 6).toString() + Math.floor(Math.random() * 10).toString();
        var getHour = temp_hour.substr(0, temp_hour.indexOf(':'));//time of the order
        if (NumOfItems <= 6) {
            temp_size = "small";
        }
        else if (NumOfItems<=12){
            temp_size = "medium";
        }
        else {
            temp_size = "big"
        }
        var item_list = [];
        for (let i = 0; i < NumOfItems; i++) {
            var itemIndex = Math.floor(Math.random() * 19);
            item_list.push(items[itemIndex]);
            total_price = total_price + items[itemIndex].price;
          }
        var created_package = {}
        created_package.id = uuidv4(); 
        created_package.item_list = item_list;
        created_package.price = total_price;
        created_package.size = temp_size;
        created_package.from = from_package;
        created_package.dest= dest;
        created_package.hour = temp_hour;
        created_package.time=temp_hour;
        
        redis.xadd("sendPackages", "*", "package", JSON.stringify(created_package));
    }, 1000);
}
//module.exports = {created_package};