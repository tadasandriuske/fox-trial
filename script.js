const svgs = document.querySelectorAll('svg');

svgs.forEach(svg => {
    const bbox = svg.getBBox(); // Get the bounding box of the content
    const width = bbox.width;
    const height = bbox.height;

    // Set the viewBox to encompass the content
    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${width} ${height}`);

    // Optionally, scale the SVG box itself
    svg.setAttribute('width', width); // Double the size
    svg.setAttribute('height', height);
});