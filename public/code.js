received_data = [];

function resetPage() {
    $('#unicornNameFilter').prop('checked', false);
    $('#unicornWieghtFilter').prop('checked', false);
}

function filter() {
    name_ = "unchecked"
    weight_ = "unchecked"

    if ($('#unicornNameFilter').is(":checked")) {
        name_ = "checked"
    }
    if ($('#unicornWeightFilter').is(":checked")) {
        weight_ = "checked"
    }
    // console.log(received_data);

    tmp = received_data.map(
        (ob) => {
            result = []
            if (name_ == "checked")
                result.push(ob["name"])

            if (weight_ == "checked")
                result.push(ob["weight"])

            return result
        }
    )
    // console.log(tmp);
    $("#result").html("<pre>" + tmp + "</pre>");
}

function process_res(data) {
    received_data = data
    console.log(data)
    $("#result").html(JSON.stringify(data));
}
function findUnicornByName() {
    console.log("findUnicornByName()" + "got called!");
    console.log($("#unicornName").val())

    $.ajax(
        {
            url: "https://dry-eyrie-44978.herokuapp.com/findUnicornByName",
            type: "POST",
            data: {
                "unicornName": $("#unicornName").val()
            },
            success: process_res
        }
    )
    resetPage();
    $("#filters").show()
}

function findUnicornByFood() {
    apple = "unchecked"
    carrot = "unchecked"

    if ($('#apple').is(":checked")) {
        apple = "checked"
    }
    if ($('#carrot').is(":checked")) {
        carrot = "checked"
    }
    $.ajax(
        {
            url: "https://dry-eyrie-44978.herokuapp.com/findUnicornByFood",
            type: "POST",
            data: {
                "apple": apple,
                "carrot": carrot
            },
            success: process_res
        }
    )
    resetPage();
    $("#filters").show()
}

function findUnicornByWeight() {
    console.log("findByWeight" + "got called!");
    console.log($("#lowerWeight").val());
    console.log($("#higherWeight").val())

    $.ajax(
        {
            url: "https://dry-eyrie-44978.herokuapp.com/findUnicornByWeight",
            type: 'POST',
            data: {
                "lowerWeight": $("#lowerWeight").val(),
                "higherWeight": $("#higherWeight").val()
            },
            success: process_res
        }
    )
    resetPage();
    $("#filters").show()
}

function setup() {
    $("#findUnicornByName").click(findUnicornByName)
    $("#findUnicornByFood").click(findUnicornByFood)
    $("#findUnicornByWeight").click(findUnicornByWeight)
    $("#filter").click(filter)
    $("#filters").hide()
}

$(document).ready(setup)