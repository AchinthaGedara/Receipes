


const saveData = () => {
    let recipeID=0;
    if(recipeID>0)
    {
        // Create a JSON string
     const tasksJson = JSON.stringify(this.tasks);
     
     console.log(tasksJson);
    // Store the JSON string 
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string
    const currentId = String(this.currentId);
    console.log(currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
    }
}