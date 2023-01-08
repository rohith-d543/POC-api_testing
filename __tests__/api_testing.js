const request = require("supertest");
let testData = require("/home/cawqa/POC-api_testing/testdata/testData.js");

describe("API_AUTOMATION", () => {
  test("#1 GET REQUEST ", async () => {
    //  const res = await request('https://reqres.in/').get('api/users?page=2')
    const res = await request(`${testData.hostName}`).get(
      `${testData.path}` + `${testData.queryString}`
    );
    //console.log(res._body)

    expect(res.statusCode).toEqual(200);

    expect(res._body.page).toEqual(2);
    expect(res._body.per_page).toEqual(6);
    expect(res._body.total).toEqual(12);

    // expect(res._body.page).toBeGreaterThan(1)
    // expect(res._body.per_page).toBeGreaterThan(5)
    // expect(res._body.total).toBeGreaterThan(13)

    //  await expect(res._body.data.email).toEqual("janet.weaver@reqres.in")
  });

  test("#2 POST REQUEST", async () => {
    const res = await request(`${testData.hostName}`)
      .post(`${testData.path}`)
      .send({
        name: "rohith",
        job: "SDET",
      });
    //console.log(res._body)
    expect(res.statusCode).toEqual(201);
    expect(res._body.name).toBe("rohith");
    expect(res._body.job).toBe("SDET");
    expect(res._body).toHaveProperty("id");
    expect(res._body).toHaveProperty("createdAt");
    expect(res._body.id).toBeTruthy();
    expect(res._body.createdAt).toBeTruthy();
    expect(res._body.createdAt).toContain("2023");
  });

  test("#3 PUT Request", async () => {
    const res = await request(`${testData.hostName}`)
      .put(`${testData.path}/2`)
      .send({
        name: "Rohith Dornala",
        job: "SDET 1",
      });
    //console.log(res._body)
    expect(res.statusCode).toEqual(200);
    expect(res._body.name).not.toBe("rohith");
    expect(res._body.job).not.toBe("SDET");
    expect(res._body).toHaveProperty("updatedAt");
  });

  test("#4  PATCH Request", async () => {
    const res = await request(`${testData.hostName}`)
      .patch(`${testData.path}/2`)
      .send({
        name: "ROHITH DORNALA",
        job: "SDET 1",
      });

   //console.log(res._body)
    await expect(res.statusCode).toEqual(200);
    expect(res._body.name).toBe("ROHITH DORNALA");
    expect(res._body.job).not.toBe("SDET");
    expect(res._body).toHaveProperty("updatedAt");
  });

  test("#5  DELETE Request", async () => {
    const res = await request(`${testData.hostName}`).delete(
      `${testData.path}/2`
    );

    await expect(res.statusCode).toEqual(204);
  });
});