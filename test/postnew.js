require('dotenv').config();
import request from '../config/common';
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";
const faker = require('faker');

const TOKEN = process.env.USER_TOKEN;

describe("User Posts",()=>{
    let userId;
    before(async()=>{
        userId = await createRandomUser();
    });

    it("/posts",async()=>{
        let postid;
        const data = {
            "user_id" : userId,
            "title" : faker.lorem.sentence(),
            "body" : faker.lorem.paragraph()
            };
        
        const res = await request
                .post(`users/${userId}/posts`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .send(data)
        console.log("data",data);
        expect(res.body.data).to.deep.include(data);
        postid = res.body.data.id;
        console.log("postid",postid);
    });

    it("GET /posts/id",async()=>{    
        console.log("userId",userId)
       await request
                .get(`users/${userId}/posts`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .expect(200);
    });

    describe("Negative Tests",()=>{
        it("401 Authentication Failed",async()=>{
            const data = {
                user_id : userId,
                title : "My Title",
                body : "My blogg new post"
            }

            const postRes = await request
                .post(`users/${userId}/posts`)
                // .set("Authorization",`Bearer ${TOKEN}`)
                .send(data);
            console.log("message",postRes.statusCode);
            expect(postRes.statusCode).to.eq(401);
            expect(postRes.body.data.message).to.eq('Authentication failed');
        });

        it("422 authentication failed",async()=>{
            const data = {
                user_id : userId,
                title : "Test title",
                body : "My body"
            };

            const posRes = await request
                .post(`users/${userId}/posts`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .send()

            expect(posRes.status).to.eq(422);
            expect(posRes.body.data[0].message).to.eq("can't be blank");
            // expect(postRes.body.data.message).to.eq('');
        });
    });
});