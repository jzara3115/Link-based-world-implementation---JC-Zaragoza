class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice(this.engine.storyData.InitialLocation);
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

var Items = [];

class Location extends Scene {
    create(key) {
        console.log(key);
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        


        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) {
                if (choice.LookedAt){
                    if(choice.LookedAt = true){
                        continue
                    }
                }
                if (choice.Prereq){
                    if (Items.includes(choice.Prereq)){
                        this.engine.addChoice(choice.Text, choice);
                    } else {
                        continue
                    }
                } else {
                    this.engine.addChoice(choice.Text, choice);
                } // TODO: use the Text of the choice
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            if (choice.Item){
                Items.push(choice.Item);
                console.log(Items);
            }
            if (choice.LookedAt == false) {
                choice.LookedAt = true;
                console.log("made true");
            }
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
            locationData = this.engine.storyData.Locations[key].Choices[0].Target;
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');