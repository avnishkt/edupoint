const mongoose=require('mongoose');
const Assignment=require('../model/asignment')
const dummyAssignments = [
    {
        title: "Build a React App",
        category: "Math",
        price: 150,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb00", // Replace with a valid user ID
        tags: ["React", "Frontend", "JavaScript"],
    },
    {
        title: "Create an API with Node.js",
        category: "Science",
        price: 200,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb00", // Replace with a valid user ID
        tags: ["Node.js", "Express", "API"],
    },
    {
        title: "Design a Mobile App UI",
        category: "Math",
        price: 120,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb01", // Replace with a valid user ID
        tags: ["UI", "Mobile", "Figma"],
    },
    {
        title: "Solve Algebra Problems",
        category: "Math",
        price: 50,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb02", // Replace with a valid user ID
        tags: ["Algebra", "Equations", "Mathematics"],
    },
    {
        title: "Create Data Visualization",
        category: "Math",
        price: 180,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb03", // Replace with a valid user ID
        tags: ["D3.js", "Data", "Charts"],
    },
    {
        title: "Develop E-commerce Backend",
        category: "Math",
        price: 300,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb04", // Replace with a valid user ID
        tags: ["Node.js", "MongoDB", "E-commerce"],
    },
    {
        title: "Build a Machine Learning Model",
        category: "Math",
        price: 500,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb05", // Replace with a valid user ID
        tags: ["Machine Learning", "Python", "AI"],
    },
    {
        title: "Write a Python Script",
        category: "Math",
        price: 80,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb06", // Replace with a valid user ID
        tags: ["Python", "Automation", "Scripting"],
    },
    {
        title: "Research Paper on Climate Change",
        category: "Science",
        price: 250,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb07", // Replace with a valid user ID
        tags: ["Research", "Climate Change", "Science"],
    },
    {
        title: "Solve Calculus Problems",
        category: "Math",
        price: 100,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb08", // Replace with a valid user ID
        tags: ["Calculus", "Derivatives", "Integrals"],
    },
    {
        title: "Design a Logo for a Startup",
        category: "Math",
        price: 70,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb09", // Replace with a valid user ID
        tags: ["Logo Design", "Branding", "Illustrator"],
    },
    {
        title: "Create a RESTful API with Python",
        category: "Math",
        price: 220,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb10", // Replace with a valid user ID
        tags: ["Flask", "Python", "API"],
    },
    {
        title: "Analyze Financial Data",
        category: "Math",
        price: 300,
        status: "notdone",
        postedBy: "671406dd68b8aa415370eb11", // Replace with a valid user ID
        tags: ["Pandas", "Finance", "Data Analysis"],
    },
   
];

const seed=()=>
{// Seed data function
    console.log(1)
const seedAssignments = async () => {
    try {

        // Insert dummy data
        await Assignment.insertMany(dummyAssignments);

        console.log('Data seeded successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};
const run = async () => {
    await seedAssignments();
    
    
};

run();
}
module.exports=seed;