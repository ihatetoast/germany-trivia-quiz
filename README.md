# German Trivia Quiz

## What

A trivia game covering German trivia. The user can choose a topic (capital cities, food and drink, etc) and also choose a difficulty level (how much time a user has to answer). The source of the trivia is a js file I am building. Any typos or incorrect "correct" answers are on me.

Custom components:
* TimeSelect allows me to have a select/dropdown that I can style more freely. I used aria labels to help define this as a select/dropdown

* Results displayed visually with a bar graph that matches the flag

* ProgressBier is a progress bar substitute for desktop. In lieu of a progressbar, I have a Bierstein with beer that depletes as the time counts down. This app looks for window innerwidth to determine if the custom ProgressBier appears. It will still be there on resizing. I opted not to fuss too much making that one part of the app mobile friendly. I do not see a user resizing in the middle of a quiz. While I won't have it break, I won't sweat too much about the look of the ProgressBier on resizing. On load, the standard bar appears at mobile because it's small. In future iterations, it will be replace by the mobile-friendly ProgressWurst.

* Quiz face is ARIA compliant


Topic selection screen

Quiz question with timer (show the beer stein!)
Results bar chart
Desktop map interaction (with capital box visible)
Mobile results view



## Why

I majored in German and try to combine front-end exercises with keeping up my German-language cultural knowledge. In addition, I amuse myself creating wrong answers and am learning some new things (e.g. the origin of Maultaschen). 


## Why not Austria
I hate leaving out Austria. I had tried to combine them, but it made for a css style nightmare: Germany's colors and flag layout and switch to Austria's if that theme was chosen? No. I'll create another, maybe to repeat this but with typescript. But this is your answer to why I am leaving out Austria (for now). 

## What about ...
That run script? Yes, work with me, Schatz. This is a German trivia game, so I opted to change the run script to "lolarun" for (Run Lola Run)[https://www.imdb.com/title/tt0130827/] (Lola Rennt). Is this normal? No. Is this my repo? Yes. My boat; my rules.

## How
* React
* CSS modules for smaller components
* Icons from Lucide
* Vite



