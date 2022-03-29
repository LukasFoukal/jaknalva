# jaknalva
In the Lednice-valtice area, we find many interesting places, but there wasn't one place to find the online. It has been our goal, also put forth by our teacher Mr. Hyčka, to create a site that organizes all the beautiful places of South Moravia and give users options to find them. The whole sites runs only on html, css and js, with no server-side code. This approach means that the site is easy to host and maintain after our project is over, so that it can help real people, without us having to spend too much money and effort on its maintenance.

The production version is available at [jaknalva.cz](jaknalva.cz).

## Code

For the functionality of the website, we went with a simple, yet elegant solution, built from the ground up, that doesn't really on a CMS or other third-party software. This solution leans heavily on in browser js, which also means the site is very responsive and even can be used offline, as I may explain later on.

For keeping data about the individual places, like coordinates and categories, we use the html file itself and the  `dataset` variables. It works by every `box` element having `data-lat` and `data-long` property, apart from the usual `id` and `class` properties, which store the coordinates of each place and a `data-category` property which holds a string of the categories the item belongs to.

These are then accessible in js as properties of the box element under `.dataset.lat` for example.

After loading the page, the script asks the API for access to the user location. The browser creates a pop-up window where the user can accept the access. This information is then passed to the `loadPosition()` function, which transfers them to the global `lat` and `long` variables and then it runs the `sort()` function.

The `sort()` function is the main function of the page logic and is run every time the user changes the location, from which the site calculates the distance.

The function checks how many places are on the site runs through all of them, loads the coordinates, calculates the delta to starting point, converts the from degrees of lat and long to meters and calculates the real diagonal distance. It also makes the inner html of the `label` element to this distance, which displays it to the user. This value is also saved as the `.dataset.dist` of each element.

Once all the places have a distance to the start point, another cycle runs, which bubble sorts the list, if a closer place comes after a farther one, it swaps them, until it runs through the whole line with no changes.

At the end the `distCheck()` function runs, which checks that everything went smoothly. If the distance to the second place in line is 0 m, it knows the function failed, probably because the user didn't allow access to location data. Also, if the user is more than 10 km away from the closest point, it will advise the to select a predetermined start point from the dropdown.

At first load the site shows all places on file, but once the user clicks a filter option, the `filter()` function will run through and hide all the places who's category property doesn't include the desired category and shows all the ones that do. The `unfilter()` function runs if the user chooses to see all places again and it will show all the places again.

The site also has the `locationChange()` and `filterChange()` functions, which change the currently displayed starting location and filter as the button of the dropdown. The `adjectiveChange()` function changes the adjective used, because in Czech it needs to be in a different form depending upon the filter, but that shouldn't concern English speakers reading this.

If you have any other questions, feel free to reach out any way you can or even via the email for the production site info@jaknalva.cz.
