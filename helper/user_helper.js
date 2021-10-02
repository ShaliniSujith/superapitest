require('dotenv').config();
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v1/");
const faker = require("faker");

const TOKEN = process.env.USER_TOKEN;

export const createRandomUser = async()=>{
    const userdata = {
        email: faker.internet.email('','','test.com'),
        name : faker.name.firstName(),
        gender: "male",
        status: "inactive"
    };

    console.log("userdata", userdata);

   const res =  await request
            .post('users')
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(userdata)
    return res.body.data.id;          
}