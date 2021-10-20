module.exports.sim = (publish) => {
    var id = 0;
    const package_arr = ["paris", "new york", "barcelona","rome","berlin","luxembourg","bruxelles","amsterdam","rabat"];
    const dest_arr = ["17, yaffo, tel aviv","5, rotchild, jerusalem","2 ben gurion, ramat gan","7 hagolan, haifa","8 haavoda, givat shmuel","2 hamelonot, eilat","3, nahman, ariel","6 mamilla jerusalem"]
    const items_arr = ["computer + pen", "iphone + headphone", "dictionary + books", "watch + jewel", "lighting+ mirror", "dresses + tshirts","shoes + boots", "makeup + babyliss"];
    const size_arr = ["big","normal","small"]
    
    setInterval(function () {
        var totel_price = Math.floor(Math.random() * 600) + 1;
        //var temp_sec_enter = Math.floor(Math.random() * 5) + 1;
        //var temp_sec_exit = Math.floor(Math.random() * 5) + 1;
        
        var temp_sec_arrive = Math.floor(Math.random() * 50000) + 1;//how much time till it arrive
        var temp_package = package_arr[Math.floor(Math.random() * 9)];// from where
        var dest_arr = package_arr[Math.floor(Math.random() * 8)];// destination in israel
        var temp_size = size_arr[Math.floor(Math.random() * 3)];// size of package
        var temp_special = Math.floor(Math.random() * 2);
        var temp_hour = Math.floor(Math.random() * 25).toString() + ":" + Math.floor(Math.random() * 6).toString() + Math.floor(Math.random() * 10).toString();
        var getHour = temp_hour.substr(0, temp_hour.indexOf(':'));//time of the order
        if (temp_special == 0) {
            temp_special = "no"
        }
        else {
            temp_special = "yes"
        }
        console.log(id)
        var myRandom = Math.random()
   
        var time = setTimeout(() => {
            window.alert('Done waiting');
          }, temp_sec_arrive);
        var e = {};
        e.enter_section = temp_sec_enter;
        e.package_type = temp_package;
        e.day = temp_day;
        e.hour = temp_hour;
        e.is_special = temp_special;
        e.time=temp_hour;
        e.id=id++;
        publish(e);
    }, 1000);
}