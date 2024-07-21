let dropDown = document.querySelectorAll(".dropDown select")
let selectFrom = document.querySelector("#selectfrom select")
let selectTo = document.querySelector("#selectto select")
let exchangeBtn = document.querySelector(".btn")

for (const iterator of dropDown) {
    for (const key in countryList) {
        const option = document.createElement("option");
        option.value = key;
        option.text = key;
        if (iterator.name === "from" && option.text === "USD") {
            option.selected = "selected";
        }
        else if (iterator.name === "to" && option.text === "INR") {
            option.selected = "selected";
        }
        iterator.appendChild(option);
    }

    iterator.addEventListener("change", (elem) => {
        updateFlag(elem.target)
    })

}

let updateFlag = (elem) => {
    let country = countryList[elem.value]
    elem.parentElement.querySelector("img").src = `https://flagsapi.com/${country}/shiny/64.png`


}

async function getData() {
    let BASE_URL = await fetch(
        `https://v6.exchangerate-api.com/v6/d6b00d4c733dd6921c18fed1/latest/${selectFrom.value}`);
    let r = await BASE_URL.json()
    let rate = (r.conversion_rates[`${selectTo.value}`])

    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = 1
    }
    let convertedRate = (rate * amtVal).toFixed(3)

    document.querySelector(".msg").textContent = `${amtVal}  ${selectFrom.value}  =>  ${convertedRate}  ${selectTo.value}`

}


document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".msg").classList.remove("hide")
    getData();
})


window.addEventListener("load", () => {
    getData();
});