# ivyalchemy.ink

This repository holds the source code for ivyalchemy.ink, the website for Ivy Alchemist! This website is a basic application designed to both represent Ivy and their work, as well as serve as a contact point for their tattoo & art business. 

## Principles of Design
There are a few design principles I am using in this project to ensure that Ivy and their clients are happy with the final product. These serve as a rigid outline that I can consult while making decisions during the build process.

<ol>
    <li>
        <b>Visual Hierarchy</b> - The most important elements grab the attention of the user <em>first</em>. These include:
        <ul>
            <li>Portfolio</li>
            <li>Brand</li>
            <li>Call to Action</li>
        </ul>
    </li>
    <li>
        <b>Responsive Functionality and Interoperability</b> - The website works across all platforms and devices. ivyalchemy.ink is primarily an advertising and business tool and so accessibility is paramount. Proper aria labeling for users with disabilities is also very important. A <em>mobile first design</em> is a cornerstone of the project.
    </li>
    <li>
        <b>Intuitive and Minimal Design</b> - ivyalchemy.ink is simple to use and easy to understand. There are never more than a few things on the screen at one time, this is very important for mobile viewing. Avoid complex borders and design elements.
    </li>
    <li>
        <b>Backend Optimization</b> - Design patterns and principles used to increase the security, efficiency and functionality of the site are employed where possible. These include SEO, CDN, browser caching, compression, and other techniques.
    </li>
    <li>
        <b>Artist Customization</b> - Ivy does not directly control the source code for the website, so it is important that they can manipulate certain components of the website without needing to talk directly to the developer. These are CRUD items, or elements of the site that can be manipulated via Create, Read, Update, and Delete operations. Ivy's CRUD elements include:
        <ul>
            <li>`About me`</li>
            <li>`Booking Policy`</li>
            <li>`Portfolio Items`</li>
            <li>`Flash & Flash Sheets`</li>
        </ul>
    </li>
    <li>
        <b>Quirks and Toys</b> - A professional representation of Ivy and their work is most important, but following closely behind is a commitment to making the site not just a utility but a destination. This means adding elements that make the site not just a nice place to be, but a quirky environment with many secrets and things to explore. This might mean hiding pictures of cats in unexpected places, or a logo that moves up and down in a silly way.
    </li>
</ol>

## Tech Stack

ivyalchemy.ink is a purpose built website designed to be accessible from everywhere on a broad variety of devices and web browsers. The tech stack accomplishes this in an efficent and clear manner. The following list is organized in accordance with proximity to the end user. Items at the top are items that the user directly interacts with, while items at the bottom of the list are protected elements that are not accessible from the outside.

<ol>
    <li>
        <b><a href="https://react.dev/">React</a> Single Page Application ( SPA )</b> - The React SPA composes the HTML, Javascript, and CSS that is delivered to the web browser when a user visits the site. The source code in this repository is transpiled into a bundle that is served to the web browser using Azure Static Web Apps ( SWA ). React is a web application framework built ontop of Node.JS and thus uses NPM modules to enhance and augment features of the framework. The application source code is written in Typescript, a flavor of Javascript that enforces strong typing to catch i/o, security, and type issues before they appear in production. <a href="https://create-react-app.dev/">create-react-app</a> was used to initialize the project using the Typescript template. This project <em>primarily</em> uses the following NPM modules:
        <ul>
            <li><a href="https://tailwindcss.com/">Tailwind CSS</a> - Adds utility classes that are extremely useful in customizing components.</li>
            <li><a href="https://mui.com/">MUI</a> - A React component library that adds components in accordance with Google's <a href="https://m3.material.io/">Material design system</a>.</li>
            <li><a href="https://react-hook-form.com/">react-hook-form</a> - Flexible and easy to use form validation for react projects.</li>
            <li><a href="https://reactrouter.com/en/main/start/overview">react-router-dom</a> - A dependable, data-driven router library with support for preloading pages and multiple router implementations.</li>
        </ul>
        Other npm modules are used to supplement the ones listed above. See the <a href="./ia-react-spa/package.json">package.json</a> file in the React component of this repository for details.
    </li>
    <li><b><a href="https://azure.microsoft.com/en-us/products/app-service/static">Azure Static Web Apps</a></b> - To serve the React app to users, Azure SWA is used. SWA is a service designed by Microsoft with SPA frameworks like Angular, React, and Ember in mind. SWA serves the transpiled application bundle to web browsers, but also has built in support for custom domains, routing rules, and consumption based pricing. SWA also links the React SPA with the Azure Functions backend by forwarding all requests made to the /api route directly to the Azure Function.</li>
    <li><b><a href="https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview?pivots=programming-language-csharp">Azure Functions</a> API Backend</b> - Some elements on the website are not static and need to be updated dynamically to match the state of the data in the backend. This is where Azure Functions comes in. Azure Functions is a comprehensive backend solution designed to efficiently support business logic and other operations within the cloud by adhering to principles of <em>serverless</em> design like the <a href="https://en.wikipedia.org/wiki/Single-responsibility_principle">single responsibility principle</a>. The function app is written in C#.</li>
</ol>



