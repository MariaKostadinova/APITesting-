import{test, expect} from "@playwright/test";


test("GET Booking by ID",async ({request})=>{

    const bookingID = 1 ; // paramatrarized booking ID


    //sending GET request
     const response =await request.get(`/booking/${bookingID}`);

     //parce the responce and prin
    const responseBody =  await response.json();  //exptraxt repsponse body 
    console.log(responseBody);

     //assesrtions
    expect(response.ok()).toBeTruthy();
    expect (response.status()).toBe(200);
    //expect (responseBody).toHaveProperty("bookingID")

   

})


test.only("GET Booking by  query param",async ({request})=>{

    const firstName = "Jim" ; // paramatrarized booking ID
    const lastName = "Brown"

    //sending GET request
     const response =await request.get("/booking",{params:{firstName, lastName}});

     //parce the responce and prin
    const responseBody =  await response.json();  //exptraxt repsponse body 
    console.log(responseBody);

     //assesrtions
    expect(response.ok()).toBeTruthy();
    expect (response.status()).toBe(200);
    //expect (responseBody).toHaveProperty("bookingID")

    //check responce sould not be empty
    expect(responseBody.length).toBeGreaterThan(0);

    for (const item of responseBody)
    {
        expect (item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }

})
