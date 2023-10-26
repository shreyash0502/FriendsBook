import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import './FriendsNetwork.css'; // Import a separate CSS file
import { Link } from 'react-router-dom'; // Import the Link component from React Router

const FriendsNetwork = ({ nodes, edges }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = window.innerWidth * 0.6;
    const height = window.innerHeight * 0.6;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Calculate the center position
    const centerX = width / 2;
    const centerY = height / 2;

    // Add a white opaque rectangle to the background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'white');

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(100)) // Reduced link distance
      .force('charge', d3.forceManyBody().strength(-30)) // Increased repulsion
      .force('center', d3.forceCenter(centerX, centerY));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', 'black') // Set link color to black
      .attr('stroke-width', 1); // Reduced link width

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10) // Reduced node size
      .attr('fill', 'black'); // Set node color to black

    // Add text labels to the nodes
    const text = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('dy', -15) // Adjust the vertical position of the text
      .attr('fill', 'black'); // Set label color to black

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      text
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  }, [nodes, edges]);

  return (
    <div className="friends-network-container">
      <div className="network-heading">
        <h1>Friends Network</h1>
      </div>
      <svg ref={svgRef}></svg>
	  <Link to="/"> {/* Link to the home page */}
        <button className="back-button">Go Back</button>
      </Link>
    </div>
  );
};

export default FriendsNetwork;
