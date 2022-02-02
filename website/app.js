// Personal API Key for OpenWeatherMap API
const apiKey = `&appid=b484cf976cd1ffb3ea4f76168d5ad843&units=imperial`;

/* Global Variables */
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?id=`;
const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// The action function performaded after the click
const clickAction = () => {
    const zipCode = document.getElementById("zip").value;
    const userFeeling = document.getElementById("feelings").value;
    getWeatherData(baseUrl, zipCode, userFeeling).then((data) => {
        console.log(data);
        if (data.cod !=200 )
            return alert( data.message );
        // Add the recieved weather data to POST request
        postData("/addData", { date: newDate, temp: data.list[0].main.temp, content: userFeeling });
        updateUI();
    });
};
// Get weather data from OpenWeather API
const getWeatherData = async (baseUrl, zipCode, userFeeling) => {
    const response = await fetch(baseUrl + zipCode + apiKey);
    try {
        console.log(response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const postData = async (url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById("date").textContent = `Date: ${allData.date}`;
        document.getElementById("temp").textContent = `Temprature: ${Math.round(
            allData.temp
        )} degrees`;
        document.getElementById("content").textContent = `I feel ${allData.content} today`;
    } catch (error) {
        console.log("error", error);
    }
};

// Add click event to the generate button in DOM
generateButton.addEventListener("click", clickAction);
