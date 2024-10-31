// src/components/CreateChartData.js

//Creating the chart data for Price vs Building Area using the predictions from the backend
export const createBuildingAreaChartData = (buildingAreas, predsBA, buildingArea, predictedPrice) => {
    return {
        labels: buildingAreas, // X-axis labels (building area)
        datasets: [
            {
                label: 'Predicted Price',
                data: predsBA,  // Y-axis data (predicted prices for Building area)
                borderColor: '#44195e', //dark orange
                backgroundColor: '#44195e', //dark orange
                tension: 0.1
            },
            {
                label: 'Your Prediction',
                data: [{x: parseInt(buildingArea), y: predictedPrice}],
                borderColor: '#fc6601', //dark orange
                backgroundColor: '#fc6601', //dark orange
                pointRadius: 8,
                pointHoverRadius: 12,
                showLine: false //Show only the point for the user's prediction
            }
        ]
    };
};

//Creating the chart data for Price vs Types using the predictions from the backend
export const createTypesChartData = (types, predsT, type, predictedPrice2) => {

    //Prepare data for the chart
    return {
        labels: types, // X-axis labels (types)
        datasets: [
            {
                label: 'Predicted Price',
                data: predsT, // Y-axis data (predicted prices for each type)
                backgroundColor: [
                    '#41c7e1', // Color for 1 - Unit
                    '#f7a74c', // Color for 2 - House
                    '#fc6601'  // Color for 3 - Townhouse
                ],
                borderColor: '#000',
                borderWidth: 1
            },
            {
                label: 'Your Prediction',
                data: [{x: parseInt(type), y: predictedPrice2}],
                borderColor: '#fc6601', //dark orange
                borderWidth: 1
            }
        ]
    };
};