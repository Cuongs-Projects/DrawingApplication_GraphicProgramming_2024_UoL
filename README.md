# DrawingApplication_GraphicProgramming_2024_UoL

This project is an interactive drawing application built using the p5.js library, developed as part of the "Introduction to Programming II" module. The application provides a basic drawing canvas and a toolbox with various drawing tools. It was extended with several custom features, including a stamp tool with rotatable images, an editable shape tool with fill capabilities, a Gaussian blur tool (in progress), and helper functionalities like drawing layers, an eraser, grids, and a thickness slider.

The primary goal was to expand upon a provided template by implementing unique extensions and helper functions to create a more feature-rich and user-friendly drawing experience.

The development process, including brainstorming, design choices, coding techniques, and challenges, is documented in the Individual Midterm Report for Week 12.pdf. The source code includes detailed comments and highlighted sections (in the provided code PDF) to indicate personally developed components.

Unfortunately, due to my inexperience in coding at that time, this application is heavily unoptimised. The horrible lack of functions and putting everything in a few big functions made the application eat up the RAM of your devices. I ***don't*** recommend running

- Core Features & Implemented Extensions:

    Basic Drawing Tools (Template Foundation):

        Freehand Drawing Tool

        Line Tool

        Spray Can Tool

        Mirror Draw Tool

    Colour Palette: Allows users to select different drawing colours.

    Canvas Management: Clear canvas and save image functionalities.

- Implemented Extensions & Helper Functions:

    Stamp Tool (stampTool.js):

        Allows users to select from a variety of preloaded images (e.g., cat loaf, surprised cat, various dogs) via a dropdown menu.

        Stamps can be rotated by dragging the mouse after placing the initial stamp point, before releasing the mouse button.

        Stamp size can be adjusted using the global thickness slider.

    Editable Shape Tool (editableShapeTool.js):

        Users can click to place vertices and create custom polygons (default shape: flower icon).

        Edit Mode: Allows users to click and drag existing vertices to modify the shape's contour.

        Fill Functionality: A "Fill the shape" button allows users to fill the created polygon with the currently selected colour. The fill is achieved by sampling the color at the first vertex and applying it.

    Gaussian Blur Tool (Conceptualized & In Progress):

        Intended as a unique extension to apply a blur effect to areas of the canvas.

        The approach involves iterating through pixels around the cursor, applying a kernel matrix, and averaging color values.

        Challenge: Performance optimization due to the computational intensity of pixel manipulation.

    Drawing Layers (addonHelpersStuff.js, sketch.js):

        Implemented three distinct drawing layers (BaseLayer, 2ndLayer, 3rdLayer) using createGraphics() for off-screen canvases.

        Users can select the active drawing layer via radio buttons.

        Layers are composited together in the main draw() loop, allowing for non-destructive drawing and an eraser tool that works per layer.

    Eraser Tool (eraserTool.js):

        Functions by setting the blendMode() of the active layer to REMOVE, effectively erasing content on that specific layer without affecting others.

    Grids (addonHelpersStuff.js, grid.js):

        Users can select different grid overlays (None, Camera Grid, Line Grid) from a dropdown menu.

        Grids are drawn on a separate graphics layer to assist with alignment and composition.

    Thickness Slider (addonHelpersStuff.js, sketch.js):

        A global slider allows users to control the stroke weight for drawing tools and the size of stamps.

    Performance Optimization (sketch.js):

        To address browser crashing due to high resource usage (RAM/CPU), the main drawing loop in sketch.js was modified to only re-render the canvas actively when the mouse is pressed or for a few frames after, then noLoop() is called. loop() is re-enabled on mousePressed().

- Technical Implementation:

    Language: JavaScript (with p5.js library)

    Core p5.js Concepts Used:

        setup(), draw(), preload()

        Canvas creation and manipulation (createCanvas, createGraphics for layers)

        Shape drawing primitives (line, ellipse, rect, beginShape, vertex, endShape)

        Image handling (loadImage, image, imageMode)

        Pixel manipulation (indirectly via layer drawing and blendMode)

        Mouse and keyboard events (mouseIsPressed, mouseX, mouseY, mousePressed)

        DOM manipulation for UI elements (createSlider, createRadio, createSelect, createButton, .parent(), .option(), .value(), .html())

        Transformations (translate, rotate, angleMode)

        Color handling (fill, stroke, strokeWeight, background)

        Object-Oriented Principles: Tools are structured as functions/objects with their own draw, populateOptions, and unselectTool methods.

    Helper Functions: Custom functions created for managing layers, grid selection, thickness control, and checking mouse position relative to the canvas.

- Project Structure:

    index.html: Main HTML file, sets up the layout and includes scripts.

    sketch.js: Core p5.js setup and draw loop, initializes tools and helpers.

    toolbox.js: Manages the collection of drawing tools and tool selection.

    colourPalette.js: Handles color selection.

    helperFunctions.js: Contains general helper functions like clear and save.

    addonHelpersStuff.js: Contains custom helper functions for layers, grids, and thickness.

    Individual *.js files for each drawing tool (e.g., stampTool.js, editableShapeTool.js, eraserTool.js, etc.).

    style.css: CSS for basic layout and UI elements.

    /assets: Folder containing images for tool icons and stamps.
