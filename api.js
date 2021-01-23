const getInputValue = () => {
  var inputVal = document.getElementById("inputLicense").value;
  console.log("input", inputVal);
  getData(inputVal);
};

const getData = (kenteken) => {
  var API_KEY_GET =
    "?ovio-api-key=158fa7e78df11bae1f90cb2f8e74e964ac4dca56dbc16745313d023dc744843e";

  axios
    .get("https://api.overheid.io/voertuiggegevens/" + kenteken + API_KEY_GET)
    .then((response) => {
      const results = response.data;
      console.log("results", results);

      let $tradeName = $("#tradeName");
      let $date = $("#date");
      let $fuel = $("#fuel");

      searchPhotos(results.handelsbenaming);

      $tradeName.append(
        "<div>" +
          "Tradename" +
          "</div>" +
          "<div>" +
          results.handelsbenaming +
          "</div>"
      );

      $date.append(
        "<div>" +
          "Date of first admission" +
          "</div>" +
          "<div>" +
          results.datum_eerste_toelating +
          "</div>"
      );

      $.each(results.brandstof, function (i, user) {
        $fuel.append(
          "<div>" +
            "Fuel Description" +
            "</div>" +
            "<div>" +
            user.brandstof_omschrijving +
            "</div>"
        );
      });
    })
    .catch((error) => console.error("error message", error));
};

const searchPhotos = (brand) => {
  let client_id = "njjUFNYts2AtHIt2yP-6VArMsW2-9rae1km-MkiS84c";
  let keyword = brand;
  numberOfPhotos = 3;

  let url =
    "https://api.unsplash.com/photos/?client_id=" +
    client_id +
    "&query=" +
    keyword;
  // let url2 =
  //   "https://api.unsplash.com/photos/random/?count=" +
  //   numberOfPhotos +
  //   "&client_id=" +
  //   client_id;

  let picContainer = document.getElementById("pics");

  axios.get(url).then((response) => {
    console.log("response pic", response.data);

    let dataPics = response.data;
    for (let [key, value] of Object.entries(dataPics)) {
      console.log(key, value.urls.small);

      picContainer.insertAdjacentHTML(
        "beforeend",
        '<img src="' + value.urls.small + '">'
      );
    }
  });
};
