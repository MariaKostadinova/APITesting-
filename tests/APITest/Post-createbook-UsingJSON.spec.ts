import{test, expect} from "@playwright/test";
import fs from 'fs';

test("Create Booking with POST using JSON file",async ({request})=>{


    //read data from JSON file
    const jsonFile = "testdata/post_body.json";
    const requestBody=JSON.parse(fs.readFileSync(jsonFile,"utf-8"));

     //send post request 

    const response =  await  request.post("/booking", {data:requestBody});
    const responseBody =  await response.json();  //exptraxt repsponse body 
    console.log(responseBody);

    //request body
     /*const requestBody= {
       
    }
    */
    //validate status 
    expect(response.ok()).toBeTruthy();
    expect (response.status()).toBe(200);
    expect (responseBody).toHaveProperty("bookingid")


    //validate booking details
     
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    //validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
            checkin: requestBody.bookingdates.checkin,
            checkout: requestBody.bookingdates.checkout,
        });



})