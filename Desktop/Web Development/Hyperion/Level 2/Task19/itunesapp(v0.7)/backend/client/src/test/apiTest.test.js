import React from "react";
import renderer from "react-test-renderer";

test("see if the fetch fails with error", () => {
    const query = "britney";
    return fetch(`https://itunes.apple.com/search?term=${query}&limit=20`)
        .then(res => {
            console.log(res)
            expect(res.status).toBe(200);
        });
});

test("test if api fetch is working as expected", () => {
    const query = "britney";
    return fetch(`https://itunes.apple.com/search?term=${query}&limit=20`)
        .then(res => {
            console.log(res)
            expect(res).toBeDefined();
        });
});