function get(id) {
    return document.getElementById(id);
}


function ListModel() {
    var self = this;
    self.planets = ko.observableArray([
        { id: 0, up: ko.observable(1), down: ko.observable(0), planetName: "Earth" },
        { id: 1, up: ko.observable(0), down: ko.observable(0), planetName: "Marss is short" },
        { id: 2, up: ko.observable(0), down: ko.observable(0), planetName: "Venus is shortsd. This is some long text that will not fit in the box" },
        { id: 3, up: ko.observable(0), down: ko.observable(1), planetName: "Moon" },
    ]);

    console.log(self.planets());
    self.yesOrNo =  function(val) {
        if (val == 0 || val() == 0) { return true; }
        else { return false; }
    }

    self.itemOrderUp = function(item) {
        var itemNo = item["id"];
        if (itemNo > 0) {
            var replace = [];
            item["id"] = itemNo - 1;
            self.planets()[itemNo - 1]["id"] = itemNo;
            replace = self.planets()[itemNo - 1];
            self.planets()[itemNo - 1] = self.planets()[itemNo];
            self.planets()[itemNo] = replace;
            self.planets.sort();
            console.log(replace);
        }
        else {
            console.log("NOOOO");
        }

        self.disPlayArrow(self.planets);
        self.yesOrNo();
        console.log(self.planets());
    };

    self.itemOrderDown = function (item) {
        var itemNo = item["id"];
        if (itemNo < self.planets().length - 1) {
            var replace = [];
            item["id"] = itemNo + 1;
            self.planets()[itemNo + 1]["id"] = itemNo;
            replace = self.planets()[itemNo + 1];
            self.planets()[itemNo + 1] = self.planets()[itemNo];
            self.planets()[itemNo] = replace;
            self.planets.sort();
            console.log(replace);
        }
        else {
            console.log("NOOOO");
        }

        self.disPlayArrow(self.planets);
        console.log(self.planets());
    };

    self.removeItem = function (item) {
        self.planets.remove(item);
        self.disPlayArrow(self.planets);
        console.log(self.planets());
    }

    self.disPlayArrow = function (obj) {
        for (var i = 0; i < obj().length; i++) {
            if (i == 0) {
                obj()[i].up(1);
                obj()[i].down(0);
            }
            else {
                if (i == self.planets().length - 1) {
                    obj()[i].up(0);
                    obj()[i].down(1);
                }

                else {
                    obj()[i].up(0);
                    obj()[i].down(0);
                }
            }
            console.log(self.planets()[i].id);
        }
        self.planets = obj
    }
}
ko.applyBindings(new ListModel(), get("listKO"));
