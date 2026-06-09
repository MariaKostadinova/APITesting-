/*
- create booking
-create a token
- update booking 
- delete
*/

import{test, expect} from "@playwright/test";
import fs from "fs"



 //returns JSON Data
      function readJSON(filePath:string){
      return  JSON.parse(fs.readFileSync(filePath,"utf-8"));
      }


     test("Update Booking ",async ({request})=>{

    // create booking  

    const requestBody = readJSON('testdata/post_body.json');
    const createResponce =  await request.post("/booking",{data:requestBody});
    console.log (createResponce);
    expect (createResponce.ok()).toBeTruthy();
    
    
    const responseBody =  await createResponce.json();  //exptract repsponse body 
    const bookingid= responseBody.bookingid;
    console.log(responseBody);
    console.log(bookingid);

    // Create token
    const tokenrequest = readJSON('testdata/token.json');
    const tokenResponce =  await  request.post("/auth",{data:tokenrequest});
    expect (tokenResponce.ok()).toBeTruthy();

    const tokenResponceBody = await tokenResponce.json();
    const token = tokenResponceBody.token;

    console.log(token);


    //update booking
     const updateRequestBody = readJSON('testdata/put_request.json');
    const updateResponce =await request.put(`/booking/${bookingid}`,
                                                 {
                                                    headers:{"Cookie":`token=${token}`},
                                                    data:updateRequestBody
                                                 });

    
    expect (updateResponce.ok()).toBeTruthy();
    expect (updateResponce.status()).toBe(200);

    const updateResponceJson = await updateResponce.json();
    console.log(updateResponceJson);
    
   // console.log("New Booking Details : ", updateResponce);


    //delete booking
    const deleteresponse = await request.delete(`/booking/${bookingid}`,
                                                 {
                                                    headers:{"Cookie":`token=${token}`},

                                                 });

   // expect (deleteresponse.statusText).toBe("Created");
    expect(deleteresponse.status()).toBe(201);
    
    console.log("Booking is deleted");




})