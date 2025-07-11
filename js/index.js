// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Initialize the PCB model
// Assuming PCBmodel is a class that takes context, and some dimensions (e.g., width, height, scale)
// The values 20, 60, 40 are placeholders, adjust them based on your PCBmodel constructor's expectations.
const pcb = new PCBmodel(ctx, 20, 60, 40);

// Add an event listener for clicks on the canvas
canvas.addEventListener('click', (event) => {
  // Calculate local coordinates relative to the PCB model
  // Use event.offsetX and event.offsetY as they are standard and widely supported.
  // event.layerX/Y are deprecated and may not behave consistently.
  const localX = pcb.toLocal(event.offsetX);
  const localY = pcb.toLocal(event.offsetY);

  console.log(`Click position (local): ${localX}, ${localY}`);

  // Check if there's an active element being built
  // This assumes pcb.existElement[0] is the currently active element
  // and that it has a 'build' method and a 'build' property to indicate its state.
  if (!pcb.existElement[0] || !pcb.existElement[0].buildComplete) {
    // If no element is active or the active one is not yet complete,
    // create a new CeramicsCapacitor and add it to the front of the array.
    // Consider if unshift is the desired behavior or if you should append (push)
    // or manage a "currently selected element" more explicitly.
    pcb.existElement.unshift(new CeramicsCapacitor());
  }

  // Attempt to build the element at the clicked coordinates
  // Ensure that pcb.existElement[0] always exists here after the check above.
  try {
    pcb.existElement[0].build(localX, localY);
  } catch (error) {
    console.error("Error building element:", error);
    // Optionally, remove the newly added element if building fails
    pcb.existElement.shift();
    return; // Stop further execution if build fails
  }

  // Refresh the PCB display after modifying an element
  pcb.refresh();
});
