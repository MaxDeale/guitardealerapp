const express = require("express");
const app = express();
const fileSystem = require("fs");
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(helmet());
// using the public directory to serve static files
app.use(express.static("public"));

let favlist = JSON.parse(fileSystem.readFileSync("./src/favourites.json"));

// route to get all current favourite items
app.get("/favourites", function (req, res) {
  fileSystem.readFile("./src/favourites.json", function (err, data) {
    if (err) throw err;

    favlist = JSON.parse(data);
    res.json(favlist);
  });
});

// add a new favourite route 
app.post("/favourites", function (req, res) {
  fileSystem.readFile("./src/favourites.json", function (err) {
    if (err) {
      console.error(err);
    } else {
      // using the request from axios to add the new favourite to the json file
      const newFavourite = req.body;
      favlist.push(newFavourite);
      favlist = JSON.stringify(favlist);
      fileSystem.writeFile("./src/favourites.json", favlist, function (err) {
        if (err) {
          console.error(err);
        } else {
          res.send("favourites list updated");
        }
      });
    }
  });
});

// MAKE DELETE ROUTE

app.delete("/favourites/:id", function (req, res) {
  console.log(req.params.id);
  // get json stringify of query and save to variable
  let currentQuery = req.params.id;
  // using the find method to find the specific song by the given id
  let deleteObj = favlist.find(song => song.id == currentQuery);
  let deleteIndex = favlist.indexOf(deleteObj);
  // using splice method with the index of the given object to delete the item
  favlist.splice(deleteIndex, 1);
  console.log(favlist)
  favlist = JSON.stringify(favlist)
  // writing the new updated file to json with the removed item
  fileSystem.writeFile("./src/favourites.json", favlist, function (err) {
    if (err) {
      console.err(err)
    } else {
      res.send("file successfully deleted")
    }
  });
});

// making the server listen in port 8080 using a variable
const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.err(err)
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }

});