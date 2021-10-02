require('dotenv').config();
import request from "../config/common"
import { expect } from "chai";

const TOKEN = process.env.USER_TOKEN;
describe('Users',()=>{
    let userId;

    describe("POST",()=>{
        it("/users",()=>{
            const data = {
                "email": `test-${Math.floor(Math.random()* 99)}@test.com`,
                "name": "testname",
                "gender": "female",
                "status":"inactive"
            };
    
            return request.post('users')
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data).then((res)=>{
                expect(res.body.data).to.deep.include(data);
                userId = res.body.data.id;
                console.log(userId)
                });
        });
    });

    describe("GET",()=>{
        it("/users",()=>{
            return request.get(`users?access-token=${TOKEN}`).then((res)=>{
                expect(res.body.data).to.not.to.be.empty;
            });
        });
    
        it("/users/:id",()=>{
            return request.get(`/users/${userId}?access-token=${TOKEN}`).then((res)=>{
                expect(res.body.data.id).to.be.eq(userId);
            });
        });
    
        it("/users with query param",()=>{
            const url = `/users?access-token=${TOKEN}&page=5&gender=female&status=active`;
    
            return request.get(url).then((res)=>{
                expect(res.body.data).to.not.to.be.empty;
                res.body.data.forEach(data => {
                    expect(data.gender).to.eq('female');
                    expect(data.status).to.eq('active');                            
                });
            });
        });
    }); 

    describe("PUT",()=>{
        it("/users/:id",()=>{
            const data = {
                "status" : "inactive",
                "name": `koofy${Math.floor(Math.random()*999)}`
            }
    
            return request.put(`/users/${userId}`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .send(data).then((res)=>{
                   expect(res.body.data).to.deep.include(data);
                });
        });
    });
    
    describe("DELETE",()=>{
        it("/users/:id",()=>{
            return request
                .delete(`users/${userId}`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .then((res)=>{
                    console.log(res.body);
                    expect(res.status).to.be.eq(204);
                });    
        });
    });  
});