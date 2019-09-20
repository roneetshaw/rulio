function validateDeals(deal, doj, r_id, srv_id) {
    var startDt = new Date(deal.start_date);
    var endDt = new Date(deal.end_date);
    var journeyDt = new Date(doj);
   
    if(!(startDt <= journeyDt && journeyDt <= endDt))
        return false;
    
    if(deal.route_ids.indexOf(r_id)== -1 || deal.service_codes.indexOf(srv_id)== -1)
        return false;
    
    return true;
}

function isEarlyBirdValid(doj,thr_days){
    var date1 = new Date(); 
    var date2 = new Date(doj); 
      
    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
      
    // To calculate the no. of days between two dates 
    var no_of_days = Difference_In_Time / (1000 * 3600 * 24);
    return true;
}

function getAllDealsPerOp(deal, fares, doj){
    var result=[];
    console.log("KKKKXK")
    console.log(deal.deal_type)
    fares.forEach(function(item){
        var fare = {};
        var d = {}
        var f = item.split(':')
        var seat_fare=0 
        if(f.length==2){
            seat_fare = parseInt(f[1])
            fare.base_fare=seat_fare;
        }
        var dis_val = parseInt(deal.discount_value);
        var max_dis = parseInt(deal.max_discount_value);
        if(deal.deal_type == 'EARLY_BIRD'){
            if(isEarlyBirdValid(doj,deal.early_bird_threshold_days)){
                if(deal.discount_type == 'FLAT'){
                    d.discount = dis_val;
                }
                else if(deal.discount_type == 'PERCENT'){
                    p_dis = dis_val*seat_fare*0.01;
                    d.discount = p_dis >  max_dis?max_dis:p_dis;
                }
                d.id=deal.deal_type+":"+result.length;
                d.display_text = deal.deal_type;
                d.code = deal.deal_type;
            }
        }
        else if(deal.deal_type == 'FLAT_DEAL'){          
            if(deal.discount_type == 'FLAT'){
                d.discount = dis_val;
            }
            else if(deal.discount_type == 'PERCENT'){               
                p_dis = dis_val*seat_fare*0.01;
                d.discount = p_dis >  max_dis?max_dis:p_dis;
            }
            d.id=deal.deal_type+":"+result.length;
            d.display_text = deal.deal_type;
            d.code = deal.deal_type;
        }
        

        fare.deal=d;
        result.push(fare);
    })
    return result;
}