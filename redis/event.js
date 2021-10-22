
module.exports.EventObj = class EventObj{
    constructor(id_package, items, size, price, adress, day, time, destination){
        
        this.id_package = id_package;
        this.items = items;
        this.size = size;
        this.price = price;
        this.adress = adress;
        this.day = day;
        this.time = time;
        this.destination = destination;
    }

    getpackageNumber(){
        return this.id_package;
    }
    getEventKind(){
        return this.items;
    }

    getSection(){
        return this.size;
    }

    getDirection(){
        return this.price;
    }

    getpackageKind(){
        return this.adress;
    }

    getDay(){
        return this.day;
    }

    getTime(){
        return this.time;
    }

    getIsSpecialDay(){
        return this.destination;
    }

    setEventKind(items){
        this.items = items;
    }

    setSection(size){
        this.size = size;
    }
    setTime(time){
        this.time = time;
    }

    toString(){
        return `{"id_package":"${this.id_package}","items":"${this.items}","size":"${this.size}","price":"${this.price}","adress":"${this.adress}","day":"${this.day}","time":"${this.time}","destination":"${this.destination}"}`;
    }
}