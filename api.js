const getInputValue = () => {
    var inputVal = document.getElementById("inputLicense").value;
    console.log("input", inputVal)
    getData(inputVal)
}

const getData = (kenteken) => {
    var API_KEY_GET =
      "?ovio-api-key=158fa7e78df11bae1f90cb2f8e74e964ac4dca56dbc16745313d023dc744843e";
  
    axios
      .get('https://api.overheid.io/voertuiggegevens/'+kenteken+API_KEY_GET)
      .then((response) => {
        const results = response.data;
        console.log("results", results);

        let $tradeName = $("#tradeName");
        let $date = $("#date");
        let $fuel = $("#fuel");

        
        $tradeName.append(
            '<div>' + 'Tradename' + '</div>' +
            '<div>' +results.handelsbenaming+'</div>'
        )

        $date.append(
            '<div>' + 'Date of first admission' + '</div>' +
            '<div>'+results.datum_eerste_toelating+'</div>'
        )

        $.each(results.brandstof, function (i, user) {
          $fuel.append(
            '<div>' + 'Fuel Description' + '</div>' +
            '<div>' +
              user.brandstof_omschrijving +
              '</div>'
          );
        });
      })
      .catch((error) => console.error("error message", error));
  };