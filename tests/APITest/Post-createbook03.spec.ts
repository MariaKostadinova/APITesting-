import{test, expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import { DateTime } from "luxon";


test("Create Booking with random generated data",async ({request})=>{

 

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int( {min:100, max: 5000});
    const depositpaid = faker.datatype.boolean();
    const checkin = DateTime.now().toFormat("yyyy-MM-dd");
    const checkout = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd");

    const additionalneeds= "super bowls";
   
     //send post reques

    //request body
    const requestBody= {
       "firstname" : firstName,
       "lastname" : lastName,
       "totalprice" : totalPrice,
       "depositpaid" : depositpaid,
       "bookingdates" : {
        "checkin" : checkin,
        "checkout" : checkout
    },
    "additionalneeds" : additionalneeds
    }

    const response =  await  request.post("/booking", {data:requestBody});
    const responseBody =  await response.json();  //exptraxt repsponse body 
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