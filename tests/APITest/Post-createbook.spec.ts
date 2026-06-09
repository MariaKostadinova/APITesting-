import{test, expect} from "@playwright/test";


test("Create Booking with POST using JSON file",async ({request})=>{


   //request body
    const requestBody= {
       "firstname" : "Jim",
       "lastname" : "Brown",
       "totalprice" : 100,
       "depositpaid" : true,
       "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "super bowls"
    }

    //send post request 

    const response =  await  request.post("/booking", {data:requestBody});
    const responseBody =  await response.json();  //exptraxt repsponse body 
    console.log(responseBody);


    //validate status 
    expect(response.ok()).toBeTruthy();
    expect (response.status()).toBe(200);
    expect (responseBody).toHaveProperty("bookingid")


    //validate booking details
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
       "firstname" : "Jim",
       "lastname" : "Brown",
       "totalprice" : 100,
       "depositpaid" : true,
    "additionalneeds" : "super bowls"
    });

    const bookingdates = booking.bookingdates;
    expect(bookingdates).toMatchObject( {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    })


})