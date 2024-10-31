// src/components/PriceVsTypesChart.js
import React, { useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import * as d3 from 'd3';

const PriceVsTypesChart = ({ chartData }) => {
  const svgRef = useRef();
  const tooltipRef = useRef(); // Tooltip reference
  const theme = useTheme();
  
  // Define responsive dimensions
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = isSmallScreen ? 300 : 500; // Width changes based on screen size
  const height = isSmallScreen ? 250 : 400; // Height changes based on screen size

  useEffect(() => {
    if (!chartData) return;

    // Set margins for the chart
    const margin = { top: 60, right: 30, bottom: 60, left: 70 };

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create a tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "rgba(0, 0, 0, 0.8)")  // Slightly translucent black tooltip background color
      .style("color", "white") // Text color white
      .style("border", "none")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Set up x and y scales
    const x = d3.scaleBand()
      .domain(chartData.labels)
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData.datasets[0].data)])
      .nice()
      .range([height, 0]);

    // Add x-axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => {
        switch (d) {
          case 1: return 'Unit';
          case 2: return 'House';
          case 3: return 'Townhouse';
          default: return '';
        }
      }))
      .selectAll("text") // Adjust x-axis tick text position
      .attr("transform", "translate(0, 5)"); // Move ticks down

    // Add y-axis
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));

    // Add x-axis title
    svg.append("text")
      .attr("class", "x-axis-title")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 15)
      .style("font-size", "13px")
      .attr("text-anchor", "middle")
      .text("Property Type");

    // Add y-axis title
    svg.append("text")
      .attr("class", "y-axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -height / 2)
      .style("font-size", "13px")
      .attr("text-anchor", "middle")
      .text("Predicted Price ($)");

    // Create bars
    svg.selectAll(".bar")
      .data(chartData.datasets[0].data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(chartData.labels[i]))
      .attr("y", d => y(d))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d))
      .attr("fill", (d, i) => chartData.datasets[0].backgroundColor[i])
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`Predicted Price: $${d}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add your prediction point
    const userPrediction = chartData.datasets[1].data[0];
    if (userPrediction) {
      svg.append("circle")
        .attr("cx", x(userPrediction.x) + x.bandwidth() / 2)
        .attr("cy", y(userPrediction.y))
        .attr("r", 5)
        .attr("fill", chartData.datasets[1].borderColor);

      // Add "Your Prediction" legend
      const legendY = -margin.top / 2 + 18; // Adjust the y-coordinate to position below the chart title
      svg.append("text")
        .attr("x", width - 70)
        .attr("y", legendY)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text("Your Prediction")
        .attr("fill", chartData.datasets[1].borderColor);

      svg.append("circle")
        .attr("cx", width - 80)
        .attr("cy", legendY - 5) // Align circle with the text
        .attr("r", 5)
        .attr("fill", chartData.datasets[1].borderColor);
    }

    // Add chart title
    svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "1rem")
      .text("Price Predictions by Property Types");

  }, [chartData, width, height]); // Include width and height in the dependency array

  return (
    <Box sx={{ width: '95%', height: { xs: '250px', sm: '400px' } }}>
      <svg ref={svgRef}></svg>
      {/* Tooltip div */}
      <div ref={tooltipRef} style={{ position: 'absolute', pointerEvents: 'none' }}></div>
    </Box>
  );
};

export default PriceVsTypesChart;
