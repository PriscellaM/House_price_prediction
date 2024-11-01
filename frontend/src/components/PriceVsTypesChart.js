// src/components/PriceVsTypesChart.js
// Using d3 to create a bar chart

import React, { useEffect, useRef } from 'react';   // Import React components
import { Box, useTheme, useMediaQuery } from '@mui/material';   // Import MUI components
import * as d3 from 'd3'; // Import d3 for the chart

const PriceVsTypesChart = ({ chartData }) => {
  const svgRef = useRef(); // Reference to the SVG element
  const tooltipRef = useRef(); // Reference for the tooltip
  const theme = useTheme(); // Get current theme for styling

  // Define responsive dimensions based on screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = isSmallScreen ? 300 : 500; // Width changes based on screen size
  const height = isSmallScreen ? 250 : 400; // Height changes based on screen size

  useEffect(() => {
    // Exit early if there is no chart data
    if (!chartData) return;

    // Set margins for the chart
    const margin = { top: 60, right: 30, bottom: 60, left: 70 };

    // Clear previous SVG content to prevent overlap
    d3.select(svgRef.current).selectAll("*").remove();

    // Create the SVG container with appropriate viewBox
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`); // Apply margins

    // Create a tooltip for displaying predicted prices
    const tooltip = d3.select(tooltipRef.current)
      .style("opacity", 0) // Start hidden
      .style("position", "absolute")
      .style("background-color", "rgba(0, 0, 0, 0.8)")  // Slightly translucent black background
      .style("color", "white") // White text color
      .style("border", "none")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Set up x and y scales
    const x = d3.scaleBand()
      .domain(chartData.labels) // Set domain based on property types
      .range([0, width]) // Map domain to width
      .padding(0.4); // Add padding between bars

    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData.datasets[0].data)]) // Set y domain to max predicted price
      .nice() // Round the domain for nice formatting
      .range([height, 0]); // Invert range for SVG coordinates

    // Add x-axis to the chart
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(35, ${height})`) // Position x-axis at the bottom
      .call(d3.axisBottom(x).tickFormat((d) => {
        // Format x-axis ticks based on property type
        switch (d) {
          case 1: return 'Unit';
          case 2: return 'House';
          case 3: return 'Townhouse';
          default: return '';
        }
      }))
      .selectAll("text") // Adjust x-axis tick text position
      .attr("transform", "translate(0, 5)") // Move ticks down
      .style("font-size", "0.9rem");

    // Add y-axis to the chart
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(35, 0)`) // Position y-axis
      .call(d3.axisLeft(y)) // Call y-axis with linear scale
      .selectAll("text") // Adjust y-axis tick text position
      .style("font-size", "0.9rem");
      //.attr("transform", "translate(10, 0)"); // Move ticks right

    // Add title for x-axis
    svg.append("text")
      .attr("class", "x-axis-title")
      .attr("x", 35 + width / 2) // Center the title
      .attr("y", height + margin.bottom - 8)
      .style("font-size", "1.1rem")
      .attr("text-anchor", "middle")
      .text("Property Type");

    // Add title for y-axis
    svg.append("text")
      .attr("class", "y-axis-title")
      .attr("transform", "rotate(-90)") // Rotate for vertical placement
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2) // Center the title
      .style("font-size", "1.1rem")
      .attr("text-anchor", "middle")
      .text("Predicted Price ($)");

    // Create a format function for currency
    const formatPrice = d3.format("$,"); // Format numbers for predicted price with commas

    // Create bars for the chart
    svg.selectAll(".bar")
      .data(chartData.datasets[0].data) // Bind data to bars
      .enter().append("rect") // Create a rect for each data point
      .attr("class", "bar")
      .attr("x", (d, i) => x(chartData.labels[i])) // Set x position
      .attr("y", d => y(d)) // Set y position based on data value
      .attr("width", x.bandwidth()) // Set width of the bar
      .attr("height", d => height - y(d)) // Set height of the bar
      .attr("fill", (d, i) => chartData.datasets[0].backgroundColor[i]) // Set fill color
      .on("mouseover", (event, d) => {
        // Show tooltip on mouse over
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`Predicted Price: ${formatPrice(d)}`) // Display formatted price
          .style("left", `${event.pageX + 5}px`) // Position tooltip near mouse
          .style("top", `${event.pageY - 28}px`);
      })
      .attr("transform", "translate(35, 0)") // Move bars to the right
      .on("mouseout", () => {
        // Hide tooltip on mouse out
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add user prediction point if available
    const userPrediction = chartData.datasets[1].data[0]; // Get user prediction data
    if (userPrediction) {
      // Draw a circle for user prediction
      svg.append("circle")
        .attr("cx", x(userPrediction.x) + x.bandwidth() / 2) // Center the circle over the bar
        .attr("cy", y(userPrediction.y)) // Set y position based on user prediction
        .attr("r", 5) // Set radius of the circle
        .attr("fill", chartData.datasets[1].borderColor) // Set fill color for the circle
        .attr("transform", "translate(35, 0)"); // Move circle to the right

      // Add "Your Prediction" legend
      const legendY = -margin.top / 2 + 18; // Adjust y-coordinate for positioning
      svg.append("text")
        .attr("x", width - 77) // Position text for the legend
        .attr("y", legendY)
        .attr("text-anchor", "start")
        .style("font-size", "1rem")
        .text("Your Prediction")
        .attr("fill", chartData.datasets[1].borderColor); // Color matches prediction circle

      // Draw a circle for the legend
      svg.append("circle")
        .attr("cx", width - 85) // Position for legend circle
        .attr("cy", legendY - 5) // Align circle with text
        .attr("r", 5) // Set radius of the legend circle
        .attr("fill", chartData.datasets[1].borderColor); // Set fill color for the legend circle
    }

    // Add title for the entire chart
    svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2) // Center the title
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Price Predictions by Property Types");

  }, [chartData, width, height]); // Re-run effect if chartData, width, or height changes

  return (
    <Box sx={{ width: '95%', height: { xs: '250px', sm: '400px' } }}>
      <svg ref={svgRef}></svg> {/* SVG element for the chart */}
      {/* Tooltip div for displaying information */}
      <div ref={tooltipRef} style={{ position: 'absolute', pointerEvents: 'none' }}></div>
    </Box>
  );
};

export default PriceVsTypesChart; // Export the component for use in other parts of the application
