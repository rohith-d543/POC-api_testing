const request = require('supertest');

describe('API_AUTOMATION', () => {
   test('#1 GET REQUEST ', async() => {
   const res = await request('https://reqres.in/').get('api/users?page=2')
   console.log(res._body)
    
    expect(res.statusCode).toEqual(200)
    
    expect(res._body.page).toEqual(2)
    expect(res._body.per_page).toEqual(6)
    expect(res._body.total).toEqual(12)


    // expect(res._body.page).toBeGreaterThan(1)
    // expect(res._body.per_page).toBeGreaterThan(5)
    // expect(res._body.total).toBeGreaterThan(13)


  //  await expect(res._body.data.email).toEqual("janet.weaver@reqres.in")


  
  });


  test('#2 POST REQUEST', async () =>{
    const res = await request('https://reqres.in/').post('api/users')
    .send(
      {
        "name": "rohith",
        "job": "SDET"
    
    })
    console.log(res._body)
    expect(res.statusCode).toEqual(201)
    expect(res._body.name).toBe("rohith")
    expect(res._body.job).toBe("SDET")
    expect(res._body).toHaveProperty('id')
    expect(res._body).toHaveProperty('createdAt')
    expect(res._body.id).toBeTruthy()
    expect(res._body.createdAt).toBeTruthy()
    expect(res._body.createdAt).toContain('2023')
   })



   test('#3 PUT Request', async()=>{

    const res = await request('https://reqres.in/').put('api/users/2')
    .send({
      "name": "Rohith Dornala",
      "job": "SDET 1"
  
  })
  console.log(res._body)
  expect(res.statusCode).toEqual(200)
  expect(res._body.name).not.toBe("rohith")
  expect(res._body.job).not.toBe("SDET")
  expect(res._body).toHaveProperty('updatedAt')
   })
});
