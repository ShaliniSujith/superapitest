import request from "../config/common";
import { expect } from "chai";

const TOKEN = process.env.USER_TOKEN;
describe('Users',()=>{
    it("Get /users",()=>{
        // request
        //     .get(`users?access-token=${TOKEN}`).end((err,res)=>{
        //         console.log(err);
        //         console.log(res.body);
        //         expect(res.body.data).to.not.be.empty;
        //         done();
        //     });

        return request.get(`users?access-token=${TOKEN}`).then((res)=>{
            expect(res.body.data).to.not.to.be.empty;
        });
    });

    it("Get /users/:id",()=>{
        return request.get(`/users/1?access-token=${TOKEN}`).then((res)=>{
            expect(res.body.data.id).to.be.eq(1);
        });
    });

    it("GET /users with query param",()=>{
        const url = `/users?access-token=${TOKEN}&page=5&gender=female&status=active`;

        return request.get(url).then((res)=>{
            expect(res.body.data).to.not.to.be.empty;
            res.body.data.forEach(data => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');                            
            });
        });
    });

    it("POST /users",()=>{
        const data = {
            "email": `test-${Math.floor(Math.random()* 99)}@test.com`,
            "name": "testname",
            "gender": "female",
            "status":"inactive"
        };

        return request.post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data).then((res)=>{
                // data.email = "test76@test.com"
            //    expect(res.body.data.email).to.eq(data.email);
            //    expect(res.body.data.status).to.eq(data.status);
            //    expect(res.body.data.gender).to.eq(data.gender);
            expect(res.body.data).to.deep.include(data);
            });
    });

    it("PUT /users/:id",()=>{
        const data = {
            "status" : "inactive",
            "name": `koofy${Math.floor(Math.random()*999)}`
        }

        return request.put("/users/2034")
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(data).then((res)=>{
               expect(res.body.data).to.deep.include(data);
            });
    });

    it("DELETE /users/:id",()=>{
        return request
            .delete('users/2034')
            .set("Authorization",`Bearer ${TOKEN}`)
            .then((res)=>{
                expect(res.body.data).to.be.eq(null);
            })

    });
});